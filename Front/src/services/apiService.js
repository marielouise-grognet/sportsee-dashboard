const BASE_URL = "http://localhost:3000"

export const getUserMainData = async (userId) => {
    const response = await fetch(`${BASE_URL}/user/${userId}`)
    return response.json()
};

export const getUserActivity = async (userId) => {
    const response = await fetch(`${BASE_URL}/user/${userId}/activity`)
    return response.json()
};


export const getUserAverageSessions = async (userId) => {
    const response = await fetch(`${BASE_URL}/user/${userId}/average-sessions`)
    return response.json()
};

export const getUserPerformance = async (userId) => {
    const response = await fetch(`${BASE_URL}/user/${userId}/performance`)
    return response.json()
};
