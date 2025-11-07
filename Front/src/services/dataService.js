const MODE = "api" // possibilité de changer par "api" pour utiliser les données du Back 

import {
    getUserMainData as apiGetUserMainData,
    getUserActivity as apiGetUserActivity,
    getUserAverageSessions as apiGetUserAverageSessions,
    getUserPerformance as apiGetUserPerformance
} from "./apiService"
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from "../../../Back/app/data"


const getMockedDataByUserId = (mockArray, userId) => {
    return mockArray.find(user => user.userId === userId || user.id === userId)
}

export const getUserMainData = async (userId) => {
    if (MODE === "mock") {
        const data = getMockedDataByUserId(USER_MAIN_DATA, userId)
        return new Promise(resolve => setTimeout(() => resolve(data), 100))     // simule un délai pour imiter fetch
    } else {
        const data = await apiGetUserMainData(userId)
        return data.data || data
    }
}

export const getUserActivity = async (userId) => {
    if (MODE === "mock") {
        const data = getMockedDataByUserId(USER_ACTIVITY, userId)
        return new Promise(resolve => setTimeout(() => resolve(data), 200))
    } else {
        const data = await apiGetUserActivity(userId)
        return data.data || data
    }
}

export const getUserAverageSessions = async (userId) => {
    if (MODE === "mock") {
        const data = getMockedDataByUserId(USER_AVERAGE_SESSIONS, userId)
        return new Promise(resolve => setTimeout(() => resolve(data), 200))
    } else {
        const data = await apiGetUserAverageSessions(userId)
        return data.data || data
    }
}

export const getUserPerformance = async (userId) => {
    if (MODE === "mock") {
        const data = getMockedDataByUserId(USER_PERFORMANCE, userId)
        return new Promise(resolve => setTimeout(() => resolve(data), 200))
    } else {
        const data = await apiGetUserPerformance(userId)
        return data.data || data
    }
}
