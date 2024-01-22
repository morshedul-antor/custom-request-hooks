import { useState } from 'react'
const api = import.meta.env.VITE_API_URL

export const useRequest = () => {
    // for get method
    const [isLoading, setLoading] = useState(true)

    // for post, patch, put and delete
    const [log, setLog] = useState({})
    const [isError, setError] = useState(false)
    const [isSuccess, setSuccess] = useState(false)

    // handle get request
    const handleFetch = async (endPoint, token, setData) => {
        setLoading(true)

        try {
            const response = await fetch(api + endPoint, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await response.json()

            if (response.ok) {
                setLoading(false)
                setData(data)
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('error:', e)
        }
    }

    // handle post(default), patch and put request
    const handleSubmit = async (endPoint, body, token, method = 'POST') => {
        setError(false)
        setSuccess(false)

        try {
            const response = await fetch(api + endPoint, {
                method: method,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            })
            const log = await response.json()

            if (response.ok) {
                setLog(log)
                setSuccess(true)
            } else {
                setError(log.context)
            }
        } catch (e) {
            setError(e)
        }
    }

    // handle delete request
    const handleDelete = async (endPoint, token) => {
        setError(false)
        setSuccess(false)

        try {
            const response = await fetch(api + endPoint, {
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            const log = await response.json()

            if (response.ok) {
                setSuccess(true)
            } else {
                setError(log.context)
            }
        } catch (e) {
            setError(e)
        }
    }

    return { handleFetch, handleSubmit, handleDelete, log, isLoading, isSuccess, isError }
}
