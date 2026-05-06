const contenedor = document.getElementById("contenedor");
const cargando = document.getElementById("cargando");

cargando.textContent = "Cargando presidentes...";

fetch("https://api-colombia.com/api/v1/President")
    .then(res => res.json())
    .then(data => {

        cargando.style.display = "none";

        data.sort((a, b) => a.startPeriodDate.localeCompare(b.startPeriodDate));

        data.slice(0, 20).forEach(presidente => {

            const card = document.createElement("div");
            card.classList.add("card");

            let imagen = presidente.image;

            if (presidente.name.includes("Carlos Lleras")) {
                imagen = "../img/carloss.webp";
            } else if (presidente.name.includes("Guillermo")) {
                imagen = "../img/guillermo.jpg";
                
            } else if (presidente.name.includes("Jose Vicente") || presidente.name.includes("José Vicente")) {
                imagen = "../img/josevicente.jpg";
            }

            if (!imagen) {
                imagen = "../img/default.jpg";
            }

            card.innerHTML = `
                <h3>${presidente.name}</h3>
                <img src="${imagen}" alt="${presidente.name}">
                <p><strong>Periodo:</strong> ${presidente.startPeriodDate} - ${presidente.endPeriodDate}</p>
                <p><strong>Partido:</strong> ${presidente.politicalParty || "No disponible"}</p>
            `;

            const img = card.querySelector("img");
            img.onerror = function () {
                this.src = "../img/default.jpg";
            };

            contenedor.appendChild(card);
        });

    })
    .catch(error => {
        console.error(error);
        cargando.textContent = "Error al cargar presidentes";
    });