//© Zero - Código libre no comercial


// Cargar el SVG y animar los corazones
fetch('Img/treelove.svg')
    .then(res => res.text())
    .then(svgText => {
        const container = document.getElementById('tree-container');
        container.innerHTML = svgText;
        const svg = container.querySelector('svg');
        if (!svg) return;

        // Animación de "dibujo" para todos los paths
        const allPaths = Array.from(svg.querySelectorAll('path'));
        allPaths.forEach(path => {
            path.style.stroke = '#222';
            path.style.strokeWidth = '2.5';
            path.style.fillOpacity = '0';
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            path.style.transition = 'none';
        });

        // Forzar reflow y luego animar
        setTimeout(() => {
            allPaths.forEach((path, i) => {
                path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s, fill-opacity 0.5s ${0.9 + i * 0.08}s`;
                path.style.strokeDashoffset = 0;
                setTimeout(() => {
                    path.style.fillOpacity = '1';
                    path.style.stroke = '';
                    path.style.strokeWidth = '';
                }, 1200 + i * 80);
            });

            // Después de la animación de dibujo, mueve y agranda el SVG
            const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500;
            setTimeout(() => {
                svg.classList.add('move-and-scale');
                // Mostrar texto con efecto typing
                setTimeout(() => {
                    showDedicationText();
                    // Mostrar petalos flotando
                    startFloatingObjects();
                    // Mostrar cuenta regresiva
                    showCountdown();
                    // Iniciar música de fondo
                    playBackgroundMusic();
                }, 1200); //Tiempo para agrandar el SVG
            }, totalDuration);
        }, 50);

        // Selecciona los corazones (formas rojas)
        const heartPaths = allPaths.filter(el => {
            const style = el.getAttribute('style') || '';
            return style.includes('#FC6F58') || style.includes('#C1321F');
        });
        heartPaths.forEach(path => {
            path.classList.add('animated-heart');
        });
    });

// Efecto máquina de escribir para el texto de dedicatoria (seguidores)
function getURLParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

function showDedicationText() {
    const container = document.getElementById('dedication-text');
    container.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
            <!-- Encabezado -->
            <div style="font-size:1.5rem; font-weight:bold; color:#e60026; text-align:center;">
                Página en caso de que Nathaly necesite ánimos
            </div>

            <!-- Primer fila de gifs -->
            <div style="display:flex; gap:10px; justify-content:center; align-items:center;">
                <img src="https://i.pinimg.com/originals/a9/fb/d4/a9fbd437bf2255bf60b6bff1fabf4bed.gif" 
                     alt="Gatito 1" style="width:100px; height:100px; border-radius:0.7em;">
                <img src="https://24.media.tumblr.com/tumblr_lz9huc30Ut1qzrlhgo6_250.gif" 
                     alt="Gatito 2" style="width:100px; height:100px; border-radius:0.7em;">
                <img src="https://i.pinimg.com/originals/ea/b3/cc/eab3cc85c50c637d089d04ef3ea8a86d.gif" 
                     alt="Gatito 3" style="width:100px; height:100px; border-radius:0.7em;">
                <img src="https://i.pinimg.com/originals/20/3e/49/203e49f1b062fa714bf9560c2749675c.gif" 
                     alt="Gatito 4" style="width:100px; height:100px; border-radius:0.7em;">
            </div>

            <!-- Segunda fila de gifs -->
            <div style="display:flex; gap:10px; justify-content:center; align-items:center;">
                <img src="https://i.redd.it/aaaaa-stresss-cat-restored-gif-v0-391eu1s8wn9e1.gif?width=500&auto=webp&s=a310c37ed431c642cadf0cac97124bfc7ab9a4e4" 
                     alt="Gatito 5" style="width:100px; height:100px; border-radius:0.7em;">
                <img src="https://i.pinimg.com/originals/6c/74/a1/6c74a12900c34a801fb0a5729384d36a.gif" 
                     alt="Gatito 6" style="width:100px; height:100px; border-radius:0.7em;">
                <img src="https://i.pinimg.com/originals/56/a6/14/56a614261d423da1825452363174c685.gif" 
                     alt="Gatito 7" style="width:100px; height:100px; border-radius:0.7em;">
                <img src="https://media.tenor.com/ENgTZmyhfCwAAAAM/chat-cat.gif" 
                     alt="Gatito 8" style="width:100px; height:100px; border-radius:0.7em;">
            </div>

            <!-- Pie de página -->
            <div style="font-size:1rem; font-style:italic; color:#333; margin-top:10px; text-align:center;">
                Derechos de autor reservados por Junior sino bala por plagio
            </div>
        </div>
    `;
    container.style.opacity = 1; // Para que se vea inmediatamente
}


function showCountdown() {
    const container = document.getElementById('countdown');

    // Fecha del próximo cumpleaños (18 de febrero)
    function getNextBirthday() {
        const now = new Date();
        let year = now.getFullYear();
        const birthdayThisYear = new Date(`${year}-02-18T00:00:00`);
        // Si ya pasó el 18 de febrero, usar el siguiente año
        if (now > birthdayThisYear) year++;
        return new Date(`${year}-02-18T00:00:00`);
    }

    function update() {
        const now = new Date();
        const birthday = getNextBirthday();
        let diff = birthday - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        container.innerHTML = `
            ⏳ Faltan: <b>${days}d ${hours}h ${minutes}m ${seconds}s</b><br>
            🎉 Hasta tu cumpleaños-18 de febrero
        `;
        container.classList.add('visible');
    }

    update();
    setInterval(update, 1000);
}


// Firma manuscrita animada
function showSignature() {
    // Cambia para buscar la firma dentro del contenedor de dedicatoria
    const dedication = document.getElementById('dedication-text');
    let signature = dedication.querySelector('#signature');
    if (!signature) {
        signature = document.createElement('div');
        signature.id = 'signature';
        signature.className = 'signature';
        dedication.appendChild(signature);
    }
    let firma = getURLParam('firma');
    signature.textContent = firma ? decodeURIComponent(firma) : "Con amor, Zero";
    signature.classList.add('visible');
}



// Controlador de objetos flotantes
function startFloatingObjects() {
    const container = document.getElementById('floating-objects');
    let count = 0;

    function spawn() {
        let el = document.createElement('div');
        el.className = 'floating-petal';
        // Posición inicial
        el.style.left = `${Math.random() * 90 + 2}%`;
        el.style.top = `${100 + Math.random() * 10}%`;
        el.style.opacity = 0.7 + Math.random() * 0.3;
        container.appendChild(el);

        // Animación flotante
        const duration = 6000 + Math.random() * 4000;
        const drift = (Math.random() - 0.5) * 60;
        setTimeout(() => {
            el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
            el.style.transform = `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`;
            el.style.opacity = 0.2;
        }, 30);

        // Eliminar después de animar
        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, duration + 2000);

        // Generar más objetos
        if (count++ < 32) setTimeout(spawn, 350 + Math.random() * 500);
        else setTimeout(spawn, 1200 + Math.random() * 1200);
    }
    spawn();
}


// --- Música de fondo ---
function playBackgroundMusic() {
    const audio = document.getElementById('bg-music');
    if (!audio) return;

    // --- Opción archivo local por parámetro 'musica' ---
    let musicaParam = getURLParam('musica');
    if (musicaParam) {
        // Decodifica y previene rutas maliciosas
        musicaParam = decodeURIComponent(musicaParam).replace(/[^\w\d .\-]/g, '');
        audio.src = 'Music/' + musicaParam;
    }

    // --- Opción YouTube (solo mensaje de ayuda) ---
    let youtubeParam = getURLParam('youtube');
    if (youtubeParam) {
        // Muestra mensaje de ayuda para descargar el audio
        let helpMsg = document.getElementById('yt-help-msg');
        if (!helpMsg) {
            helpMsg = document.createElement('div');
            helpMsg.id = 'yt-help-msg';
            helpMsg.style.position = 'fixed';
            helpMsg.style.right = '18px';
            helpMsg.style.bottom = '180px';
            helpMsg.style.background = 'rgba(255,255,255,0.95)';
            helpMsg.style.color = '#e60026';
            helpMsg.style.padding = '10px 16px';
            helpMsg.style.borderRadius = '12px';
            helpMsg.style.boxShadow = '0 2px 8px #e6002633';
            helpMsg.style.fontSize = '1.05em';
            helpMsg.style.zIndex = 100;
            helpMsg.innerHTML = 'Para usar música de YouTube, descarga el audio (por ejemplo, usando y2mate, 4K Video Downloader, etc.), colócalo en la carpeta <b>Music</b> y usa la URL así:<br><br><code>?musica=nombre.mp3</code>';
            document.body.appendChild(helpMsg);
            setTimeout(() => { if (helpMsg) helpMsg.remove(); }, 15000);
        }
    }

    let btn = document.getElementById('music-btn');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'music-btn';
        btn.textContent = '🔊 Música';
        btn.style.position = 'fixed';
        btn.style.bottom = '18px';
        btn.style.right = '18px';
        btn.style.zIndex = 99;
        btn.style.background = 'rgba(255,255,255,0.85)';
        btn.style.border = 'none';
        btn.style.borderRadius = '24px';
        btn.style.padding = '10px 18px';
        btn.style.fontSize = '1.1em';
        btn.style.cursor = 'pointer';
        document.body.appendChild(btn);
    }
    audio.volume = 0.7;
    audio.loop = true;
    // Intentar reproducir inmediatamente
    audio.play().then(() => {
        btn.textContent = '🔊 Música';
    }).catch(() => {
        // Si falla el autoplay, esperar click en el botón
        btn.textContent = '▶️ Música';
    });
    btn.onclick = () => {
        if (audio.paused) {
            audio.play();
            btn.textContent = '🔊 Música';
        } else {
            audio.pause();
            btn.textContent = '🔈 Música';
        }
    };
}

// Intentar reproducir la música lo antes posible (al cargar la página)
window.addEventListener('DOMContentLoaded', () => {
    playBackgroundMusic();
});