export class UserScore {
    constructor(userData) {
        this.userId = userData.id
        this.score = userData.todayScore ?? userData.score ?? 0
    }

    get scorePercentage() {
        return this.score * 100
    }

    get displayText() {
        return `${this.scorePercentage}% de votre objectif`
    }

}
