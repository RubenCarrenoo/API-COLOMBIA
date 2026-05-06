const contenedor = document.getElementById("contenedor");
const cargando = document.getElementById("cargando");

fetch("https://api-colombia.com/api/v1/Department")
    .then(res => res.json())
    .then(data => {

        cargando.style.display = "none";

        data.slice(0, 20).forEach(dep => {
            const div = document.createElement("div");
            div.classList.add("card");

            div.innerHTML = `
                <h3>${dep.name}</h3>
                <p><strong>Región:</strong> ${dep.region}</p>
                <p><strong>Población:</strong> ${dep.population}</p>
                <p><strong>Superficie:</strong> ${dep.area} km²</p>
                <p>${dep.description || "Sin descripción"}</p>
            `;

            contenedor.appendChild(div);
        });

    })
    .catch(error => {
        cargando.textContent = "Error al cargar los datos";
        console.error(error);
    });