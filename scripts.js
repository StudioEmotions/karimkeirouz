// Fonction pour charger les composants
async function loadComponent(url, elementId) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        document.getElementById(elementId).innerHTML = data;
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Fonction d'impression améliorée
function printPDF(pdfPath) {
    const newWindow = window.open(pdfPath, '_blank');
    
    if (newWindow) {
        newWindow.onload = function() {
            setTimeout(() => {
                try {
                    newWindow.print();
                } catch (e) {
                    console.error("Print failed:", e);
                    alert("Veuillez autoriser les pop-ups pour l'impression");
                }
            }, 1000);
        };
    } else {
        alert("Veuillez autoriser les pop-ups pour imprimer le PDF");
    }
}

// Fonction pour initialiser le modal
function initModal() {
    const certificatSection = document.querySelector("#certificat");
    
    if (certificatSection) {
        // Créer les éléments du modal
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.style.display = "none"; // Le modal est caché par défaut

        const modalContent = document.createElement("img");
        modalContent.classList.add("modal-content");

        const closeModal = document.createElement("span");
        closeModal.classList.add("close");
        closeModal.innerHTML = "&times;";

        modal.appendChild(closeModal);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Ajouter les événements de clic pour les images de certificat
        const certificatImages = certificatSection.querySelectorAll(".article-image");
        certificatImages.forEach(image => {
            image.addEventListener("click", function() {
                modalContent.src = this.src;
                modal.style.display = "flex"; // Afficher seulement au clic
            });
        });

        // Fermer le modal
        closeModal.addEventListener("click", function() {
            modal.style.display = "none";
        });

        modal.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
}

// Chargement des composants et initialisation
document.addEventListener('DOMContentLoaded', async function() {
    await Promise.all([
        loadComponent('header.html', 'header-placeholder'),
        loadComponent('navbar.html', 'nav-placeholder'),
        loadComponent('footer.html', 'footer-placeholder')
    ]);

    // Gérer le lien d'impression
    const printLink = document.querySelector('.print-link');
    if (printLink) {
        printLink.addEventListener('click', function(e) {
            e.preventDefault();
            printPDF('CV KK 03-2025.pdf');
        });
    }

    // Initialiser le modal après le chargement complet
    initModal();
});