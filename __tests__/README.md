# Pruebas Unitarias

Este directorio contiene las pruebas unitarias del proyecto.

## Estructura

```
__tests__/
├── api/
│   └── resumeApi.test.ts          # Pruebas para las funciones de API
├── components/
│   ├── Experience.test.tsx         # Pruebas para el componente Experience
│   └── Navigation.test.tsx         # Pruebas para el componente Navigation
├── contexts/
│   ├── LanguageContext.test.tsx    # Pruebas para el contexto de idioma
│   └── ResumeContext.test.tsx      # Pruebas para el contexto de resume
├── hooks/
│   └── useTranslation.test.tsx     # Pruebas para el hook de traducción
└── utils/
    └── dateFormatter.test.ts       # Pruebas para las utilidades de formato de fecha
```

## Ejecutar Pruebas

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas en modo watch
```bash
npm run test:watch
```

### Ejecutar pruebas con cobertura
```bash
npm run test:coverage
```

## Cobertura

Las pruebas cubren:
- ✅ Utilidades de formato de fecha (`dateFormatter.ts`)
- ✅ Funciones de API (`resumeApi.ts`)
- ✅ Contextos (`LanguageContext`, `ResumeContext`)
- ✅ Hooks (`useTranslation`)
- ✅ Componentes principales (`Navigation`, `Experience`)

## Notas

- Las pruebas utilizan Jest y React Testing Library
- Los mocks están configurados en `jest.setup.js`
- Las pruebas están configuradas para trabajar con Next.js 14
