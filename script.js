// ¡IMPORTANTE! REEMPLAZA ESTA URL CON LA URL DE TU APLICACIÓN WEB DE APPS SCRIPT PUBLICADA
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyRNclvY4nDVb03zJI4qGGSdndBNQ-NRQPhi0MxtW_dtgtpxnl7Ar3XSlGTOHIgbyO8/exec';

document.getElementById('search-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const cedulaInput = document.getElementById('cedula');
    const cedula = cedulaInput.value.trim();
    if (!cedula) return;

    // Referencias a elementos UI
    const btn = document.getElementById('search-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const errorMessage = document.getElementById('error-message');
    const resultCard = document.getElementById('result-card');
    
    // Estado de Carga
    btn.disabled = true;
    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    resultCard.classList.add('hidden');
    cedulaInput.blur(); // Ocultar teclado en móviles

    try {
        const response = await fetch(`${SCRIPT_URL}?cedula=${encodeURIComponent(cedula)}`);
        
        if (!response.ok) {
            throw new Error('Error en la comunicación con el servidor.');
        }
        
        const resData = await response.json();

        if (resData.error) {
            showError(resData.message);
        } else {
            renderData(resData.data);
        }
    } catch (error) {
        showError('No se pudo conectar. Verifica tu conexión a internet o la URL del Script.');
        console.error("Fetch Error:", error);
    } finally {
        // Restaurar estado del botón
        btn.disabled = false;
        btnText.classList.remove('hidden');
        btnSpinner.classList.add('hidden');
    }
});

function showError(msg) {
    const errorEl = document.getElementById('error-message');
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
}

function renderData(data) {
    // 1. Llenar datos de texto
    const formatValue = (val) => val ? String(val).trim() : 'N/A';
    
    document.getElementById('r-nombre').textContent = formatValue(data['APELLIDOS Y NOMBRES']);
    document.getElementById('r-cargo').textContent = formatValue(data['CARGO NOMINAL']) !== 'N/A' ? data['CARGO NOMINAL'] : 'SIN CARGO';
    
    const nacionalidad = data['NACIONALIDAD'] ? data['NACIONALIDAD'] : 'V';
    document.getElementById('r-cedula').textContent = `${nacionalidad}-${formatValue(data['CEDULA'])}`;
    
    document.getElementById('r-edad').textContent = data['EDAD'] ? `${data['EDAD']} años` : 'N/A';
    document.getElementById('r-profesion').textContent = formatValue(data['PROFESION']);
    document.getElementById('r-estado').textContent = formatValue(data['ESTADO']);
    
    const centroSalud = formatValue(data['CENTRO DE SALUD']);
    document.getElementById('r-centro').textContent = centroSalud;
    
    // Mostrar servicio; si es N/A usar dpto
    const dpto = formatValue(data['DEPARTAMENTO']);
    const servicio = formatValue(data['SERVICIO']);
    document.getElementById('r-servicio').textContent = (servicio !== 'N/A') ? servicio : dpto;
    
    document.getElementById('r-responsabilidad').textContent = formatValue(data['RESPONSABILIDAD']);
    
    // Formatear Fecha de Ingreso
    let fechaIngreso = formatValue(data['FECHA DE INGRESO AL CENTRO DE SALUD']);
    if (fechaIngreso !== 'N/A' && fechaIngreso.includes('T')) {
        fechaIngreso = new Date(fechaIngreso).toLocaleDateString('es-ES');
    }
    document.getElementById('r-ingreso').textContent = fechaIngreso;
    
    document.getElementById('r-telefono').textContent = formatValue(data['TELEFONO']);
    document.getElementById('r-discapacidad').textContent = formatValue(data['¿CON ALGUNA DISCAPACIDAD?']);

    // Certificado Institucional Dinámico
    const nombres = formatValue(data['APELLIDOS Y NOMBRES']);
    const cedula = `${nacionalidad}-${formatValue(data['CEDULA'])}`;
    const cargo = formatValue(data['CARGO NOMINAL']);
    const municipio = formatValue(data['MUNICIPIO']);
    
    // Si el municipio existe en la base de datos, lo mostramos, de lo contrario lo dejamos genérico
    const textoMunicipio = (municipio !== 'N/A') ? `del Municipio ${municipio}` : `correspondiente`;
    
    document.getElementById('r-certificado').innerHTML = `La <strong>Autoridad de Salud ${textoMunicipio}</strong> y la <strong>Dirección de ${centroSalud}</strong> certifican que el(la) ciudadano(a) <strong>${nombres}</strong>, titular de la cédula de identidad <strong>${cedula}</strong>, labora activamente en nuestra institución como <strong>${cargo}</strong>.`;

    // Sello de tiempo (Fecha y hora de consulta)
    const fechaActual = new Date();
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById('r-fecha-consulta').textContent = `Consulta realizada el ${fechaActual.toLocaleDateString('es-ES', opcionesFecha)}`;
    // 2. Lógica de Imagen y Avatar Fallback
    const profileImg = document.getElementById('profile-img');
    const avatarFallback = document.getElementById('avatar-fallback');
    
    // Resetear visibilidad
    profileImg.classList.add('hidden');
    avatarFallback.classList.add('hidden');

    if (data['FOTO_URL']) {
        // Asignar y mostrar la imagen
        profileImg.src = data['FOTO_URL'];
        
        // Manejar el caso donde la imagen falle al cargar
        profileImg.onerror = () => {
            profileImg.classList.add('hidden');
            renderFallbackAvatar(data, avatarFallback);
        };
        
        profileImg.onload = () => {
            profileImg.classList.remove('hidden');
        }
    } else {
        // Si no hay FOTO_URL, mostrar emoji
        renderFallbackAvatar(data, avatarFallback);
    }

    // Mostrar tarjeta con animación
    document.getElementById('result-card').classList.remove('hidden');
}

function renderFallbackAvatar(data, container) {
    const sexoStr = (data['SEXO'] || '').toLowerCase().trim();
    const edad = data['EDAD'] || 30; // Edad default si no tiene
    
    let isFemale = sexoStr === 'f' || sexoStr === 'femenino' || sexoStr === 'mujer';
    let isMale = sexoStr === 'm' || sexoStr === 'masculino' || sexoStr === 'hombre';
    
    let emoji = '👤'; // Default
    
    if (isFemale) {
        if (edad < 25) emoji = '👩';
        else if (edad < 55) emoji = '👩‍💼';
        else emoji = '👵';
    } else if (isMale) {
        if (edad < 25) emoji = '👨';
        else if (edad < 55) emoji = '👨‍💼';
        else emoji = '👴';
    }

    container.textContent = emoji;
    container.classList.remove('hidden');
}

// Modal Logic
function openModal(modalId) {
    document.getElementById(modalId).classList.remove("hidden");
}

function closeModalDirect(modalId) {
    document.getElementById(modalId).classList.add("hidden");
}

function closeModal(event, modalId) {
    if (event.target.id === modalId) {
        closeModalDirect(modalId);
    }
}

