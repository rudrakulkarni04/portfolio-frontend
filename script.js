/* ---------------- TYPE EFFECT ---------------- */
const professions = ["Data Analyst", "Software Engineer", "Web Developer"];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const professionElement = document.querySelector(".profession");
    if (!professionElement) return;

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

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

/* ---------------- RESUME DOWNLOAD ---------------- */
function downloadResume() {
    window.location.href = "Rudraksh_Kulkarni_Resume_2026.pdf";
}

/* ---------------- ABOUT TOGGLE ---------------- */
function toggleSections() {
    const sections = document.querySelectorAll(".extra-sections .about-text");
    const button = document.querySelector(".btn");
    const isHidden = sections[0].classList.contains("hidden");

    sections.forEach(section => {
        section.classList.toggle("hidden", !isHidden);
    });

    button.textContent = isHidden ? "Show Less" : "Read More";
}

/* ---------------- DOM READY ---------------- */
document.addEventListener("DOMContentLoaded", function () {

    // Start typing effect
    typeEffect();

    // ---- EmailJS ----
    emailjs.init("ASXiIbF9iSYITJdT8");

    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const params = {
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                subject: document.getElementById("subject").value.trim(),
                message: document.getElementById("message").value.trim()
            };

            const button = form.querySelector("button[type='submit']");
            const originalText = button.textContent;
            button.textContent = "Sending...";
            button.disabled = true;

            emailjs.send("service_z2xetuc", "template_be4gy6m", params)
                .then(() => {
                    alert("Message sent successfully ✅");
                    form.reset();
                })
                .catch((err) => {
                    console.error(err);
                    alert("Failed to send message ❌");
                })
                .finally(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                });
        });
    }

    // ---- Internship Read More buttons ----
    document.querySelectorAll(".read-more").forEach(button => {
        button.addEventListener("click", function () {
            const details = this.previousElementSibling;
            details.classList.toggle("expanded");
            this.textContent = details.classList.contains("expanded") ? "Read Less" : "Read More";
        });
    });

    // ---- Project Card Read More buttons ----
    document.querySelectorAll(".read-more-btn").forEach(button => {
        button.addEventListener("click", function () {
            const card = this.closest(".project-details");
            const shortInfo = card.querySelector(".short-info");
            const moreInfo = card.querySelector(".more-info");
            const isExpanded = moreInfo.classList.contains("expanded");

            if (isExpanded) {
                moreInfo.classList.remove("expanded");
                moreInfo.style.display = "none";
                shortInfo.style.display = "block";
                this.textContent = "Read More";
            } else {
                moreInfo.classList.add("expanded");
                moreInfo.style.display = "block";
                shortInfo.style.display = "none";
                this.textContent = "Read Less";
            }
        });
    });

});