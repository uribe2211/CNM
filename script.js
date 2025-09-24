// Funcionalidades del Portafolio Profesional

document.addEventListener("DOMContentLoaded", function () {
  // Menú móvil
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");

      // Animación del hamburger
      const spans = hamburger.querySelectorAll("span");
      if (hamburger.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");

        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      });
    });
  }

  // Smooth scrolling para enlaces de navegación
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.background = "var(--bg-color)";
      header.style.backdropFilter = "none";
    }

    lastScrollTop = scrollTop;
  });

  // Formulario de contacto
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Obtener datos del formulario
      const formData = new FormData(contactForm);
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const asunto = document.getElementById("asunto").value;
      const mensaje = document.getElementById("mensaje").value;

      // Validación básica
      if (!nombre || !email || !asunto || !mensaje) {
        showNotification("Por favor, complete todos los campos.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Por favor, ingrese un email válido.", "error");
        return;
      }

      // Simular envío del formulario
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.textContent = "Enviando...";
      submitButton.disabled = true;

      setTimeout(() => {
        showNotification(
          "¡Mensaje enviado exitosamente! Me pondré en contacto contigo pronto.",
          "success"
        );
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2000);
    });
  }

  // Validación de email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Notificaciones
  function showNotification(message, type = "info") {
    // Remover notificaciones existentes
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => notification.remove());

    // Crear nueva notificación
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    // Agregar estilos
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${
              type === "success"
                ? "#10b981"
                : type === "error"
                ? "#ef4444"
                : "#3b82f6"
            };
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

    const notificationContent = notification.querySelector(
      ".notification-content"
    );
    notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;

    const notificationClose = notification.querySelector(".notification-close");
    notificationClose.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Cerrar notificación
    const closeNotification = () => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    };

    notificationClose.addEventListener("click", closeNotification);

    // Auto-cerrar después de 5 segundos
    setTimeout(closeNotification, 5000);
  }

  // Animaciones al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar elementos para animación
  const animateElements = document.querySelectorAll(
    ".experience-card, .education-item, .course-item, .contact-item"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Contador de años de experiencia
  function updateExperienceCounter() {
    const currentYear = new Date().getFullYear();
    const startYear = 1997; // Primer año de experiencia laboral
    const yearsOfExperience = currentYear - startYear;

    const experienceElements = document.querySelectorAll(".years-experience");
    experienceElements.forEach((el) => {
      el.textContent = yearsOfExperience;
    });
  }

  // Llamar a la función del contador
  updateExperienceCounter();

  // Actualizar el año en el footer
  const currentYear = new Date().getFullYear();
  const footerYear = document.querySelector(".footer-bottom p");
  if (footerYear) {
    footerYear.textContent = footerYear.textContent.replace(
      "2024",
      currentYear
    );
  }

  // Efecto de typing en el hero title (opcional)
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";
    element.style.borderRight = "2px solid var(--primary-color)";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        setTimeout(() => {
          element.style.borderRight = "none";
        }, 1000);
      }
    }

    type();
  }

  // Aplicar efecto de typing al título (comentado por defecto)
  // const heroTitle = document.querySelector('.hero-title');
  // if (heroTitle) {
  //     const titleText = heroTitle.textContent;
  //     typeWriter(heroTitle, titleText);
  // }

  // Parallax effect para el hero (opcional)
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    const heroImage = document.querySelector(".hero-image");

    if (hero && heroImage) {
      const rate = scrolled * -0.5;
      heroImage.style.transform = `translateY(${rate}px)`;
    }
  });

  // Validación en tiempo real del formulario
  const formInputs = document.querySelectorAll(
    "#contactForm input, #contactForm textarea"
  );
  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "#ef4444";
      } else if (
        this.type === "email" &&
        this.value &&
        !isValidEmail(this.value)
      ) {
        this.style.borderColor = "#ef4444";
      } else {
        this.style.borderColor = "";
      }
    });

    input.addEventListener("focus", function () {
      this.style.borderColor = "var(--primary-color)";
    });
  });

  console.log("Portafolio Profesional cargado exitosamente! 🚀");
});
