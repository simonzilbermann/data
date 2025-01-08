// Fonction pour récupérer toutes les données depuis le serveur
async function getAllData() {
  try {
    // Envoie une requête GET à l'API
    const response = await fetch("/Get_all", {
      method: "GET", // Méthode GET
      headers: {
        "Content-Type": "application/json", // Facultatif pour GET
      },
    });

    // Vérifie si la réponse est OK
    if (response.ok) {
      const result = await response.json(); // Convertit la réponse en JSON
      console.log("Données reçues :", result.msg); // Affiche les données dans la console
    } else {
      console.error("Erreur serveur :", response.status);
    }
  } catch (error) {
    console.error("Erreur de connexion :", error); // Gère les erreurs réseau
  }
}

// Appel de la fonction au chargement de la page
window.onload = getAllData;
