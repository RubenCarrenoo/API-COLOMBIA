const contenedor = document.getElementById("contenedor");
const cargando = document.getElementById("cargando");

cargando.textContent = "Cargando presidentes...";

// 🔥 Imágenes específicas para los que fallan
const imagenesExtra = {
    "Carlos Lleras Restrepo": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Carlos_Lleras_Restrepo.jpg",
    "Guillermo León Valencia": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Guillermo_Leon_Valencia.jpg",
    "José Vicente Concha": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Jose_Vicente_Concha.jpg"
};

fetch("https://api-colombia.com/api/v1/President")
    .then(res => res.json())
    .then(data => {

        cargando.style.display = "none";

        data.sort((a, b) => a.startPeriodDate.localeCompare(b.startPeriodDate));

        data.slice(0, 20).forEach(presidente => {

            const card = document.createElement("div");
            card.classList.add("card");

            // 🔥 prioridad: imagen extra → API → default
            let imagen = imagenesExtra[presidente.name] || presidente.image || "img/default.jpg";

            card.innerHTML = `
                <h3>${presidente.name}</h3>
                <img src="${imagen}" alt="${presidente.name}">
                <p><strong>Periodo:</strong> ${presidente.startPeriodDate} - ${presidente.endPeriodDate}</p>
                <p><strong>Partido:</strong> ${presidente.politicalParty || "No disponible"}</p>
            `;

            // 🔥 si igual falla, fallback final
            const img = card.querySelector("img");
            img.onerror = function () {
                this.src = "img/default.jpg";
            };

            contenedor.appendChild(card);
        });

    })
    .catch(error => {
        console.error(error);
        cargando.textContent = "❌ Error al cargar presidentes";
    });