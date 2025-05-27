<?php

class User{

    // Initialisation des attributs
    private $nom;
    private $prenom;
    private $email;
    private $telephone;

    // Constructeur qui prend en paramètre un tableau de données 
    public function __construct(array $data) {
        // Initialisation des attributs, si une information est manquante, on la remplace par une châine vide
        $this->nom = $data['nom'] ?? '';
        $this->prenom = $data['prénom'] ?? '';
        $this->email = $data['email'] ?? '';
        $this->telephone = $data['numéro'] ?? '';
    }

    // Méthode de generation QR Code à partir des données sous format exploitable (vcard)
    public function generateQrCodeUrl(): string {
        $vcard = "BEGIN:VCARD\n";
        $vcard .= "VERSION:3.0\n";
        $vcard .= "FN:{$this->prenom} {$this->nom}\n";
        $vcard .= "EMAIL:{$this->email}\n";
        $vcard .= "TEL:{$this->telephone}\n";
        $vcard .= "END:VCARD";
        $data = urlencode($vcard);
        return "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={$data}";
    }

    // Méthode d'encodage des données du formulaire en format JSON
    public function getResponse(): string {
        $response = [
            'qrCodeUrl' => $this->generateQrCodeUrl(),
            'userData' => [
                'nom' => htmlspecialchars($this->nom),
                'prénom' => htmlspecialchars($this->prenom),
                'email' => htmlspecialchars($this->email),
                'numéro' => htmlspecialchars($this->telephone),
            ]
        ];

        // Retourne la réponse en encodage JSON
        header('Content-Type: application/json; charset=utf-8');
        return json_encode($response);
    }
}

// Récupération des données envoyées par méthode POST
$data = $_POST;

// Création d'un objet de la classe User
$user = new User($data);

// Envoi de la réponse sur le serveur
echo $user->getResponse();
