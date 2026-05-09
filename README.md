# CMA Digital

Sitio web corporativo inicial para CMA Soluciones Digitales SpA.

## Imágenes ya reservadas

Sube o reemplaza estas imágenes dentro de `public/images/` manteniendo exactamente el mismo nombre:

- `hero-digital.jpg` — imagen principal del inicio.
- `workflow-api.jpg` — imagen para sección de flujos, plataformas e integraciones.
- `equipo-digital.jpg` — reservada para uso futuro o reemplazo visual.
- `contacto-digital.jpg` — reservada para uso futuro o reemplazo visual.

El sitio ya trae imágenes referenciales para que no se vea vacío. Puedes reemplazarlas después por imágenes creadas con IA.

## Editar datos básicos

Los datos principales están en:

`src/data/site.js`

Ahí puedes cambiar:

- Nombre de empresa
- Dominio
- Correo
- Teléfono
- Ubicación
- Textos principales

## Ejecutar localmente

```powershell
cd C:\Users\cma\Documents\GitHub\cmadigital
npm install
npm run dev
```

## Compilar para Vercel

```powershell
cd C:\Users\cma\Documents\GitHub\cmadigital
npm run build
```

Vercel detecta Vite. Build command: `npm run build`. Output directory: `dist`.
