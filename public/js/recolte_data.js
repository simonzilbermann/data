// Fonction pour envoyer la requête POST au serveur
async function saveData() {
  try {
    // Envoie la requête POST à /api/v1/recolte-data
    const response = await fetch("/save_data", {
      method: "POST", // Méthode HTTP POST
      headers: {
        "Content-Type": "application/json", // Déclare que le corps est en JSON
      },
      // Le corps de la requête est vide (tu peux envoyer des données si besoin)
      body: JSON.stringify({}),
    });

    if (response.ok) {
      const result = await response.json(); // Récupère la réponse du serveur
      console.log("Réponse du serveur:", result); // Affiche la réponse dans la console
    } else {
      console.error("Erreur côté serveur:", response.status); // Gère l'erreur côté serveur
    }
  } catch (error) {
    console.error("Erreur de requête:", error); // Gère l'erreur de la requête
  }
}

// Appeler la fonction au chargement de la page
window.onload = saveData;
