// Gestionnaire d'évènement lors de la soumission du formulaire
document.getElementById('infoPerso').addEventListener('submit', function(e) {
    e.preventDefault();// On évite de recharger la page

    var nom = document.getElementById('nom');
    var prenom = document.getElementById('prénom');
    var email = document.getElementById('email');
    var telephone = document.getElementById('numéro');
    var champVide = document.getElementById('champVide');

    // Vérification des champs du formulaire
    if (nom.value.trim() === '' || prenom.value.trim() === '' || email.value.trim() === '' || telephone.value.trim() === '') {
        champVide.textContent='Tous les champs doivent être remplis';
        return;
    } 
    champVide.textContent = '';

    // Vérification si le numéro est bien composé de chiffres
    if(isNaN(telephone.value.trim())){
        champVide.textContent="Entrez un numéro valide";
        return;
    }
    champVide.textContent='';


    var formData = new FormData(this); // Création d'un objet FormData pour contenir toutes les infos du formulaire
    var xhr = new XMLHttpRequest(); // Crée un nouvel objet XMLHttpRequest pour envoyer une requête HTTP asynchrone
    xhr.open('POST', 'process.php', true); // Requête HTTP POST vers process.php

    
    xhr.onload = function() {
        // Réponse du serveur (200)
        if (xhr.status === 200) {
            try {
                // Analyse et conversion de la réponse JSON du serveur en un objet JavaScript exploitable
                var response = JSON.parse(xhr.responseText);
                var html = `
                    <h3>Informations reçues :</h3>
                    <p><strong>Nom :</strong> ${response.userData.nom}</p>
                    <p><strong>Prénom :</strong> ${response.userData.prénom}</p>
                    <p><strong>Email :</strong> ${response.userData.email}</p>
                    <p><strong>Téléphone :</strong> ${response.userData.numéro}</p>
                    <img src="${response.qrCodeUrl}" alt="QR Code">
                `;
                document.getElementById('resultat').innerHTML = html;
            } catch (e) {
                alert('Erreur de parsing JSON');
            }
        } else {
            alert('Erreur lors de l\'envoi.');
        }
    };

    // Envoie des données du formulaire à process.php
    xhr.send(formData);
});

