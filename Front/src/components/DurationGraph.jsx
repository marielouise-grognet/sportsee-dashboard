import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from "react"
import { getUserAverageSessions } from "../services/dataService"


const CustomCursor = (props) => {
    const { points, width, height } = props
    const x = points?.[0]?.x || 0
    return (
        <rect
            x={x}
            y={0}
            width={width}
            height={height + 60}
            fill="rgba(0, 0, 0, 0.1)"
        />
    )
}

function DurationGraph({ userId }) {
    const [userDuration, setUserDuration] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const jours = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserAverageSessions(userId)
                setUserDuration(userData)
            } catch (err) {
                console.error(err)
                setError("Impossible de récupérer les données")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [userId])

    if (loading) return <p>Chargement...</p>
    if (error) return <p>{error}</p>
    if (!userDuration?.sessions?.length) return <p>Aucune donnée disponible</p>

    const dataForDataKey = userDuration.sessions.map((session, index) => ({
        name: jours[index],
        duration: session.sessionLength
    }))

    return (
        <div className="duration-graph"
            onMouseDown={(e) => e.preventDefault()}
            style={{
                position: 'relative',
                backgroundColor: '#FF0000',
                borderRadius: '10px',
                overflow: 'hidden',

            }}>
            <h2 style={{
                position: 'absolute',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 500,
                marginLeft: 40,
                opacity: 0.6
            }}>
                Durée moyenne des sessions
            </h2>

            <ResponsiveContainer>
                <AreaChart
                    data={dataForDataKey}
                    margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.2} />
                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={1} />
                        </linearGradient>

                        <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FF0000" stopOpacity={0.2} />
                            <stop offset="100%" stopColor="#FF0000" stopOpacity={0.8} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="name"
                        stroke="none"
                        tick={{ fill: '#FFFFFF', fontSize: 10 }}
                        interval={0}
                        width="258"
                        padding={{ left: 10, right: 10 }}
                    />
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div
                                        style={{
                                            backgroundColor: '#fff',
                                            color: '#000',
                                            fontSize: 10,
                                            padding: '4px 8px',
                                            boxShadow: '0 0 4px rgba(0,0,0,0.2)',
                                        }}
                                    >
                                        <p>{`${payload[0].value} min`}</p>
                                    </div>
                                )
                            }
                            return null
                        }}
                        cursor={<CustomCursor />}
                    />
                    <Area
                        type="monotone"
                        dataKey="duration"
                        stroke="url(#lineGradient)"
                        strokeWidth={3}
                        fill="url(#fillGradient)"
                        activeDot={{ r: 4 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
            
        </div>
    )
}

export default DurationGraph
