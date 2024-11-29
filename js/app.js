// Theme Switch Toggle
const themeSwitch = document.getElementById("theme-switch");

themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector("header").classList.toggle("dark-mode");
    document.querySelectorAll("section").forEach(section => section.classList.toggle("dark-mode"));
    document.querySelector("footer").classList.toggle("dark-mode");
});
