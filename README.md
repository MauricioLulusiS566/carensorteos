# 🏍️ Caren Sorteos

Landing page profesional para el **Gran Sorteo Moto 0km**, desarrollada en HTML/CSS/JS puro — sin frameworks, sin backend, lista para desplegar en cualquier hosting estático.

---

## ✨ Funcionalidades

- **3 opciones de tickets** con diseño premium (1, 2 y 3 tickets)
- **Formulario de registro** con validación (nombre, apellido, teléfono, localidad, usuario, Instagram, email)
- **Generación de ID único** de participación (`MOTO-XXXXXX`) por cada registro
- **Email automático** al participante con su número de participación via EmailJS
- **QR de pago** generado dinámicamente desde los links de MercadoPago
- **Base de datos** en Google Sheets via Apps Script — exportable a Excel
- **Countdown** en tiempo real hasta la fecha del sorteo (26 de Mayo 2026)
- **Confetti** animado al completar el registro
- **Partículas** animadas en el fondo
- **100% responsive** — optimizado para celular

---

## 🗂️ Estructura

```
Page/
├── index.html   # Todo el sitio (HTML + CSS + JS en un solo archivo)
└── image.png    # Foto de la moto premio
```

---

## ⚙️ Configuración

Abrí `index.html` y editá el objeto `CFG` al inicio del script:

```js
const CFG = {
  payLinks: [
    "https://mpago.la/...",   // Link MercadoPago $8.600 — 1 ticket
    "https://mpago.la/...",   // Link MercadoPago $15.000 — 2 tickets
    "https://mpago.la/...",   // Link MercadoPago $20.500 — 3 tickets
  ],
  googleSheetUrl: "https://script.google.com/macros/s/.../exec",
  emailjs: {
    publicKey:  "tu_public_key",
    serviceId:  "service_xxxxxxx",
    templateId: "template_xxxxxxx",
  },
};
```

### Google Sheets (base de datos)

1. Creá una planilla en Google Sheets
2. Abrí **Extensiones → Apps Script**, pegá el código del comentario al final de `index.html`
3. Implementá como **Aplicación web** (acceso: Cualquier persona)
4. Copiá la URL generada en `googleSheetUrl`

La planilla se auto-completa con columnas: `ID · Fecha · Nombre · Apellido · Email · Teléfono · Localidad · Usuario · Instagram · Opción · Monto · Estado`

### EmailJS

1. Cuenta gratuita en [emailjs.com](https://emailjs.com) (200 emails/mes)
2. Conectá tu Gmail como servicio
3. Creá un template con variables: `{{to_email}}`, `{{to_name}}`, `{{part_id}}`, `{{opcion}}`, `{{monto}}`
4. Completá `publicKey`, `serviceId` y `templateId` en el CFG

---

## 🚀 Deploy

### Netlify (recomendado — gratis)

1. [netlify.com](https://netlify.com) → Sign up
2. Arrastrá la carpeta `Page` al panel
3. En 30 segundos tenés una URL pública

### Dominio personalizado

Registrá `carensorteos.com.ar` en [nic.ar](https://nic.ar) y conectalo desde el panel de Netlify.

---

## 🛠️ Stack

| Tecnología | Uso |
|---|---|
| HTML / CSS / JS vanilla | Todo el sitio |
| [QRCode.js](https://github.com/davidshimjs/qrcodejs) | Generación de QR |
| [EmailJS](https://emailjs.com) | Envío de emails |
| Google Apps Script | Base de datos en Sheets |
| Google Fonts (Bebas Neue + Montserrat) | Tipografía |

---

## 📱 Vista previa

Para previsualizar en celular: abrí en Chrome → F12 → ícono de dispositivo móvil → iPhone 12 / Samsung Galaxy S20.

---

Hecho con ❤️ para Caren Sorteos 🏍️
