document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const projects = document.querySelectorAll(".project");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();

        projects.forEach((project) => {
            const name = project.dataset.name?.toLowerCase() || "";
            const description = project.dataset.description?.toLowerCase() || "";
            const id = project.id.toLowerCase();
            const title = project.querySelector("h3")?.textContent.toLowerCase() || "";
            const text = project.querySelector("p")?.textContent.toLowerCase() || "";

            // Verificar si coincide con la búsqueda
            const matches =
                name.includes(query) ||
                description.includes(query) ||
                id.includes(query) ||
                title.includes(query) ||
                text.includes(query);

            if (matches) {
                project.style.display = "flex"; // Mostrar el proyecto
                project.classList.add("aos-animate"); // Forzar animación si es necesario
            } else {
                project.style.display = "none"; // Ocultar el proyecto
            }
        });
    });
});
