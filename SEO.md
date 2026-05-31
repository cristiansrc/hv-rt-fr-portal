# SEO Configuration Guide

Esta guía explica la configuración SEO implementada en el portfolio.

## Variables de Entorno Necesarias

Agrega estas variables a tu archivo `.env.local` o en la configuración de Vercel:

```env
# URL del sitio (sin trailing slash)
NEXT_PUBLIC_SITE_URL=https://cristiansrc.com

# Emails (ya configurados)
NEXT_PUBLIC_EMAIL=tu-email@ejemplo.com
NEXT_PUBLIC_EMAIL_ENG=your-email@example.com

# LinkedIn (opcional, ya configurado)
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/cristiansrc
```

## Características SEO Implementadas

### 1. Meta Tags

- ✅ Título dinámico basado en idioma
- ✅ Descripción optimizada
- ✅ Keywords relevantes
- ✅ Meta tags de autor y publisher

### 2. Open Graph (Facebook, LinkedIn)

- ✅ og:title, og:description, og:image
- ✅ og:url, og:type, og:site_name
- ✅ og:locale (soporte multi-idioma)

### 3. Twitter Cards

- ✅ twitter:card (summary_large_image)
- ✅ twitter:title, twitter:description
- ✅ twitter:image, twitter:creator

### 4. Structured Data (JSON-LD)

- ✅ Person Schema (Schema.org)
- ✅ Website Schema
- ✅ ProfessionalService Schema

### 5. Archivos de Configuración

- ✅ robots.txt
- ✅ sitemap.xml
- ✅ Canonical URLs
- ✅ Alternate language links (hreflang)

## Imagen Open Graph

Necesitas crear una imagen para Open Graph en:

```
/public/images/og-image.png
```

**Especificaciones:**

- Dimensiones: 1200x630px
- Formato: PNG o JPG
- Tamaño: < 1MB
- Contenido: Logo, nombre, y tagline del portfolio

## Verificación de SEO

### Herramientas de Verificación

1. **Google Search Console**

   - Agrega tu sitio: https://search.google.com/search-console
   - Verifica la propiedad
   - Envía el sitemap: `https://cristiansrc.com/sitemap.xml`

2. **Google Rich Results Test**

   - Prueba tus datos estructurados: https://search.google.com/test/rich-results

3. **Facebook Sharing Debugger**

   - Verifica Open Graph: https://developers.facebook.com/tools/debug/

4. **Twitter Card Validator**

   - Prueba Twitter Cards: https://cards-dev.twitter.com/validator

5. **Lighthouse (Chrome DevTools)**
   - Ejecuta auditoría SEO: F12 > Lighthouse > SEO

## Mejoras Adicionales Recomendadas

### 1. Verificación de Propiedad

Agrega códigos de verificación en `app/layout.tsx`:

```typescript
verification: {
  google: "tu-codigo-google",
  yandex: "tu-codigo-yandex",
  yahoo: "tu-codigo-yahoo",
},
```

### 2. Analytics

Considera agregar:

- Google Analytics 4
- Microsoft Clarity
- Hotjar

### 3. Performance

- Optimiza imágenes (Next.js Image ya está configurado)
- Implementa lazy loading
- Minimiza CSS/JS

### 4. Contenido

- Agrega más contenido único en cada sección
- Incluye blog posts regulares
- Actualiza el sitemap cuando agregues contenido nuevo

## Actualizar Sitemap

Cuando agregues nuevas páginas o contenido, actualiza `public/sitemap.xml` con:

- Nueva URL
- Fecha de última modificación (`lastmod`)
- Frecuencia de cambio (`changefreq`)
- Prioridad (`priority`)

## Soporte Multi-idioma

El SEO está configurado para soportar español e inglés:

- URLs alternativas con `?lang=es` y `?lang=en`
- Hreflang tags para indicar versiones de idioma
- Meta tags dinámicos basados en el idioma seleccionado

## Checklist Pre-Lanzamiento

- [ ] Configurar `NEXT_PUBLIC_SITE_URL` con la URL real
- [ ] Crear imagen Open Graph (`og-image.png`)
- [ ] Verificar que robots.txt esté accesible
- [ ] Verificar que sitemap.xml esté accesible
- [ ] Probar con Google Rich Results Test
- [ ] Probar con Facebook Sharing Debugger
- [ ] Probar con Twitter Card Validator
- [ ] Ejecutar Lighthouse SEO audit
- [ ] Agregar códigos de verificación (opcional)
- [ ] Configurar Google Search Console
- [ ] Enviar sitemap a Google Search Console
