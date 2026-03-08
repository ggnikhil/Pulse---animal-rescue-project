import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

// Auth
export async function registerScout(username, email, password, contact, ngo_name, ngo_address, ngo_lat, ngo_lon) {
    const response = await api.post("/auth/register-scout", {
        username, email, password, contact, ngo_name, ngo_address, ngo_lat, ngo_lon, role: "scout"
    })
    return response.data
}

export async function loginScout(email, password) {
    const response = await api.post("/auth/login-scout", { email, password })
    return response.data
}

export async function getScoutDetails() {
    const response = await api.get("/auth/getme-scout")
    return response.data
}

// Reports
export async function getAllReports() {
    const response = await api.get("/report/allreport")
    return response.data
}

export async function acceptReport(id) {
    const response = await api.put(`/report/accept/${id}`)
    return response.data
}

export async function resolveReport(id) {
    const response = await api.put(`/report/resolve/${id}`)
    return response.data
}

export async function logoutScout() {
    const response = await api.post("/auth/logout-scout")
    return response.data
}