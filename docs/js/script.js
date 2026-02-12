document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Message sent! I'll get back to you soon.");
});

// Check if elements are in the viewport
function checkVisibility() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
        }
    });
}

// Add event listener for scroll
window.addEventListener('scroll', checkVisibility);

// Initial check
checkVisibility();

document.querySelectorAll(".project-media").forEach(item => {
    item.addEventListener("click", function() {
        window.open(this.src, "_blank");
    });
});