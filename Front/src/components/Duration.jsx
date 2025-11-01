import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from "react"
import { getUserAverageSessions } from "../services/apiService"

function Duration({ userId }) {
    const [userDuration, setUserDuration] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const jours = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

          useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getUserAverageSessions(userId)
            setUserDuration(data.data)
          } catch (err) {
            console.error(err)
            setError("Impossible de récupérer les données")
          } finally {
            setLoading(false)
          }
        };
        fetchData()
      }, [userId])
    
      if (loading) return <p>Chargement...</p>
      if (error) return <p>{error}</p>
      if (!userDuration?.sessions?.length) return <p>Aucune donnée disponible</p>


    const data = userDuration.sessions.map((session, index) => ({
        name: jours[index],
        duration: session.sessionLength
    }))



    return (
        <div className="duration-graph">
            <h2 style={{position:'absolute', color: '#FFFFFF', fontSize : 13, fontWeight:500, marginLeft :40, opacity:0.6 }}>Durée moyenne des sessions</h2>


            <ResponsiveContainer>
                <AreaChart
                    data={data}
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

                    <Tooltip />
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

export default Duration
