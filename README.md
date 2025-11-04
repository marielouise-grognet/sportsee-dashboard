📋 Sommaire
Contexte
Objectifs du projet
Technologies utilisées
Installation et démarrage
Structure du projet
Appels API et données
Choix techniques et bonnes pratiques
Améliorations futures
Auteur
🎯 Contexte
Ce projet s’inscrit dans le cadre du développement de la nouvelle page profil utilisateur pour SportSee, une application de coaching sportif.
L’objectif est de fournir une interface claire et dynamique affichant les données d’activité de l’utilisateur à partir d’une API Node.js.
🏆 Objectifs du projet
Développer une page React affichant les statistiques de l’utilisateur.
Intégrer des graphiques interactifs (sessions, activité, score, etc.) via Recharts.
Gérer les appels API pour récupérer les données utilisateurs.
Implémenter un mock des données avant la connexion à l’API.
Créer un service dédié aux requêtes HTTP (en dehors des composants).
S’assurer que l’affichage soit lisible sur un écran ≥ 1024x780 px (desktop only).
🧰 Technologies utilisées
⚛️ React (Vite ou Create React App)
📊 Recharts pour la visualisation de données
🌐 Axios ou fetch() pour les appels API
💅 CSS / Sass / Styled Components (selon choix)
🧱 ESLint / Prettier pour le formatage et la qualité du code
🧩 Node.js API (fournie par le lead dev)
🚀 Installation et démarrage
1. Cloner le projet
git clone https://github.com/<ton-repo>/sportsee.git
cd sportsee
2. Installer les dépendances
npm install
3. Lancer le mock (si applicable)
Si un fichier de mock existe (src/mocks/), le projet peut fonctionner sans API.
4. Lancer le projet
npm start
5. (Optionnel) Lancer le backend Node.js
Voir le repo backend fourni par Antoine :
👉 Lien vers le backend SportSee
🧩 Structure du projet
src/
│
├── components/         # Composants réutilisables (Card, Chart, Header, etc.)
├── pages/              # Pages principales (Profile)
├── services/           # Services pour les appels API
├── mocks/              # Données fictives avant connexion API
├── utils/              # Fonctions d’aide (formatage, adaptation des données)
├── styles/             # Fichiers CSS ou SCSS globaux
└── App.js              # Point d’entrée principal
🌐 Appels API et données
Les données proviennent d’une API Node.js.
Les endpoints disponibles sont détaillés dans la documentation backend (cf. mail d’Antoine).
Les appels sont centralisés dans src/services/api.js pour séparer la logique réseau des composants UI.
Exemple :
import axios from "axios";

export async function getUserData(id) {
  const response = await axios.get(`http://localhost:3000/user/${id}`);
  return response.data;
}
Un adaptateur (dans src/utils/formatData.js) permet de normaliser les différences de schéma entre utilisateurs.
🧠 Choix techniques et bonnes pratiques
Utilisation de Recharts (plus simple que D3 pour ce cas d’usage).
Les appels API sont faits en dehors des composants React (principe de séparation des responsabilités).
Architecture modulaire et facile à maintenir.
Projet documenté avec JSDoc (pour les fonctions clés).
