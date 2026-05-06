const contenedor = document.getElementById("contenedor");
const cargando = document.getElementById("cargando");

cargando.textContent = "Cargando platos típicos...";

// 🔥 Relación EXACTA con tus archivos
const imagenesPlatos = {
    "Bandeja Paisa": "img/bandeja paisa.webp",
    "Sancocho Antioqueño": "img/sancocho antioqueño.jpg",
    "Ajiaco Santafereño": "img/Ajiaco Santafereño.webp",
    "Sancocho de Gallina": "img/sancocho antioqueño.jpg",
    "Lechona Tolimense": "img/Lechona Tolimense.webp",
    "Arepas de Huevo": "img/Arepas de Huevo.jpg",
    "Mazamorra Chiquita": "img/Mazamorra Chiquita.webp",
    "Sobrebarriga al Horno": "img/Sobrebarriga al Horno.webp",
    "Arroz Atollado": "img/Arroz Atollado.webp",
    "Tamal Tolimense": "img/Tamal Tolimense.jpg",
    "Arroz con Coco": "img/Arroz con Coco.webp",
    "Cabrito Asado": "img/Cabrito Asado.webp",
    "Pepitoria": "img/Pepitoria.webp",
    "Cuy Asado": "img/Cuy Asado.webp",
    "Empanadas de Pipián": "img/Empanadas de Pipián.jpg",
    "Arroz de Lisa": "img/Arroz de Lisa.jpg",
    "Butifarra Soledeña": "img/Butifarra Soledeña.jpg",
    "Asado Huilense": "img/Asado Huilense.webp",
    "Champús": "img/Champús.webp",
    "Sopa de Carantanta": "img/Sopa de Carantanta.jpg"
};

fetch("https://api-colombia.com/api/v1/TypicalDish")
    .then(res => res.json())
    .then(data => {

        cargando.style.display = "none";

        data.slice(0, 20).forEach(plato => {

            const card = document.createElement("div");
            card.classList.add("card");

            // 🔥 imagen correcta o fallback
            const imagen = imagenesPlatos[plato.name] || "img/default.jpg";

            card.innerHTML = `
                <h3>${plato.name}</h3>
                <img src="${imagen}" alt="${plato.name}">
                <p>${plato.description || "Sin descripción disponible."}</p>
            `;

            contenedor.appendChild(card);
        });

    })
    .catch(error => {
        console.error(error);
        cargando.textContent = "❌ Error al cargar datos";
    });