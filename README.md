# FR Resume - Portafolio Personal

Portafolio web personal desarrollado con Next.js y React, que muestra información profesional dinámica obtenida de un servicio REST. Incluye soporte multiidioma (Español/Inglés) y diseño responsivo con animaciones modernas.

## 🚀 Características

- **Multiidioma**: Soporte completo para Español e Inglés con detección automática del idioma del navegador
- **Contenido Dinámico**: Los datos se obtienen de un servicio REST API
- **Diseño Moderno**: Interfaz moderna con animaciones GSAP y efectos visuales
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Descarga de CV**: Descarga del curriculum vitae en PDF según el idioma seleccionado
- **Protección contra Spam**: Google reCAPTCHA v3 integrado en el formulario de contacto (invisible y no intrusivo)
- **Secciones Incluidas**:
  - Hero/Top: Presentación principal con efecto typewriter
  - About Me: Información personal y experiencia
  - Skills: Habilidades técnicas con barras de progreso
  - Experiences: Historial profesional con fechas formateadas
  - Contact: Formulario de contacto y enlaces sociales

## 🛠️ Tecnologías

- **Framework**: Next.js 14
- **Lenguaje**: TypeScript
- **Estilos**: SCSS, Bootstrap 5
- **Animaciones**: GSAP, SplitType
- **Testing**: Jest, React Testing Library
- **Otras librerías**:
  - React Typewriter Effect
  - EmailJS (formulario de contacto)
  - Google reCAPTCHA v3 (protección contra spam)
  - Phosphor Icons

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone <repository-url>
cd fr-resume
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea el archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_RESUME_API_BASE_URL=http://localhost:8080/v1/ms-resume
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_clave_site_key_de_google_recaptcha
NEXT_PUBLIC_SERVICE_ID=tu_service_id_de_emailjs
NEXT_PUBLIC_TEMPLATE_ID=tu_template_id_de_emailjs
NEXT_PUBLIC_PUBLIC_KEY=tu_public_key_de_emailjs
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/cristiansrc
NEXT_PUBLIC_REDIRECT_DELAY=20
```

4. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

**Variables requeridas:**

- `NEXT_PUBLIC_RESUME_API_BASE_URL`: URL base del servicio REST API para obtener los datos del resume

**Variables opcionales:**

- `NEXT_PUBLIC_SERVICE_ID`: ID del servicio de EmailJS
- `NEXT_PUBLIC_TEMPLATE_ID`: ID de la plantilla de EmailJS
- `NEXT_PUBLIC_PUBLIC_KEY`: Clave pública de EmailJS
- `NEXT_PUBLIC_LINKEDIN_URL` (opcional, default: `"https://www.linkedin.com/in/cristiansrc"`): URL del perfil de LinkedIn para redirección en caso de error
- `NEXT_PUBLIC_REDIRECT_DELAY` (opcional, default: `20`): Tiempo en segundos antes de redirigir automáticamente a LinkedIn cuando hay un error (mínimo: 1 segundo)

#### Configuración de Google reCAPTCHA v3

**Variables de entorno requeridas:**

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (requerido): Clave pública de Google reCAPTCHA v3

**Variables de entorno opcionales:**

- `NEXT_PUBLIC_RECAPTCHA_LANGUAGE` (opcional, default: `"es"`): Idioma del reCAPTCHA. Valores válidos: `"es"`, `"en"`, etc.
- `NEXT_PUBLIC_RECAPTCHA_SCRIPT_ASYNC` (opcional, default: `"true"`): Cargar el script de forma asíncrona. Valores: `"true"` o `"false"`
- `NEXT_PUBLIC_RECAPTCHA_SCRIPT_DEFER` (opcional, default: `"true"`): Cargar el script con defer. Valores: `"true"` o `"false"`
- `NEXT_PUBLIC_RECAPTCHA_SCRIPT_APPEND_TO` (opcional, default: `"head"`): Dónde insertar el script. Valores: `"head"` o `"body"`

**Ejemplo de configuración completa:**

```env
# Requerido
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_clave_site_key_de_google_recaptcha

# Opcionales (con valores por defecto)
NEXT_PUBLIC_RECAPTCHA_LANGUAGE=es
NEXT_PUBLIC_RECAPTCHA_SCRIPT_ASYNC=true
NEXT_PUBLIC_RECAPTCHA_SCRIPT_DEFER=true
NEXT_PUBLIC_RECAPTCHA_SCRIPT_APPEND_TO=head
```

**Pasos para obtener las claves de reCAPTCHA:**

1. Visita [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Haz clic en "+" para crear un nuevo sitio
3. Completa el formulario:
   - **Etiqueta**: Nombre descriptivo para tu sitio
   - **Tipo de reCAPTCHA**: Selecciona **reCAPTCHA v3**
   - **Dominios**: Agrega tus dominios (ej: `localhost`, `tudominio.com`)
4. Acepta los términos y haz clic en "Enviar"
5. Copia la **Clave del sitio** y agrégala a `.env.local` como `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`

**Nota**: reCAPTCHA v3 es invisible y funciona en segundo plano. Solo solicita verificación adicional si detecta comportamiento sospechoso. Si no se proporciona la clave, el formulario funcionará sin protección (se mostrará un warning en consola).

### API Endpoints Utilizados

El proyecto consume los siguientes endpoints:

- `GET /public/info-page`: Obtiene toda la información de la página (home, basicData, skills, experiences, educations)
- `GET /public/curriculum/:language`: Descarga el PDF del curriculum (language: "english" o "spanish")

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm start            # Inicia el servidor de producción

# Testing
npm test             # Ejecuta las pruebas unitarias
npm run test:watch   # Ejecuta las pruebas en modo watch
npm run test:coverage # Ejecuta las pruebas con cobertura

# Linting
npm run lint         # Ejecuta ESLint
```

## 📁 Estructura del Proyecto

```
fr-resume/
├── api/                    # Funciones para llamadas a la API
│   ├── index.ts
│   └── resumeApi.ts
├── app/                    # Páginas de Next.js
│   ├── layout.tsx
│   └── page.tsx
├── components/             # Componentes React
│   ├── AboutMe.tsx
│   ├── Attainments.tsx
│   ├── Contact.tsx
│   ├── Experience.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   └── ...
├── contexts/               # Contextos de React
│   ├── LanguageContext.tsx
│   └── ResumeContext.tsx
├── hooks/                  # Custom hooks
│   ├── useTranslation.ts
│   └── useIntersectionObserver.ts
├── interfaces/             # Interfaces TypeScript
│   └── resume/
│       ├── BasicData.ts
│       ├── Experience.ts
│       ├── Home.ts
│       └── ...
├── locales/                # Archivos de traducción
│   ├── en.json
│   └── es.json
├── public/                 # Archivos estáticos
│   ├── images/
│   └── scss/
├── utils/                  # Utilidades
│   ├── dateFormatter.ts
│   └── formatString.ts
└── __tests__/              # Pruebas unitarias
    ├── api/
    ├── components/
    ├── contexts/
    ├── hooks/
    └── utils/
```

## 🌐 Internacionalización

El proyecto incluye soporte completo para dos idiomas:

- **Español (es)**: Idioma por defecto si el navegador está en español
- **Inglés (en)**: Idioma por defecto para otros navegadores

Las traducciones se encuentran en:

- `locales/es.json` - Traducciones en español
- `locales/en.json` - Traducciones en inglés

El idioma se detecta automáticamente al cargar la página y se guarda en `localStorage` para mantener la preferencia del usuario.

## 🎨 Componentes Principales

### Hero

Sección principal con presentación, efecto typewriter para las habilidades, y botones de acción.

### AboutMe

Información personal, descripción profesional, email y fecha de nacimiento.

### Attainments (Skills)

Muestra las habilidades técnicas con barras de progreso, organizadas en categorías.

### Experience

Historial profesional con fechas formateadas, descripciones y habilidades utilizadas.

### Contact

Formulario de contacto protegido con Google reCAPTCHA v3 y enlaces a redes sociales (LinkedIn, GitHub).

### Navigation

Menú lateral con navegación a todas las secciones y opción para cambiar de idioma.

## 🔧 Funcionalidades Especiales

### Formateo de Fechas

Las fechas se formatean correctamente evitando problemas de zona horaria:

- Fecha de nacimiento: "DD Month, YYYY"
- Rangos de fechas: "(Month YYYY - Month YYYY)" o "(Month YYYY - Present/Presente)"

### Descarga de PDF

El botón de descarga del curriculum llama al endpoint `/public/curriculum/:language` y descarga el PDF según el idioma actual.

### Protección del Formulario de Contacto

El formulario de contacto está protegido con Google reCAPTCHA v3, que:

- Funciona de forma invisible en segundo plano
- No requiere interacción del usuario en la mayoría de los casos
- Solo solicita verificación adicional si detecta comportamiento sospechoso
- Valida automáticamente antes de enviar el formulario

### Animaciones

- Animaciones GSAP para elementos al hacer scroll
- Efecto typewriter para las habilidades
- SplitType para animaciones de texto

## 🧪 Testing

El proyecto incluye pruebas unitarias para:

- Utilidades (dateFormatter)
- Funciones de API
- Contextos (LanguageContext, ResumeContext)
- Hooks (useTranslation)
- Componentes principales

Ejecuta las pruebas con:

```bash
npm test
```

## 📝 Notas de Desarrollo

- El proyecto usa Next.js 14 con App Router
- Los componentes son Client Components (usando "use client")
- Las animaciones GSAP se ejecutan en el cliente
- El contenido se carga dinámicamente desde la API al montar el componente

## 📄 Licencia

Este proyecto es privado.

## 👤 Autor

Cristian SRC

---

Para más información sobre el desarrollo o reportar problemas, contacta al desarrollador.
