const BASE_URL = "http://localhost:3000";

export const getUserMainData = async (userId) => {
    const response = await fetch(`${BASE_URL}/user/${userId}`);
    return response.json();
};

export const getUserActivity = async (userId) => {
    const response = await fetch(`http://localhost:3000/user/${userId}/activity`);
    if (!response.ok) throw new Error("Erreur récupération activité");
    const data = await response.json();
    return data; 
};


export const getUserAverageSessions = async (userId) => {
    const response = await fetch(`${BASE_URL}/user/${userId}/average-sessions`);
    return response.json();
};

export const getUserPerformance = async (userId) => {
    const response = await fetch(`${BASE_URL}/user/${userId}/performance`);
    return response.json();
};
