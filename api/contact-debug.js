import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  const token = req.headers['x-debug-token']

  if (!process.env.CONTACT_DEBUG_TOKEN || token !== process.env.CONTACT_DEBUG_TOKEN) {
    return res.status(401).json({
      ok: false,
      message: 'No autorizado.',
    })
  }

  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO']

  const envStatus = Object.fromEntries(
    required.map((key) => [
      key,
      Boolean(process.env[key]),
    ])
  )

  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    return res.status(500).json({
      ok: false,
      stage: 'env',
      message: 'Faltan variables de entorno.',
      envStatus,
      missing,
    })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.verify()

    if (req.method === 'POST') {
      await transporter.sendMail({
        from: `"CMA Digital Diagnóstico" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO,
        subject: 'Prueba SMTP CMA Digital',
        text: 'Prueba correcta de envío SMTP desde Vercel / CMA Digital.',
      })
    }

    return res.status(200).json({
      ok: true,
      stage: req.method === 'POST' ? 'send' : 'verify',
      message: req.method === 'POST'
        ? 'SMTP verificado y correo de prueba enviado.'
        : 'SMTP verificado correctamente.',
      envStatus,
      smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        toConfigured: Boolean(process.env.CONTACT_TO),
      },
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      stage: 'smtp',
      message: error.message,
      code: error.code || null,
      command: error.command || null,
      responseCode: error.responseCode || null,
      response: error.response || null,
      envStatus,
      smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        toConfigured: Boolean(process.env.CONTACT_TO),
      },
    })
  }
}
