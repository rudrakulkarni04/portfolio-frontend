const professions = ["Data Analyst", "Software Engineer", "Web Developer"];
let index = 0;
let charIndex = 0;
let isDeleting = false;

const professionElement = document.querySelector(".profession");

/* ---------------- TYPE EFFECT ---------------- */
function typeEffect() {
    const currentText = professions[index];

    if (!isDeleting) {
        professionElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        professionElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % professions.length;
        }
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

typeEffect();

/* ---------------- RESUME DOWNLOAD ---------------- */
function downloadResume() {
    window.location.href = "Rudraksh_Kulkarni_Resume.pdf";
}

/* ---------------- ABOUT TOGGLE ---------------- */
function toggleSections() {
    const sections = document.querySelectorAll(".extra-sections .about-text");
    const button = document.querySelector(".btn");

    let isHidden = sections[0].classList.contains("hidden");

    sections.forEach(section => {
        if (isHidden) {
            section.classList.remove("hidden");
        } else {
            section.classList.add("hidden");
        }
    });

    button.textContent = isHidden ? "Show Less" : "Read More";
}

/* ---------------- EMAILJS SETUP ---------------- */
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contact-form");

    if (!form) {
        console.error("❌ Contact form not found");
        return;
    }

    // Initialize EmailJS (ONLY ONCE)
    emailjs.init("ASXiIbF9iSYITJdT8");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const params = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        const button = form.querySelector("button");
        const originalText = button.textContent;

        button.textContent = "Sending...";
        button.disabled = true;

        emailjs.send("service_z2xetuc", "template_be4gy6m", params)
            .then(() => {
                alert("Message sent successfully ✅");
                form.reset();
            })
            .catch((err) => {
                console.error("EmailJS Error:", err);
                alert("Failed to send message ❌");
            })
            .finally(() => {
                button.textContent = originalText;
                button.disabled = false;
            });
    });
});

/* ---------------- READ MORE BUTTONS ---------------- */
document.querySelectorAll(".read-more").forEach(button => {
    button.addEventListener("click", function () {
        let details = this.previousElementSibling;
        details.classList.toggle("expanded");
        this.textContent = details.classList.contains("expanded")
            ? "Read Less"
            : "Read More";
    });
});