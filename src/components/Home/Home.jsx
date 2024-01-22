import { useEffect, useState } from 'react'
import { useRequest } from '../../hooks/useRequest'

export default function Home() {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImV4cCI6MTcwNjA3MjQzM30._6x-UILvBTfDx0N-V-u0Ai4c8s36QhsM_OaYkkJynrs'

    const { handleFetch, handleSubmit, data, isLoading, log, isSuccess, isError } = useRequest()

    const [name, setName] = useState('')
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        handleFetch(`/service/filter?customer_name=${name}&skip=0&limit=10`, token)
    }, [name])

    const handleLogin = async (e) => {
        e.preventDefault()

        const details = {
            identifier,
            password,
        }

        await handleSubmit(`/login`, details)
    }

    useEffect(() => {
        if (isSuccess || isError) {
            if (isSuccess) {
                console.log(log)
            } else {
                console.log('error:', isError)
            }
        }
    }, [isSuccess, isError, log])

    // }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Home!</h1>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Search name..." />
            <br />
            {isLoading ? (
                'Loading...'
            ) : (
                <>
                    <h2>Data: {data && data[0].results}</h2>
                    {data[1] && data[1]?.map((d, i) => <p key={i}>{d?.ServiceOrder?.service_name}</p>)}
                </>
            )}

            <br />
            <br />

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="enter phone or email"
                />
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="enter password"
                />
                <br />
                <button>Login Button</button>
            </form>
        </div>
    )
}
