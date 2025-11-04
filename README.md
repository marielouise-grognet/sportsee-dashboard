# SportSee – Profil Utilisateur

## Description du projet
Ce projet est la nouvelle version de la **page profil utilisateur** de SportSee, une startup dédiée au coaching sportif.  
L’objectif est de permettre à l’utilisateur de suivre son activité physique à travers plusieurs indicateurs :  
- nombre de sessions réalisées,  
- calories brûlées,  
- objectifs atteints,  
- progression quotidienne, etc.

Cette page est développée avec **React** et affiche les données issues d’une **API Node.js**.

---

## Objectifs
- Développer une interface React pour la page profil utilisateur.  
- Intégrer des **graphiques interactifs** avec **Recharts**.  
- Créer un **service dédié aux appels API** (en dehors des composants).  
- Gérer un **mock de données** avant l’intégration du backend.  
- Adapter les données pour standardiser les formats JSON renvoyés par l’API.  
- Se concentrer sur une **version desktop (≥ 1024x780 px)**.

---

## Technologies utilisées
- **React**
- **Recharts**
- **Fetch API** pour les requêtes HTTP
- **SCSS**
- **ESLint** / **Prettier** pour le linting et la mise en forme
- **Node.js API** (backend fourni)

---

## Installation et lancement

### 1. Cloner le dépôt
```bash
git clone https://github.com/<ton-repo>/sportsee.git
cd sportsee
```

### 2. Installer les dépendances
```bash
npm install
```
L'application est alors accessible à l'adresse : http://localhost:3000

### 3. Lancement
Aller dans Back, puis dans Front et lancer 
```bash
npm run dev
```

### Structure du projet
```bash
src/
│
├── components/       # Composants réutilisables (Header, Charts, etc.)
├── pages/            # Pages principales (Profile)
├── services/         # Appels API (Fetch)
├── mocks/            # Données mockées
├── utils/            # Fonctions de formatage / adaptateurs de données
├── styles/           # Feuilles de style globales
└── App.js            # Point d’entrée principal
```
