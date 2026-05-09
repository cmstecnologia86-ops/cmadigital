import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Globe2,
  Mail,
  MapPin,
  Network,
  ShieldCheck,
  Sparkles,
  Users2,
} from 'lucide-react'
import { site } from './data/site'
import './styles.css'

const services = [
  {
    icon: Globe2,
    title: 'Sitios web corporativos',
    text: 'Presencia digital clara, profesional y adaptable para empresas que necesitan comunicar mejor sus servicios.',
  },
  {
    icon: Code2,
    title: 'Plataformas web',
    text: 'Herramientas digitales para ordenar información, centralizar procesos y apoyar la operación diaria.',
  },
  {
    icon: Network,
    title: 'Integración de flujos y APIs',
    text: 'Conexión entre formularios, bases de datos, sistemas, automatizaciones y servicios utilizados por la empresa.',
  },
]

const values = [
  'Desarrollo web sobrio y profesional',
  'Soluciones adaptadas a la realidad de cada empresa',
  'Integración de herramientas y procesos digitales',
  'Acompañamiento técnico claro y ordenado',
]

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ir al inicio">
        <img className="brand-logo" src={site.images.logo} alt="Logo CMA Digital" />
        <span>
          <strong>{site.shortName}</strong>
          <small>{site.domain}</small>
        </span>
      </a>

      <nav className="nav-links" aria-label="Navegación principal">
        <a href="#servicios">Servicios</a>
        <a href="#empresa">Empresa</a>
        <a href="#equipo">Equipo</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="hero section-shell">
      <div className="hero-copy">
        <p className="eyebrow">
          <Sparkles size={16} />
          Soluciones digitales para empresas
        </p>
        <h1>{site.tagline}</h1>
        <p className="hero-description">{site.description}</p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#contacto">
            Contactar <ArrowRight size={18} />
          </a>
          <a className="btn btn-secondary" href="#servicios">
            Ver servicios
          </a>
        </div>
      </div>

      <div className="hero-media card-glow">
        <img src={site.images.hero} alt="Imagen corporativa CMA Digital" />
        <div className="floating-card">
          <ShieldCheck size={22} />
          <span>Presencia digital formal, clara y confiable.</span>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="servicios" className="section-shell section-block">
      <div className="section-heading">
        <p className="eyebrow">Qué hacemos</p>
        <h2>Desarrollo web, automatización e integración digital.</h2>
        <p>
          Creamos soluciones orientadas a empresas que necesitan comunicar, operar y conectar sus procesos mediante herramientas web simples, mantenibles y profesionales.
        </p>
      </div>

      <div className="service-grid">
        {services.map(({ icon: Icon, title, text }) => (
          <article className="service-card" key={title}>
            <span className="icon-wrap">
              <Icon size={24} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Company() {
  return (
    <section id="empresa" className="section-shell split-section">
      <div className="image-panel">
        <img src={site.images.workflow} alt="Flujo de trabajo digital e integración de procesos" />
      </div>

      <div className="text-panel">
        <p className="eyebrow">Quiénes somos</p>
        <h2>{site.companyName}</h2>
        <p>
          Somos una empresa chilena dedicada al desarrollo de soluciones digitales para organizaciones que buscan una presencia web profesional y herramientas que apoyen su operación diaria.
        </p>
        <p>
          Nuestro enfoque combina diseño, orden técnico e integración de sistemas para construir soluciones útiles, entendibles y preparadas para crecer junto con cada cliente.
        </p>

        <ul className="check-list">
          {values.map((value) => (
            <li key={value}>
              <CheckCircle2 size={18} />
              {value}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section id="equipo" className="section-shell split-section reverse-section">
      <div className="text-panel">
        <p className="eyebrow">
          <Users2 size={16} />
          Equipo conectado
        </p>
        <h2>Trabajo digital coordinado, remoto y eficiente.</h2>
        <p>
          Operamos con una lógica moderna de trabajo colaborativo, combinando coordinación remota, revisión técnica y comunicación directa para avanzar con orden en cada proyecto.
        </p>
        <p>
          Esta forma de trabajo permite responder con flexibilidad, mantener trazabilidad de avances y construir soluciones digitales ajustadas a la realidad operativa de cada empresa.
        </p>
      </div>

      <div className="image-panel">
        <img src={site.images.team} alt="Equipo digital conectado de forma remota" />
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section-shell process-section">
      <div className="process-copy">
        <p className="eyebrow">Forma de trabajo</p>
        <h2>Una ejecución ordenada desde la idea hasta la publicación.</h2>
      </div>

      <div className="steps">
        <div>
          <span>01</span>
          <strong>Levantamiento</strong>
          <p>Entendemos la necesidad, el tipo de solución y el objetivo principal.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Diseño</strong>
          <p>Definimos estructura, contenidos, interfaz y experiencia de uso.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Desarrollo</strong>
          <p>Construimos el sitio, plataforma o integración con foco en estabilidad.</p>
        </div>
        <div>
          <span>04</span>
          <strong>Publicación</strong>
          <p>Configuramos despliegue, dominio y canales de contacto.</p>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contacto" className="section-shell contact-section">
      <div className="contact-card">
        <p className="eyebrow">Contacto</p>
        <h2>Conversemos sobre la solución digital que necesita tu empresa.</h2>
        <p>
          Puedes escribirnos para solicitar información sobre sitios web, plataformas, formularios, integraciones o presencia digital corporativa.
        </p>

        <div className="contact-lines">
          <a href={`mailto:${site.email}`}>
            <Mail size={18} />
            {site.email}
          </a>
          <span>
            <MapPin size={18} />
            {site.location}
          </span>
        </div>
      </div>

      <div className="contact-visual">
        <img src={site.images.contact} alt="Canal de contacto CMA Digital" />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>{site.companyName}</strong>
        <span>© {new Date().getFullYear()} · {site.domain}</span>
      </div>
      <a href={`mailto:${site.email}`}>{site.email}</a>
    </footer>
  )
}

function App() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Company />
      <Team />
      <Process />
      <Contact />
      <Footer />
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
