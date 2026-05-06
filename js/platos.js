const contenedor = document.getElementById("contenedor");
const cargando = document.getElementById("cargando");

fetch("https://api-colombia.com/api/v1/TypicalDish")
    .then(res => res.json())
    .then(data => {

        cargando.style.display = "none";

        data.slice(0, 20).forEach(plato => {
            const div = document.createElement("div");
            div.classList.add("card");

            const imagen = plato.image || "https://via.placeholder.com/150";

            div.innerHTML = `
                <h3>${plato.name}</h3>
                <img src="${imagen}" alt="${plato.name}">
                <p>${plato.description}</p>
            `;

            contenedor.appendChild(div);
        });

    })
    .catch(error => {
        cargando.textContent = "Error al cargar los datos";
        console.error(error);
    });