# Sistema de Validación de Personal - Municipio Jiménez

Un sistema ágil, moderno y seguro para la verificación de identidad del personal adscrito al Municipio Jiménez y sus respectivos centros de salud.

## 🚀 Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3 (Glassmorphism UI), JavaScript (Vanilla)
- **Backend:** Google Apps Script (GAS) como API REST
- **Base de Datos:** Google Sheets
- **Hosting:** Diseñado para ser desplegado en [Vercel](https://vercel.com/) o plataformas similares.

## 🌟 Características Principales

1. **Búsqueda Eficiente:** Consulta de personal usando únicamente el número de cédula.
2. **Interfaz Moderna:** Diseño "Glassmorphism" con animaciones suaves, garantizando excelente legibilidad y experiencia de usuario (UX).
3. **Responsive Design:** Adaptado para funcionar perfectamente en dispositivos móviles (Mobile-First) y monitores de escritorio.
4. **Calculadora de Edad Dinámica:** Calcula en tiempo real la edad del empleado basándose en su fecha de nacimiento registrada.
5. **Manejo Inteligente de Fotografías:** Si la foto está disponible en Google Drive, el sistema optimiza su visualización. Si no, muestra un avatar automático (emoji) basándose en la edad y sexo del empleado.
6. **Generador de Código QR:** Script incluido para procesar de forma masiva códigos QR y optimización de links de Drive dentro de la misma Base de Datos.

## ⚙️ Configuración e Instalación

### 1. Configurar Base de Datos (Google Sheets)
- Asegúrate de que las columnas mantengan exactamente la estructura solicitada: `NACIONALIDAD, CEDULA, APELLIDOS Y NOMBRES... FOTO, QR, OBSERVACION`.

### 2. Implementar el Backend (Google Apps Script)
1. Abre tu hoja de Google Sheets.
2. Ve a **Extensiones > Apps Script**.
3. Pega el código del archivo `Codigo.gs` en el editor.
4. (Opcional) Agrega el archivo `GeneradorQR.gs` para habilitar las utilidades de QR.
5. Haz clic en **Implementar > Nueva implementación**.
6. Selecciona tipo **Aplicación web**.
7. En "Ejecutar como", selecciona **Tú**. En "Quién tiene acceso", selecciona **Cualquier persona**.
8. Copia la URL de implementación generada.

### 3. Configurar Frontend
1. Abre el archivo `script.js`.
2. Ubica la constante `SCRIPT_URL` en la línea 2.
3. Reemplaza el valor de la constante con la URL que copiaste en el paso anterior.
4. Despliega la carpeta que contiene `index.html`, `styles.css` y `script.js` en Vercel (o tu hosting de preferencia).

## 📄 Créditos y Licencia

**Diseño y Desarrollo:** [ejavierds](https://ejavierds.vercel.app)
Todos los derechos reservados © 2026.

Las normativas sobre el uso del sistema se rigen por los **Términos de Uso** y la **Política de Privacidad** integrados en la aplicación.
