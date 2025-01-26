
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const toggleIcon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");

        // Change the icon direction based on sidebar state
        if (sidebar.classList.contains("open")) {
            toggleIcon.classList.replace("fa-chevron-right", "fa-chevron-left");
            menuToggle.style.transition = "transform 0.3s ease"; // Add transition for smooth animation
            menuToggle.style.transform = "translateX(225px)"; // Adjust the value as needed
        } else {
            toggleIcon.classList.replace("fa-chevron-left", "fa-chevron-right");
            menuToggle.style.transition = "transform 0.3s ease"; // Add transition for smooth animation
            menuToggle.style.transform = "translateX(0)";
        }
    });
});
