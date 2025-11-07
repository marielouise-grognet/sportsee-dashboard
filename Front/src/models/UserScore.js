// models/UserScore.js
export class UserScore {
    constructor(userData) {
        this.userId = userData.id
        this.score = userData.todayScore ?? userData.score ?? 0
    }

    // Retourne le score sous forme de pourcentage
    get scorePercentage() {
        return this.score * 100
    }

    // Exemple de méthode pour formater le texte
    get displayText() {
        return `${this.scorePercentage}% de votre objectif`
    }

}
