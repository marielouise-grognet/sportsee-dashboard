import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from "react"
import { getUserPerformance } from "../services/dataService"

function PerformanceGraph({ userId }) {
    const [userPerformance, setUserPerformance] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const kindLabelsFR = {
        cardio: 'Cardio',
        energy: 'Énergie',
        endurance: 'Endurance',
        strength: 'Force',
        speed: 'Vitesse',
        intensity: 'Intensité'
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserPerformance(userId)
                setUserPerformance(userData)
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
    if (!userPerformance?.data?.length) return <p>Aucune donnée disponible</p>



    const dataForDataKey = userPerformance.data.map(item => ({
        subject: kindLabelsFR[userPerformance.kind[item.kind]],
        value: item.value,
    }))

    const shiftedKeyData = [dataForDataKey[dataForDataKey.length - 1], ...dataForDataKey.slice(0, -1)]



    return (
        <div className="performance-graph">
            <ResponsiveContainer style={{pointerEvents:'none'}}>
                <RadarChart
                    data={shiftedKeyData}
                    outerRadius="70%"
                    margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
                >
                    <PolarGrid radialLines={false} />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#fff', fontSize: 11 }}
                    />
                    <PolarRadiusAxis tick={false} axisLine={false} />
                    <Radar
                        dataKey="value"
                        stroke="#FF0101"
                        fill="#FF0101"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PerformanceGraph
