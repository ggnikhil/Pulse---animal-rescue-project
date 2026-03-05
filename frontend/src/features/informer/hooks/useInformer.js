import { useContext } from "react"
import { InformerContext } from "../informer.context"
import { registerInformer, loginInformer, getInformerDetails, createReport, getMyReports, logoutInformer } from "../services/informer.api"

export const useInformer = () => {
    const DataContext = useContext(InformerContext)
    const { informer, setInformer, loading, setLoading, reports, setReports, reportsLoading, setReportsLoading } = DataContext

    const handleRegisterInformer = async (username, email, password, contact) => {
        setLoading(true)
        try {
            const response = await registerInformer(username, email, password, contact)
            setInformer(response.user)
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleLoginInformer = async (email, password) => {
        setLoading(true)
        try {
            const response = await loginInformer(email, password)
            setInformer(response.user)
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleGetInformerDetails = async () => {
        setLoading(true)
        try {
            const response = await getInformerDetails()
            setInformer(response.details)
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleCreateReport = async (animal_category, animal_type, injury_type, description, photo, informer_lat, informer_lon) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("animal_category", animal_category)
            formData.append("animal_type", animal_type)
            formData.append("injury_type", injury_type)
            formData.append("description", description)
            formData.append("photo", photo)
            formData.append("informer_lat", informer_lat)
            formData.append("informer_lon", informer_lon)

            const response = await createReport(formData)
            return response
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleGetMyReports = async () => {
        setReportsLoading(true)
        try {
            const response = await getMyReports()
            setReports(response.reports)
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            setReportsLoading(false)
        }
    }

    const handleLogoutInformer = async () => {
        try {
            await logoutInformer()
            setInformer(null)
            setReports([])
        } catch (err) {
            console.log(err)
        }
    }

    return { informer, loading, reports, reportsLoading, handleRegisterInformer, handleLoginInformer, handleGetInformerDetails, handleCreateReport, handleGetMyReports, handleLogoutInformer }
}