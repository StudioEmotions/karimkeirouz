// Function to load external HTML files
/*function loadComponent(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}

// Load Navbar and Footer
document.addEventListener('DOMContentLoaded', function () {
    loadComponent('header.html', 'header-placeholder');
    loadComponent('navbar.html', 'nav-placeholder');
    loadComponent('footer.html', 'footer-placeholder');
});

// print.js
// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
  // Sélectionner le lien par sa classe
  const printLink = document.querySelector('.print-link');
  
  // Ajouter un écouteur d'événement
  printLink.addEventListener('click', (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du lien
    printPDF('CV KK 03-2025.pdf'); // Appeler la fonction d'impression
  });
});

// Fonction pour imprimer le PDF
function printPDF(pdfPath) {
  const embed = document.createElement('embed');
  embed.src = pdfPath;
  embed.type = 'application/pdf';
  embed.style.width = '0';
  embed.style.height = '0';
  document.body.appendChild(embed);

  embed.onload = () => {
    setTimeout(() => {
      embed.contentWindow.print();
    }, 500);
  };
}
*/
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
    // Solution alternative plus fiable
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

// Au chargement du DOM
document.addEventListener('DOMContentLoaded', async function() {
    // Chargement des composants
    await Promise.all([
        loadComponent('header.html', 'header-placeholder'),
        loadComponent('navbar.html', 'nav-placeholder'),
        loadComponent('footer.html', 'footer-placeholder')
    ]);

    // Gestion du lien d'impression
    const printLink = document.querySelector('.print-link');
    if (printLink) {
        printLink.addEventListener('click', function(e) {
            e.preventDefault();
            printPDF('CV KK 03-2025.pdf');
        });
    }
});