import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export async function registerInformer(username, email, password, contact) {
    const response = await api.post("/auth/register-informer", {
        username, email, password, contact
    })
    return response.data
}

export async function loginInformer(email, password) {
    const response = await api.post("/auth/login-informer", { email, password })
    return response.data
}

export async function getInformerDetails() {
    const response = await api.get("/auth/getme-informer")
    return response.data
}

export async function createReport(formData) {
    const response = await api.post("/report", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
}

export async function getMyReports() {
    const response = await api.get("/report/allreport")
    return response.data
}

export async function logoutInformer() {
    const response = await api.post("/auth/logout-informer")
    return response.data
}