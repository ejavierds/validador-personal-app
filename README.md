# Sistema de Verificación de Personal de Salud

Un sistema ágil, moderno, seguro y altamente escalable para la verificación de identidad del personal adscrito a dependencias e instituciones de salud.

## 🚀 Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3 (Glassmorphism UI), JavaScript (Vanilla)
- **Backend:** Google Apps Script (GAS) operando como API REST
- **Base de Datos:** Google Sheets
- **Hosting:** Diseñado para ser desplegado en [Vercel](https://vercel.com/) o plataformas similares.

## 🌟 Características Principales

1. **Búsqueda Eficiente:** Consulta del perfil de cada trabajador utilizando únicamente su número de cédula de identidad.
2. **Interfaz Moderna:** Diseño basado en "Glassmorphism" con animaciones fluidas que proporcionan una experiencia de usuario (UX) inmersiva y profesional.
3. **Escalable (Multi-Región):** El sistema extrae dinámicamente el estado y el municipio de la base de datos, no estando limitado a una sola área geográfica.
4. **Responsive Design:** Diseño adaptativo "Mobile-First", garantizando perfecta legibilidad tanto en smartphones como en monitores de escritorio.
5. **Generación Automática de Certificados:** Emite dinámicamente un texto de certificación de la Autoridad de Salud, firmado con la fecha y hora exacta de la consulta.
6. **Manejo Inteligente de Fotografías:** 
   - Procesa los enlaces de Drive utilizando el Endpoint de Thumbnails de Google para una carga ultrarrápida y libre de bloqueos CORS.
   - Cuenta con un avatar (emoji) dinámico de contingencia basado en la edad calculada y sexo del empleado en caso de que la foto falte.
7. **Sincronización Automática con Google Drive:** 
   - Incluye módulos integrados (`GeneradorQR.gs`) que asocian automáticamente miles de fotos subidas a una carpeta de Drive a la base de datos usando el número de cédula.
   - Generación automática de Códigos QR individuales por cada perfil.

## ⚙️ Configuración e Instalación

### 1. Configurar Base de Datos (Google Sheets)
- Asegúrate de que las columnas mantengan exactamente esta estructura: `NACIONALIDAD, CEDULA, APELLIDOS Y NOMBRES... FOTO, QR, OBSERVACION`.
- **Importante:** La carpeta de Drive donde alojes las fotografías debe tener sus permisos configurados en **"Cualquier persona con el enlace" (Visor)**.

### 2. Implementar el Backend (Google Apps Script)
1. Abre tu hoja de Google Sheets.
2. Ve a **Extensiones > Apps Script**.
3. Pega el código del archivo `Codigo.gs` en un archivo y el de `GeneradorQR.gs` en otro.
4. Haz clic en **Implementar > Nueva implementación**.
5. Selecciona el tipo **Aplicación web**.
6. En "Ejecutar como", selecciona **Tú**. En "Quién tiene acceso", selecciona **Cualquier persona**.
7. Copia la URL de implementación generada (termina en `/exec`).

### 3. Configurar Frontend
1. Abre el archivo local `script.js`.
2. Ubica la constante `SCRIPT_URL` en la parte superior.
3. Reemplaza su valor pegando la URL que copiaste en el paso anterior.
4. Despliega los archivos del proyecto (`index.html`, `styles.css`, `script.js`, y el banner de imagen) en tu plataforma de hosting preferida.

## 📄 Créditos y Licencia

**Diseño y Desarrollo:** [ejavierds](https://ejavierds.vercel.app)
Todos los derechos reservados © 2026.

Las normativas sobre el uso del sistema se rigen por los **Términos de Uso** y la **Política de Privacidad** incorporados de manera nativa (modales dinámicos) en la aplicación.
