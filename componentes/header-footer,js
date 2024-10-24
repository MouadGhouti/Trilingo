function loadHeader() {
    fetch('../../componentes/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
}

// Function to load the footer
function loadFooter() {
    fetch('../../componentes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Load the header and footer once the page is fully loaded
window.onload = function() {
    loadHeader();
    loadFooter();
};
