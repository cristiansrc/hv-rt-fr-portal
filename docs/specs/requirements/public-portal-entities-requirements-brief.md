# Requirements Brief: Public Portal Entities

**Status**: requirements-discovery
**Increment**: public-portal-entities
**Fecha**: 2026-06-04
**Analyst**: Requirements Analyst

---

## 1. Objetivo

Mostrar en el frontend público (`hv-rt-fr-portal`) los datos de **Idiomas del CV**, **Cursos** y **Certificaciones** que el backend `hv-go-ms-resume` ya retorna en el endpoint `/public/info-page`, pero que el frontend aún no despliega por falta de tipos, interfaces y componentes.

---

## 2. Contexto

El microservicio `hv-go-ms-resume` (migrado de Spring Boot a Go, ADR-001) incluye 5 nuevas entidades de dominio (workspace_changes.md: "18 entidades de dominio, 13 existentes + 5 nuevas"). Sin embargo, el frontend `hv-rt-fr-portal` solo conoce las entidades originales (Home, BasicData, Skills, Experiences, Educations, AltchaChallenge).

**Hallazgo clave**: A diferencia de lo que se pensó inicialmente, el backend **ya incluye** las nuevas entidades dentro de la respuesta del mismo endpoint `/public/info-page`. No existen endpoints separados para el consumo del frontend. El schema `InfoPageResponse` en OpenAPI ya contiene:

```yaml
InfoPageResponse:
  properties:
    home: HomeResponse
    basicData: BasicDataResponse
    skills: SkillResponse[]
    experiences: ExperienceResponse[]
    educations: EducationResponse[]
    altchaChallenge: AltchaChallengeResponse
    courses: CourseResponse[]           # ← Ya incluido
    certifications: CertificationResponse[]  # ← Ya incluido
    languages: LanguageResponse[]       # ← Ya incluido
    references: ReferenceResponse[]     # ← Ya incluido
    customSections: CustomSectionResponse[]  # ← Ya incluido
```

El frontend solo necesita:
1. Declarar las interfaces TypeScript faltantes
2. Actualizar `InfoPageResponse` para incluirlas
3. Crear componentes UI para visualizarlos

**Decisión del usuario**: Solo se mostrarán **Idiomas**, **Cursos** y **Certificaciones**. **Referencias** y **CustomSections** quedan fuera por ahora. La nueva sección se ubicará después de la sección "Sobre Mí" (AboutMe).

---

## 3. Actores y Permisos

| Actor | Descripción | Permisos |
|---|---|---|
| Visitante anónimo | Usuario sin autenticación que navega el portfolio público | Lectura de todos los datos (público, sin autenticación) |

No se requieren nuevos permisos ni roles. Los datos ya son públicos.

---

## 4. Alcance (Scope)

1. **Definir tipos TypeScript** para las 3 nuevas entidades, reflejando los schemas `*Response` del OpenAPI:
   - `Course` → `CourseResponse`
   - `Certification` → `CertificationResponse`
   - `Language` → `LanguageResponse` (idiomas del CV, NO confundir con el enum `CurriculumLanguage` que es para seleccionar idioma del PDF)

2. **Actualizar `InfoPageResponse`** para incluir los 3 nuevos campos:
   - `courses: Course[]`
   - `certifications: Certification[]`
   - `languages: Language[]`

3. **Exportar las nuevas interfaces** desde `interfaces/resume/index.ts`.

4. **Crear componente(s) UI** para mostrar Idiomas, Cursos y Certificaciones en una nueva sección del portal, después de la sección AboutMe.

5. **Actualizar la página principal** (`app/page.tsx`) para incluir la nueva sección en el layout y en el array de secciones del ScrollSpy.

6. **Actualizar la numeración** de las secciones existentes al agregar una nueva sección (pasar de 5 a 6 secciones).

7. **Agregar textos de traducción** en `locales/es.json` y `locales/en.json` para la nueva sección.

---

## 5. No Objetivos (Out of Scope)

- **No** incluir References ni CustomSections en esta iteración.
- **No** modificar el backend `hv-go-ms-resume`.
- **No** agregar nuevos endpoints o DAOs de fetching (los datos ya vienen en `getInfoPage()`).
- **No** modificar el `ResumeContext` (ya recibe los datos, solo falta declararlos).
- **No** implementar mutaciones (create/update/delete).
- **No** implementar autenticación ni manejo de sesión.
- **No** agregar caching, paginación ni transformación de datos.
- **No** agregar nuevas entradas en el menú de navegación lateral (Navigation.tsx).
- **No** modificar componentes existentes (Hero, AboutMe, Attainments, Experience, Contact) salvo la numeración de páginas.

---

## 6. Flujos de Usuario

### Flujo Principal: Visualización de nuevos datos

1. El usuario ingresa al portfolio.
2. El `ResumeContext` llama a `getInfoPage()` y obtiene el `InfoPageResponse` completo (incluyendo courses, certifications, languages).
3. El usuario hace scroll hacia abajo, pasando Hero y AboutMe.
4. Se encuentra con la nueva sección que muestra:
   - Idiomas del CV (con niveles de lectura/escritura/habla)
   - Cursos realizados (nombre, institución, fecha)
   - Certificaciones obtenidas (nombre, organización, fecha)
5. Continúa scroll hacia Attainments, Experience y Contact.

### Flujo Alterno: Lista vacía

1. Si el usuario no tiene cursos, certificaciones o idiomas registrados, la sección se muestra igual pero con los arrays vacíos. El componente debe manejarlo sin errores.

### Flujo Alterno: Error de carga

1. Si `getInfoPage()` falla, el `ErrorPopup` actual ya cubre el escenario. No se requiere manejo adicional.

---

## 7. Entidades Funcionales

### Course
- **Propósito**: Curso realizado por el propietario del CV.
- **Campos funcionales**: nombre (ES/EN), institución (ES/EN), fecha de finalización, descripción (ES/EN, HTML), resumen para PDF (ES/EN), URL del certificado.
- **Origen**: CRUD desde `hv-rt-fr-admin`, lectura pública desde el portal.

### Certification
- **Propósito**: Certificación profesional obtenida.
- **Campos funcionales**: nombre (ES/EN), organización emisora (ES/EN), fecha de emisión, fecha de expiración, URL de verificación, ID de credencial, descripción (ES/EN, HTML), resumen para PDF (ES/EN).
- **Origen**: CRUD desde `hv-rt-fr-admin`, lectura pública desde el portal.

### Language (idiomas del CV)
- **Propósito**: Idioma que el propietario habla, con niveles de lectura/escritura/habla.
- **Campos funcionales**: nombre del idioma (ES/EN), nivel de lectura, nivel de escritura, nivel de habla.
- **⚠ Conflicto de naming**: Esta entidad se llama `Language` pero ya existe un tipo `CurriculumLanguage` (enum `"english" | "spanish"`) para seleccionar el idioma del PDF. Planner debe resolver la estrategia de naming (ej: `CvLanguage`, `LanguageSkill`, etc.).

---

## 8. Integraciones

| Sistema | Propósito | Dirección | Criticidad |
|---|---|---|---|
| `hv-go-ms-resume` (vía `getInfoPage()`) | Fuente de datos para Courses, Certifications, Languages | Frontend → Backend (GET) | Alta |

No hay nuevas integraciones. Los datos se obtienen a través de la llamada existente a `/public/info-page`.

---

## 9. Seguridad y Restricciones

- Datos públicos, sin autenticación.
- Sin datos sensibles involucrados.
- Aplica el rate limiting del backend (igual que el resto del contenido público).

---

## 10. Edge Cases

| Escenario | Comportamiento Esperado |
|---|---|
| **Lista vacía** | El componente se renderiza sin errores mostrando arrays vacíos o mensaje "sin datos" |
| **Campos nulos/ausentes** | Los campos opcionales deben manejarse con optional chaining o valores por defecto |
| **Conflicto `Language` vs `CurriculumLanguage`** | Planner debe definir naming para evitar colisión de imports |
| **Sección sin datos** | La sección podría ocultarse si no hay datos en ninguna de las 3 entidades |
| **Descripción HTML** | Los campos `description` de Course y Certification son HTML. Deben renderizarse con `dangerouslySetInnerHTML` o sanitizarse |

---

## 11. Criterios de Aceptación

| ID | Criterio | Verificación |
|---|---|---|
| CA-01 | Existe interfaz `Course` en `interfaces/resume/Course.ts` con todos los campos de `CourseResponse` del OpenAPI | Compilación TS exitosa |
| CA-02 | Existe interfaz `Certification` en `interfaces/resume/Certification.ts` con todos los campos de `CertificationResponse` | Compilación TS exitosa |
| CA-03 | Existe interfaz `Language` en `interfaces/resume/Language.ts` con todos los campos de `LanguageResponse` (idiomas del CV) | Compilación TS exitosa |
| CA-04 | `InfoPageResponse` incluye `courses: Course[]`, `certifications: Certification[]`, `languages: Language[]` | Compilación TS exitosa |
| CA-05 | `interfaces/resume/index.ts` exporta las 3 nuevas interfaces | Import exitoso |
| CA-06 | Existe un componente UI que muestra Idiomas, Cursos y Certificaciones después de la sección AboutMe | Revisión visual / test |
| CA-07 | El componente maneja i18n (ES/EN) para todos los textos mostrados | Cambio de idioma verifica textos |
| CA-08 | La página principal (`app/page.tsx`) incluye el nuevo componente en el orden correcto | Inspección de código |
| CA-09 | La numeración de secciones se actualizó correctamente (pasar de X/5 a X/6 en todas las secciones) | Revisión visual |
| CA-10 | El ScrollSpy en `page.tsx` reconoce la nueva sección | Scroll verifica active menu |
| CA-11 | No hay errores de compilación por conflicto entre `Language` y `CurriculumLanguage` | Compilación TS exitosa |
| CA-12 | Los textos de la nueva sección están traducidos en `locales/es.json` y `locales/en.json` | Inspección de archivos |
| CA-13 | Si no hay datos en alguna entidad, el componente no se rompe (arrays vacíos) | Prueba con datos vacíos |

---

## 12. Preguntas Abiertas

### Críticas (bloquean handoff a Planner)

| ID | Pregunta | Impacto |
|---|---|---|
| PC-01 | ¿Cómo resolver el naming de la entidad `Language` para evitar colisión con el enum existente `CurriculumLanguage`? | Afecta toda la implementación |
| PC-02 | ¿Las 3 entidades van en **un solo componente** o en **componentes separados** dentro de la misma sección? | Afecta diseño y mantenibilidad |
| PC-03 | ¿Se debe ocultar la sección completa si no hay datos en ninguna de las 3 entidades? | Afecta UX |
| PC-04 | ¿Los campos `description` HTML de Course y Certification deben sanitizarse (DOMPurify) antes de renderizar? | Afecta seguridad |

### No críticas

| ID | Pregunta | Impacto |
|---|---|---|
| PN-01 | ¿El orden dentro de la sección es: primero Idiomas, luego Cursos, luego Certificaciones? | Afecta layout |
| PN-02 | ¿Courses y Certifications se ordenan por fecha descendente? | Afecta visualización |
| PN-03 | ¿Se requiere animación GSAP para la nueva sección (como en Experience/Attainments)? | Afecta desarrollo |
| PN-04 | ¿Se requieren tests unitarios para el nuevo componente? | Esfuerzo |

---

## 13. Supuestos

| Supuesto | Justificación |
|---|---|
| Los datos ya vienen en la respuesta de `getInfoPage()` | Verificado en el OpenAPI (`InfoPageResponse` incluye los campos) |
| No se requiere modificar `ResumeContext` | Solo se necesita actualizar el tipo `InfoPageResponse` |
| No se requieren nuevas funciones de fetching | Los datos ya se obtienen con la llamada existente |
| El estilo visual sigue el patrón de Experience/Attainments | El usuario indicó "mostrarlos como se muestra hoy las experiencias" |
| La numeración de secciones pasa de 5 a 6 | Porque se agrega 1 nueva sección al layout |
| Courses y Certifications tienen descripciones en HTML | Según OpenAPI: `description` es string HTML |

---

## 14. Handoff para Planner

### Resumen Funcional
Se necesita mostrar 3 nuevas entidades (Idiomas, Cursos, Certificaciones) en el frontend público. Los datos **ya vienen** en la respuesta de `/public/info-page`, solo falta tiparlos y crear el componente UI. La nueva sección va después de AboutMe. References y CustomSections se excluyen de esta iteración.

### Scope
- 3 interfaces TypeScript (Course, Certification, Language)
- Actualización de `InfoPageResponse`
- 1 nuevo componente UI (o varios) para la sección
- Actualización de `app/page.tsx` (layout + scrollSpy)
- Actualización de numeración de secciones (5 → 6)
- Traducciones en locales

### Out of Scope
- References y CustomSections
- Modificaciones al backend
- Nuevos DAOs o endpoints
- Modificaciones al ResumeContext
- Nuevas entradas en Navigation

### Entidades
Course, Certification, Language (idiomas del CV)

### Integraciones
Solo `hv-go-ms-resume` (vía `getInfoPage()` existente)

### Decisiones Pendientes para Planner
1. Resolver naming de `Language` vs `CurriculumLanguage`
2. Definir si la sección es un solo componente o varios
3. Definir si ocultar sección cuando no hay datos
4. Definir sanitización de HTML en descripciones
5. Definir animaciones GSAP para la nueva sección
6. Definir orden y agrupación visual de las 3 entidades
7. Tests unitarios para el nuevo componente

### Riesgos Funcionales
- Colisión de nombres `Language` / `CurriculumLanguage`
- HTML sin sanitizar en descripciones (XSS potencial)
- Sección vacía si no hay datos (manejo de estado)
- Numeración de secciones inconsistente si se omite alguna
