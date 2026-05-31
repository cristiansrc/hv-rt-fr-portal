import { ImageResponse } from 'next/og';

// Configuración de la imagen (Estándar de Open Graph)
export const runtime = 'edge';
export const alt = 'Cristian SRC - Senior Software Engineer - Full Stack Developer - Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // Colores de la página (coinciden exactamente con los estilos)
  const primaryColor = '#FFDB67'; // rgb(255, 219, 103)
  const blackColor = '#000000';
  const whiteColor = '#FFFFFF';
  
  // Tecnologías a mostrar
  const technologies = [
    'Java (Spring Boot)',
    'Python (FastAPI)',
    'React',
    'Liferay',
    'SQL',
    'AWS'
  ];
  
  // Cargar la foto del usuario desde la URL pública
  let profileImage: string | null = null;
  try {
    // En desarrollo, usar localhost; en producción usar la URL del sitio
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const imageUrl = `${baseUrl}/images/foto.png`;
    const response = await fetch(imageUrl);
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      // Convertir a base64 usando btoa (compatible con edge runtime)
      // Usar Array.from para evitar problemas con spread operator
      const binary = Array.from(uint8Array, byte => String.fromCharCode(byte)).join('');
      const base64 = btoa(binary);
      profileImage = `data:image/png;base64,${base64}`;
    }
  } catch (error) {
    // Si falla, simplemente no mostrar la imagen
    console.error('Error loading profile image:', error);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
          background: primaryColor, // Fondo principal amarillo como la página
        }}
      >
        {/* Contenedor principal con layout similar a la sección Hero */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            padding: '60px 80px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Columna izquierda: Contenido de texto (como Hero) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              maxWidth: '58%',
              paddingRight: '50px',
            }}
          >
            {/* Saludo (como h4.freelancer) */}
            <div
              style={{
                fontSize: 36,
                fontWeight: 500,
                color: blackColor,
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              HI, I'M CRIS
            </div>

            {/* Título principal (como Typewriter h1) */}
            <h1
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: blackColor,
                margin: 0,
                marginBottom: '15px',
                letterSpacing: '-2px',
                lineHeight: 1.1,
              }}
            >
              Senior Software
            </h1>
            <h1
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: blackColor,
                margin: 0,
                marginBottom: '20px',
                letterSpacing: '-2px',
                lineHeight: 1.1,
              }}
            >
              Engineer
            </h1>

            {/* Ubicación (como p.description) */}
            <p
              style={{
                fontSize: 26,
                fontWeight: 500,
                color: blackColor,
                margin: 0,
                marginBottom: '35px',
                opacity: 0.9,
              }}
            >
              📍 based in Bogotá, Colombia
            </p>

            {/* Tecnologías */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              {technologies.map((tech) => (
                <div
                  key={tech}
                  style={{
                    backgroundColor: blackColor,
                    color: primaryColor,
                    padding: '10px 20px',
                    borderRadius: '25px',
                    fontSize: 17,
                    fontWeight: 600,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha: Foto de perfil circular (como img-wrapper) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              maxWidth: '42%',
              position: 'relative',
            }}
          >
            {/* Contenedor de la imagen */}
            <div
              style={{
                width: '400px',
                height: '400px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Círculo de fondo con sombra */}
              <div
                style={{
                  width: '380px',
                  height: '380px',
                  borderRadius: '50%',
                  background: whiteColor,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                }}
              >
                {/* Foto de perfil */}
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Cristian SRC"
                    style={{
                      width: '360px',
                      height: '360px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `5px solid ${primaryColor}`,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '360px',
                      height: '360px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: whiteColor,
                      fontSize: 80,
                      fontWeight: 700,
                      border: `5px solid ${primaryColor}`,
                    }}
                  >
                    CS
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}