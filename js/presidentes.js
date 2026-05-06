const contenedor = document.getElementById("contenedor");
const cargando = document.getElementById("cargando");

cargando.textContent = "Cargando presidentes...";

fetch("https://api-colombia.com/api/v1/President")
    .then(res => res.json())
    .then(data => {

        cargando.style.display = "none";

        // 🔥 ordenar por año (extra que suma puntos)
        data.sort((a, b) => a.startPeriodDate.localeCompare(b.startPeriodDate));

        data.slice(0, 20).forEach(presidente => {

            const card = document.createElement("div");
            card.classList.add("card");

            const imagen = presidente.image || "img/default.jpg";

            card.innerHTML = `
                <h3>${presidente.name}</h3>
                <img src="${imagen}" alt="${presidente.name}">
                <p><strong>Periodo:</strong> ${presidente.startPeriodDate} - ${presidente.endPeriodDate}</p>
                <p><strong>Partido:</strong> ${presidente.politicalParty || "No disponible"}</p>
            `;

            contenedor.appendChild(card);
        });

    })
    .catch(error => {
        console.error(error);
        cargando.textContent = "❌ Error al cargar presidentes";
    });