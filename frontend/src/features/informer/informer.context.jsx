import { createContext, useState } from "react"

export const InformerContext = createContext()

export const InformerProvider = ({ children }) => {
    const [informer, setInformer] = useState(null)
    const [loading, setLoading] = useState(false)
    const [reports, setReports] = useState([])
    const [reportsLoading, setReportsLoading] = useState(true)

    return (
        <InformerContext.Provider value={{ informer, setInformer, loading, setLoading, reports, setReports, reportsLoading, setReportsLoading }}>
            {children}
        </InformerContext.Provider>
    )
}