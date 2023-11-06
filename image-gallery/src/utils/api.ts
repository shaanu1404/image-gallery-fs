import { useEffect, useState, useRef } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:8000/api'
})

export function useAxios<T extends any>(config: AxiosRequestConfig<any>) {
    const [response, setResponse] = useState<AxiosResponse<T, any> | null>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const isMountedRef = useRef<boolean>(false)

    useEffect(() => {
        if (!isMountedRef.current) {
            callApi()
            isMountedRef.current = true
        }
    }, [])

    async function callApi() {
        setLoading(true)
        try {
            const res = await Api<T>(config)
            setResponse(res)
            setError('')
        } catch (error: any) {
            setResponse(null)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    function refetch() {
        return callApi()
    }

    return { data: response?.data, loading, error, response, refetch }
}

export default Api