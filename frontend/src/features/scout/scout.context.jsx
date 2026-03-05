import { createContext, useState } from "react"

export const ScoutContext = createContext()

export const ScoutProvider = ({ children }) => {
    const [scout, setScout] = useState(null)
    const [loading, setLoading] = useState(false)
    const [reportsLoading, setReportsLoading] = useState(true)
    const [reports, setReports] = useState([])
    const [activeReport, setActiveReport] = useState(() => {
        const saved = localStorage.getItem("activeReport")
        return saved ? JSON.parse(saved) : null
    })

    const setActiveReportWithStorage = (report) => {
        if (report) {
            localStorage.setItem("activeReport", JSON.stringify(report))
        } else {
            localStorage.removeItem("activeReport")
        }
        setActiveReport(report)
    }

    return (
        <ScoutContext.Provider value={{ scout, setScout, loading, setLoading, reportsLoading, setReportsLoading, reports, setReports, activeReport, setActiveReport: setActiveReportWithStorage }}>
            {children}
        </ScoutContext.Provider>
    )
}