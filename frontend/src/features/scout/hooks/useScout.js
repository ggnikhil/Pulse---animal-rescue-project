import { useContext } from "react"
import { ScoutContext } from "../scout.context"
import { registerScout, loginScout, getScoutDetails, getAllReports, acceptReport, logoutScout } from "../services/scout.api"

export const useScout = () => {
    const DataContext = useContext(ScoutContext)
    const { scout, setScout, loading, setLoading, reportsLoading, setReportsLoading, reports, setReports, activeReport, setActiveReport } = DataContext

    const handleRegisterScout = async (username, email, password, contact, ngo_name, ngo_address, ngo_lat, ngo_lon) => {
        setLoading(true)
        try {
            const response = await registerScout(username, email, password, contact, ngo_name, ngo_address, ngo_lat, ngo_lon)
            setScout(response.user)
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleLoginScout = async (email, password) => {
        setLoading(true)
        try {
            const response = await loginScout(email, password)
            setScout(response.user)
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleGetScoutDetails = async () => {
        setLoading(true)
        try {
            const response = await getScoutDetails()
            setScout(response.details)
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleGetAllReports = async () => {
        setReportsLoading(true)
        try {
            const response = await getAllReports()
            setReports(response.reports)
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            setReportsLoading(false)
        }
    }

    const handleAcceptReport = async (report) => {
        setLoading(true)
        try {
            await acceptReport(report._id)
            setActiveReport(report)
            setReports(prev => prev.filter(r => r._id !== report._id))
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleLogoutScout = async () => {
        try {
            await logoutScout()
            setScout(null)
            setReports([])
            setActiveReport(null)
        } catch (err) {
            console.log(err)
        }
    }

    return { scout, loading, reports, reportsLoading, activeReport, setActiveReport, handleRegisterScout, handleLoginScout, handleGetScoutDetails, handleGetAllReports, handleAcceptReport, handleLogoutScout }
}