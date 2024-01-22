import { useEffect, useState } from 'react'
import { useRequest } from '../../hooks/useRequest'

export default function Home() {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImV4cCI6MTcwNjA3MjQzM30._6x-UILvBTfDx0N-V-u0Ai4c8s36QhsM_OaYkkJynrs'

    const { handleFetch, handleSubmit, isLoading, log, isSuccess, isError } = useRequest()

    const [name, setName] = useState('')
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')

    const [services, setServices] = useState([])
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        handleFetch(`/service/filter?customer_name=${name}&skip=0&limit=10`, token, (data) => {
            setServices(data)
        })
    }, [name])

    useEffect(() => {
        handleFetch(`/admin/doctors/active`, null, (data) => {
            setDoctors(data)
        })
    }, [])

    console.log('s', services)
    console.log('d', doctors)

    // post
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
            <h1>Home</h1>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 200, height: 350 }}>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Search name..."
                    />
                    <br />
                    {isLoading === false ? (
                        <>
                            <h2>Data: {services && services[0]?.results}</h2>
                            {services[1] && services[1]?.map((d, i) => <p key={i}>{d?.ServiceOrder?.service_name}</p>)}
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}

                    <br />
                    <br />
                </div>

                <div>
                    {isLoading === false ? (
                        <>
                            <h2>Doctor: {doctors && doctors[0]?.results}</h2>
                            {doctors[1] && doctors[1]?.map((d, i) => <p key={i}>{d?.User?.name}</p>)}
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}

                    <br />
                    <br />
                </div>
            </div>

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
