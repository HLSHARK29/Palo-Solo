document.addEventListener('DOMContentLoaded', () => {
    const db = window.db; 
    const listaHabitaciones = document.getElementById('lista-habitaciones');
    const btnNuevo = document.getElementById('btn-nuevo');
    const listaServicios = document.getElementById('lista-servicios');
    const btnNuevoServicio = document.getElementById('btn-nuevo-servicio');

    // --- Configuración Inicial de las Gráficas ---
    let miGrafico, graficoAnual;
    
    // Gráfica Circular
    const ctx = document.getElementById('miGrafico').getContext('2d');
    miGrafico = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Limpieza', 'Servicios', 'Mantenimiento', 'Erandi', 'Gina', 'Rodolfo'],
            datasets: [{
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: ['#e74c3c', '#9b59b6', '#e67e22', '#3498db', '#27ae60', '#f1c40f'],
                borderWidth: 1
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    // Gráfica de Barras Histórica
    const ctxAnual = document.getElementById('graficoAnual').getContext('2d');
    graficoAnual = new Chart(ctxAnual, {
        type: 'bar',
        data: { 
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], 
            datasets: [{ 
                label: 'Renta Mensual', 
                data: new Array(12).fill(0), 
                backgroundColor: '#3498db' 
            }] 
        },
        options: { 
            indexAxis: 'y',
            responsive: true, 
            maintainAspectRatio: false, 
            scales: { x: { beginAtZero: true } },
            plugins: { legend: { display: false } }
        }
    });

    // --- Sistema de Mensajes de Malena (El susurro desde el más allá) ---
    const bancoFrasesMalena = [
        "✨ Estoy feliz porque desde aquí veo que tienes una familia hermosa.",
        "💖 Pasé a asomarme un momento solo para recordarte cuánto te amo.",
        "🌟 Respira hondo y recuerda que estoy muy orgullosa de la persona en la que te has convertido.",
        "☕ Tómate un respiro, no todo en la vida es correr; cuídate mucho por favor.",
        "🌸 Te mando un abrazo invisible hasta donde estás. Que tengas un día lleno de paz.",
        "💫 Si las cosas se ponen difíciles, recuerda de lo que estás hecho; tienes toda mi fuerza.",
        "🏡 Veo lo mucho que te esfuerzas todos los días y solo quiero verte sonreír y estar bien.",
        "🕊️ Un saludo al viento para recordarte que nunca estás sola ni solo.",
        "💖 Qué alegría me da verte por aquí construyendo tu camino con tanto amor.",
        "🍀 Que la vida te sonría hoy tanto como tú me haces sonreír a mí desde aquí.",
        "🌙 Recuerda descansar bien cuando acabe el día; tu paz mental es lo más importante.",
        "⭐ A veces solo paso a dejarte un rayito de luz para que ilumines tu día.",
        "🌷 Me encanta ver cómo cuidas de los tuyos; llevas un gran corazón.",
        "🧸 No olvides consentirte un poquito hoy, te lo mereces más que nadie.",
        "✨ Sigue adelante con esa valentía que te caracteriza; yo te cuido desde el horizonte.",
        "💛 Un pedacito de mi corazón siempre camina contigo a donde quiera que vayas.",
        "🌻 Qué bonito es verte sonreír en medio de las pequeñas cosas de la rutina.",
        "🍃 Si el día se pone pesado, recuerda que siempre puedes parar un segundo a respirar hondo.",
        "🌟 Confía en ti, tienes una luz muy especial que ilumina a todos los que te rodean.",
        "🕊️ Te quiero con toda el alma. Hoy y siempre.",
        "💖 Qué orgullo tan grande siento al ver la hermosa vida que estás formando.",
        "☕ Disfruta tu café con calma, tómate un momento para ti hoy.",
        "✨ No te exijas tanto, lo estás haciendo excelente y mereces estar en paz.",
        "🌷 Pase lo que pase, recuerda que el amor verdadero siempre encuentra la forma de abrazarte.",
        "💫 Que la tranquilidad te acompañe en cada paso que des el día de hoy.",
        "🏡 Qué hermoso es ver cómo cuidas tu hogar y a los que amas.",
        "🌟 Te mando un beso al aire; espero que lo caches por ahí.",
        "💖 Me alegra tanto coincidir contigo un ratito hoy. Cuídate mucho.",
        "🌻 Recuerda que las tormentas pasan, pero tu fortaleza se queda para siempre.",
        "🍃 Respira la paz de este momento y suelta cualquier preocupación por un instante.",
        "✨ Tu felicidad es mi mayor paz. Sigue buscando lo que te hace bien.",
        "💛 Un pensamiento lleno de cariño para recordarte lo mucho que vales.",
        "🌙 Que tengas un día tan cálido y hermoso como el amor que dejé sembrado en ti.",
        "⭐ Cierra los ojos un segundo y siente un abrazo fuerte y sincero desde aquí.",
        "🌷 Eres una persona maravillosa, nunca lo olvides.",
        "🕊️ Me da tanta ternura verte esforzarte cada día... por favor, descansa también.",
        "💖 Que la vida te devuelva el doble de todo el amor y la bondad que das.",
        "💫 Un recordatorio express: eres increíble y te quiero muchísimo.",
        "🌻 Sonríe, respira y deja que las cosas fluyan; todo va a estar bien.",
        "✨ Pase a decirte hola un instante, porque mi corazón siempre está atento a ti.",
        "💛 Cuida mucho tu salud y tu descanso, te quiero ver siempre con bien.",
        "🌙 Que la noche te traiga calma y el día te regale motivos para sonreír.",
        "⭐ Sigue brillando con esa luz propia que nadie te puede quitar.",
        "🌷 Estoy muy orgullosa de ver cómo sales adelante todos los días.",
        "🕊️ Te mando toda la buena energía del mundo para lo que tengas que hacer hoy.",
        "💖 Que el amor y la armonía reinen en tu espacio y en tu corazón.",
        "🌻 A veces un pequeño detalle o un recuerdo bastan para sentirnos cerquita.",
        "✨ Disfruta el camino, no tengas tanta prisa por llegar; la vida también es hoy.",
        "💛 Te quiero con el alma entera, hoy y en cada paso que des."
    ];

    function configurarMalena() {
        let contenedorMalena = document.getElementById('malena-mensaje-flotante');
        if (!contenedorMalena) {
            contenedorMalena = document.createElement('div');
            contenedorMalena.id = 'malena-mensaje-flotante';
            contenedorMalena.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #2c3e50;
                color: #ecf0f1;
                padding: 14px 20px;
                border-radius: 10px;
                box-shadow: 0 6px 16px rgba(0,0,0,0.2);
                font-size: 0.9em;
                z-index: 1000;
                transition: opacity 0.6s ease;
                max-width: 320px;
                display: none;
                opacity: 0;
                font-family: inherit;
                line-height: 1.4;
            `;
            document.body.appendChild(contenedorMalena);
        }

        function mostrarMensajeMalena(textoCustom = null) {
            const indice = Math.floor(Math.random() * bancoFrasesMalena.length);
            const mensajeFinal = textoCustom || bancoFrasesMalena[indice];

            contenedorMalena.innerText = mensajeFinal;
            contenedorMalena.style.display = 'block';
            setTimeout(() => { contenedorMalena.style.opacity = '1'; }, 100);

            // Ocultar automáticamente después de unos segundos
            setTimeout(() => {
                contenedorMalena.style.opacity = '0';
                setTimeout(() => { contenedorMalena.style.display = 'none'; }, 600);
            }, 9000);
        }

        // Evaluar bienvenida según el tiempo transcurrido desde la última visita
        const ahora = new Date().getTime();
        const ultimaVisita = localStorage.getItem('malena_ultima_visita');
        
        if (ultimaVisita) {
            const diferenciaHoras = (ahora - parseInt(ultimaVisita)) / (1000 * 60 * 60);
            
            // Si pasaron más de 48 horas desde la última vez
            if (diferenciaHoras > 48) {
                if (Math.random() < 0.6) {
                    setTimeout(() => {
                        mostrarMensajeMalena("Vaya, te has tomado tu tiempo... ya te andaba extrañando por aquí. Qué alegría verte de nuevo. 🕰️✨");
                    }, 2500);
                }
            } else {
                // Visita reciente: aparición arbitraria basada en probabilidad (35% de éxito)
                if (Math.random() < 0.35) {
                    setTimeout(() => {
                        mostrarMensajeMalena("Qué gusto me da encontrarte por aquí un ratito. Te mando un abrazo con todo el corazón. 💖");
                    }, 3000);
                }
            }
        } else {
            // Primerísima vez que entra en este navegador
            setTimeout(() => {
                mostrarMensajeMalena("Hola... qué bonito encontrarte por aquí hoy. Que tengas un día maravilloso. ✨");
            }, 2000);
        }

        // Guardar la visita actual
        localStorage.setItem('malena_ultima_visita', ahora);

        // Factor arbitrario durante la sesión actual: de vez en cuando (cada 5 a 12 minutos)
        // Malena aparece de la nada con un 30% de probabilidad si el usuario sigue ahí.
        const tiempoEsperaAleatorio = (Math.floor(Math.random() * 8) + 5) * 60 * 1000; 
        setInterval(() => {
            if (Math.random() < 0.30) {
                mostrarMensajeMalena();
            }
        }, tiempoEsperaAleatorio);
    }

    configurarMalena();

    // --- Funciones de Acordeón ---
    window.toggleDetalle = function() {
        const detalle = document.getElementById('detalle-mantenimiento');
        const flecha = document.getElementById('flecha');
        if (detalle.style.display === 'none' || detalle.style.display === '') {
            detalle.style.display = 'block';
            flecha.innerText = '▲';
        } else {
            detalle.style.display = 'none';
            flecha.innerText = '▼';
        }
    };

    window.toggleUsuario = function(nombre) {
        const detalle = document.getElementById(`detalle-${nombre}`);
        const flecha = document.getElementById(`flecha-${nombre}`);
        if (detalle.style.display === 'none' || detalle.style.display === '') {
            detalle.style.display = 'block';
            flecha.innerText = '▲';
        } else {
            detalle.style.display = 'none';
            flecha.innerText = '▼';
        }
    };

    function actualizarGraficoHistorico() {
        db.collection("historico_mensual").get().then(snapshot => {
            let datosMensuales = new Array(12).fill(0);
            let totalAnual = 0;
            let acumulados = { erandi: 0, gina: 0, rodolfo: 0 };
            
            let tablaHtml = `
                <table style="width:100%; border-collapse: collapse; font-size: 0.75em; border: 1px solid #eee;">
                    <thead>
                        <tr style="background:#f4f4f4;">
                            <th style="padding: 4px; text-align: left;">Mes</th>
                            <th style="padding: 4px; text-align: right;">Renta</th>
                        </tr>
                    </thead>
                    <tbody>`;
            
            const nombresMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            
            snapshot.forEach(doc => {
                const data = doc.data();
                const partes = doc.id.split('-');
                if (partes.length === 2) {
                    const mesIndex = parseInt(partes[1]) - 1;
                    if (mesIndex >= 0 && mesIndex < 12) {
                        const renta = data.renta || 0;
                        datosMensuales[mesIndex] = renta;
                        totalAnual += renta;
                        
                        if (data.ganancias) {
                            for (let usuario in acumulados) {
                                if (data.ganancias[usuario]) acumulados[usuario] += data.ganancias[usuario];
                            }
                        }

                        tablaHtml += `
                            <tr>
                                <td style="padding: 4px; border-bottom: 1px solid #eee;">${nombresMeses[mesIndex]}</td>
                                <td style="padding: 4px; border-bottom: 1px solid #eee; text-align: right;">$${renta.toLocaleString()}</td>
                            </tr>`;
                    }
                }
            });
            
            tablaHtml += `</tbody></table>`;
            const contenedorTabla = document.getElementById('tabla-historico');
            if(contenedorTabla) contenedorTabla.innerHTML = tablaHtml;
            
            document.getElementById('total-anual-ingresos').innerText = `Total Anual: $${totalAnual.toLocaleString()}`;

            for (let usuario in acumulados) {
                const el = document.getElementById(`detalle-${usuario}`);
                if (el) el.innerHTML = `Acumulado Anual: <strong>$${acumulados[usuario].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>`;
            }
            
            graficoAnual.data.datasets[0].data = datosMensuales;
            graficoAnual.update();
        });
    }

    function actualizarLeyenda(dataValues) {
        const contenedor = document.getElementById('leyenda-personalizada');
        const labels = ['Limpieza', 'Servicios', 'Mantenimiento', 'Erandi', 'Gina', 'Rodolfo'];
        const colores = ['#e74c3c', '#9b59b6', '#e67e22', '#3498db', '#27ae60', '#f1c40f'];
        
        contenedor.innerHTML = labels.map((label, i) => `
            <div class="leyenda-item" style="display:flex; justify-content:space-between; margin-bottom:2px;">
                <span style="color: ${colores[i]};">■ ${label}</span>
                <span>$${Math.round(dataValues[i] || 0).toLocaleString()}</span>
            </div>
        `).join('');
    }

    function guardarCorteMensual(renta, limpieza, neto, totalServicios, mantenimiento, totalRetenido, ganancias) {
        const ahora = new Date();
        const idMes = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}`;
        
        db.collection("historico_mensual").doc(idMes).set({
            renta: renta,
            limpieza: limpieza,
            neto: neto,
            servicios: totalServicios,
            mantenimiento: mantenimiento,
            totalRetenido: totalRetenido,
            ganancias: ganancias, 
            ultimaActualizacion: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true }).then(() => actualizarGraficoHistorico());
    }

    function calcularDashboard() {
        const filasHabitaciones = document.querySelectorAll('.fila-habitacion');
        const spanTotalRenta = document.getElementById('total-renta');
        const spanTotalLimpieza = document.getElementById('total-limpieza');
        const spanTotalNeto = document.getElementById('total-neto');
        
        const totalServicios = parseFloat(document.getElementById('total-servicios').innerText.replace(/[^0-9.-]+/g, "")) || 0;
        
        let sumaRentaBruta = 0, sumaLimpieza = 0, sumaNeto = 0;
        let cargoFijoHabitaciones = 0; 
        
        filasHabitaciones.forEach(fila => {
            const inputRenta = fila.querySelector('.renta');
            const inputLimpieza = fila.querySelector('.limpieza');
            const btn = fila.querySelector('.toggle');
            const spanResultado = fila.querySelector('.resultado');
            const nombreHab = fila.querySelector('span').innerText;
            
            if (!inputRenta || !inputLimpieza || !btn) return;

            const renta = parseFloat(inputRenta.value) || 0;
            const limpieza = parseFloat(inputLimpieza.value) || 0;
            const estaOcupada = btn.innerText === "Si";

            inputRenta.style.backgroundColor = (renta === 0) ? '#f1c40f' : 'white';
            btn.style.backgroundColor = estaOcupada ? '#27ae60' : '#e74c3c';

            if (estaOcupada) {
                const netoFila = renta - limpieza;
                sumaRentaBruta += renta;
                sumaLimpieza += limpieza;
                sumaNeto += netoFila;
                spanResultado.innerText = `$${netoFila.toLocaleString()}`;

                if (nombreHab.includes("1") || nombreHab.includes("5")) {
                    cargoFijoHabitaciones += 200;
                }
            } else {
                spanResultado.innerText = "$0";
            }
        });

        if (spanTotalRenta) spanTotalRenta.innerText = `$${sumaRentaBruta.toLocaleString()}`;
        if (spanTotalLimpieza) spanTotalLimpieza.innerText = `$${sumaLimpieza.toLocaleString()}`;
        if (spanTotalNeto) spanTotalNeto.innerText = `$${sumaNeto.toLocaleString()}`;

        const pctRet = (parseFloat(document.getElementById('porcentaje-ret').value) || 0) / 100;
        const pctIni = (parseFloat(document.getElementById('porcentaje-ini').value) || 0) / 100;
        
        const baseIni = sumaNeto - totalServicios;
        const manIni = (baseIni * pctIni) + cargoFijoHabitaciones;
        const manRet = (baseIni - manIni) * pctRet;
        const manFin = manRet + manIni;
        const totalRetenido = manFin + totalServicios + sumaLimpieza;

        document.getElementById('res-mantenimiento-ret').innerText = `$${manRet.toFixed(2)}`;
        document.getElementById('res-mantenimiento-ini').innerText = `$${manIni.toFixed(2)}`;
        document.getElementById('res-mantenimiento-fin').innerText = `$${manFin.toFixed(2)}`;
        document.getElementById('retencion-servicios').innerText = `$${totalServicios.toLocaleString()}`;
        document.getElementById('retencion-limpieza').innerText = `$${sumaLimpieza.toLocaleString()}`;

        const baseGanancias = sumaNeto - totalServicios - manIni;
        const gananciasObj = {};

        document.querySelectorAll('.fila-ganancia').forEach(fila => {
            const nombre = fila.querySelector('.nombre-persona').innerText.trim().toLowerCase().split(' ')[0];
            const pct = parseFloat(fila.querySelector('.input-porcentaje').value) || 0;
            const monto = baseGanancias * (pct / 100);
            
            const resGanancia = fila.querySelector('.resultado-ganancia');
            resGanancia.innerText = `$${monto.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            gananciasObj[nombre] = parseFloat(monto.toFixed(2));
        });

        const datosFinales = [
            sumaLimpieza, totalServicios, manFin,
            gananciasObj['erandi'] || 0, gananciasObj['gina'] || 0, gananciasObj['rodolfo'] || 0
        ];

        miGrafico.data.datasets[0].data = datosFinales;
        actualizarLeyenda(datosFinales);
        miGrafico.update();

        const elTotalRetenido = document.getElementById('total-retenido');
        if(elTotalRetenido) elTotalRetenido.innerText = `$${totalRetenido.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        
        guardarCorteMensual(sumaRentaBruta, sumaLimpieza, sumaNeto, totalServicios, manFin, totalRetenido, gananciasObj);
    }

    function calcularServicios() {
        let totalServicios = 0;
        document.querySelectorAll('.fila-servicio').forEach(fila => {
            const costo = parseFloat(fila.querySelector('.costo').value) || 0;
            const btn = fila.querySelector('.toggle-servicio');
            const activo = btn.innerText === "Si";
            const spanTotal = fila.querySelector('.total-fila');
            
            btn.style.backgroundColor = activo ? '#27ae60' : '#e74c3c';
            const valor = activo ? costo : 0;
            spanTotal.innerText = `$${valor.toLocaleString()}`;
            totalServicios += valor;
        });
        document.getElementById('total-servicios').innerText = `$${totalServicios.toLocaleString()}`;
    }

    db.collection("habitaciones").orderBy("nombre").onSnapshot((snapshot) => {
        listaHabitaciones.innerHTML = '';
        snapshot.forEach((doc) => {
            const data = doc.data();
            const div = document.createElement('div');
            div.className = 'fila-admin fila-habitacion';
            div.dataset.id = doc.id;
            const color = data.ocupada ? '#27ae60' : '#e74c3c';
            div.innerHTML = `
                <span>${data.nombre}</span>
                <input type="number" class="renta" value="${data.renta}">
                <button class="toggle" style="background-color: ${color}">${data.ocupada ? 'Si' : 'No'}</button>
                <input type="number" class="limpieza" value="${data.limpieza !== undefined ? data.limpieza : 200}">
                <span class="resultado">$0</span>
                <button class="btn-eliminar">🗑️</button>
            `;
            listaHabitaciones.appendChild(div);
        });
        calcularDashboard();
    });

    db.collection("servicios").onSnapshot(snapshot => {
        listaServicios.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const div = document.createElement('div');
            div.className = 'fila-servicio';
            div.dataset.id = doc.id;
            const color = data.activo ? '#27ae60' : '#e74c3c';
            div.innerHTML = `
                <span>${data.nombre}</span>
                <input type="number" class="costo" value="${data.costo}">
                <button class="toggle-servicio" style="background-color: ${color}">${data.activo ? 'Si' : 'No'}</button>
                <span class="total-fila">$0</span>
                <button class="btn-eliminar-servicio">🗑️</button>
            `;
            listaServicios.appendChild(div);
        });
        calcularServicios();
        calcularDashboard();
    });

    actualizarGraficoHistorico();

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('toggle')) {
            const id = e.target.parentElement.dataset.id;
            const estaOcupada = e.target.innerText === "Si";
            db.collection("habitaciones").doc(id).update({ ocupada: !estaOcupada });
        }
        if (e.target.classList.contains('btn-eliminar')) {
            db.collection("habitaciones").doc(e.target.parentElement.dataset.id).delete();
        }
        if (e.target.classList.contains('toggle-servicio')) {
            const id = e.target.parentElement.dataset.id;
            const activo = e.target.innerText === "Si";
            db.collection("servicios").doc(id).update({ activo: !activo });
        }
        if (e.target.classList.contains('btn-eliminar-servicio')) {
            db.collection("servicios").doc(e.target.parentElement.dataset.id).delete();
        }
    });

    document.addEventListener('input', (e) => {
        if(e.target.id === 'porcentaje-ret' || e.target.id === 'porcentaje-ini' || e.target.classList.contains('input-porcentaje')) {
            calcularDashboard();
        }
    });

    btnNuevo.addEventListener('click', () => {
        const nombre = prompt("Nombre de la nueva habitación:");
        if (nombre) db.collection("habitaciones").add({ nombre, renta: 0, limpieza: 200, ocupada: false });
    });

    btnNuevoServicio.addEventListener('click', () => {
        const nombre = prompt("Nombre del nuevo servicio:");
        if (nombre) db.collection("servicios").add({ nombre, costo: 0, activo: false });
    });

    document.addEventListener('blur', (e) => {
        const target = e.target;
        const parent = target.parentElement;
        if (!parent || !parent.dataset.id) return;
        
        const id = parent.dataset.id;
        if (target.classList.contains('renta')) db.collection("habitaciones").doc(id).update({ renta: parseFloat(target.value) });
        if (target.classList.contains('limpieza')) db.collection("habitaciones").doc(id).update({ limpieza: parseFloat(target.value) });
        if (target.classList.contains('costo')) db.collection("servicios").doc(id).update({ costo: parseFloat(target.value) });
    }, true);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.target.classList.contains('renta') || e.target.classList.contains('limpieza') || e.target.classList.contains('costo'))) {
            e.target.blur();
        }
    });
});