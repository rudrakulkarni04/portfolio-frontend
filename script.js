const professions = ["Data Analyst", "Software Engineer", "Web Developer"];
let index = 0;  
let charIndex = 0;  
let isDeleting = false;  
const professionElement = document.querySelector(".profession");

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




function downloadResume() {
    window.location.href = 'Rudraksh_Kulkarni_Resume.pdf'; 
}



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



document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    emailjs.init("ASXiIbF9iSYITJdT8");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        emailjs.send("service_z2xetuc", "template_be4gy6m", params)
        .then(() => {
            alert("Message sent successfully ✅");
            form.reset();
        })
        .catch((err) => {
            console.error(err);
            alert("Failed to send message ❌");
        });
    });
});


document.querySelectorAll(".read-more").forEach(button => {
    button.addEventListener("click", function () {
        let details = this.previousElementSibling;
        details.classList.toggle("expanded");
        this.textContent = details.classList.contains("expanded") ? "Read Less" : "Read More";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM fully loaded");

    const form = document.getElementById("contact-form");

    if (!form) {
        console.error("❌ Form not found! Check the ID in your HTML.");
        return;
    }

   document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    try {
        const res = await fetch('https://portfolio-backend-kpm6.onrender.com/send-mail',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, subject, message })
        });

        const data = await res.json();

        if (data.success) {
            alert("Message sent successfully!");
            document.getElementById("contact-form").reset();
        } else {
            alert("Failed to send message");
        }
    } catch (error) {
        console.log(error);
        alert("Server not running or error occurred");
    }
});
});