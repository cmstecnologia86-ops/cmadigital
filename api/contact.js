import nodemailer from 'nodemailer'

function sanitize(value) {
  return String(value || '')
    .replace(/[<>]/g, '')
    .trim()
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      message: 'Método no permitido.',
    })
  }

  try {
    const nombre = sanitize(req.body?.nombre)
    const correo = sanitize(req.body?.correo)
    const empresa = sanitize(req.body?.empresa)
    const mensaje = sanitize(req.body?.mensaje)

    if (!nombre || !correo || !mensaje) {
      return res.status(400).json({
        ok: false,
        message: 'Completa nombre, correo y mensaje.',
      })
    }

    if (!isValidEmail(correo)) {
      return res.status(400).json({
        ok: false,
        message: 'Ingresa un correo válido.',
      })
    }

    if (mensaje.length > 3000) {
      return res.status(400).json({
        ok: false,
        message: 'El mensaje es demasiado extenso.',
      })
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO,
    } = process.env

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      return res.status(500).json({
        ok: false,
        message: 'El formulario aún no está configurado en el servidor.',
      })
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    const subject = `Nuevo contacto desde cmadigital.cl - ${nombre}`

    const text = [
      'Nuevo mensaje recibido desde el formulario de contacto de CMA Digital.',
      '',
      `Nombre: ${nombre}`,
      `Correo de respuesta: ${correo}`,
      `Empresa: ${empresa || 'No indicada'}`,
      '',
      'Mensaje:',
      mensaje,
    ].join('\n')

    const html = `
      <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.5">
        <h2>Nuevo contacto desde cmadigital.cl</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo de respuesta:</strong> ${correo}</p>
        <p><strong>Empresa:</strong> ${empresa || 'No indicada'}</p>
        <hr />
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, '<br />')}</p>
      </div>
    `

    await transporter.sendMail({
      from: `"CMA Digital Web" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: correo,
      subject,
      text,
      html,
    })

    return res.status(200).json({
      ok: true,
      message: 'Mensaje enviado correctamente.',
    })
  } catch (error) {
    console.error('CONTACT_FORM_ERROR', error)

    return res.status(500).json({
      ok: false,
      message: 'No se pudo enviar el mensaje. Intenta nuevamente más tarde.',
    })
  }
}
