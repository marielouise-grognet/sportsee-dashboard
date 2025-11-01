import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts"
import { getUserActivity } from "../services/apiService"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const kilogram = payload.find((p) => p.dataKey === "kilogram")?.value
    const calories = payload.find((p) => p.dataKey === "calories")?.value

    return (
      <div
        style={{
          backgroundColor: "#E60000",
          padding: "8px",
          border: "none",
          color: "#FFFFFF",
          fontSize: "0.75rem",
          lineHeight: "1.2rem",
          textAlign: "center",
        }}
      >
        <p>{`${kilogram}kg`}</p>
        <p>{`${calories}kCal`}</p>
      </div>
    )
  }
  return null
}

function ActivityBarChart({ userId }) {
  const [userActivity, setUserActivity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserActivity(userId)
        setUserActivity(data.data)
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
  if (!userActivity?.sessions?.length) return <p>Aucune donnée disponible</p>

  const data = userActivity.sessions.map((s, i) => ({
    day: `${i + 1}`,
    kilogram: s.kilogram,
    calories: s.calories,
  }))

  return (
    <div className="daily-graph" style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          padding: "0 30px",
        }}
      >
        <h3 style={{ textAlign: "left", fontSize: 15, fontWeight: 500, margin: 0 }}>
          Activité quotidienne
        </h3>
        <ul
          style={{
            display: "flex",
            gap: "20px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            fontSize: 12,
            color: "#74798C",
          }}
        >
          <li style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg height={8} width={8}>
              <circle cx="4" cy="4" r="4" fill="#282D30"></circle>
            </svg>
            Poids (kg)
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg height={8} width={8}>
              <circle cx="4" cy="4" r="4" fill="#E60000"></circle>
            </svg>
            Calories brûlées (kCal)
          </li>
        </ul>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          barSize={8}
          barGap={8}
          barCategoryGap="30%"
          margin={{ top: 10, right: 20, left: 20, bottom: 16 }}
        >
          <defs>
            <clipPath id="clip-grid">
              <rect x="30" y="0" width="90%" height="100%" />
            </clipPath>
          </defs>

          <CartesianGrid
            horizontal={true}
            vertical={false}
            stroke="#DEDEDE"
            strokeDasharray="2 2"
            strokeWidth="1px"
            syncWithTicks={true}
            clipPath="url(#clip-grid)"
          />

          <XAxis dataKey="day" tickLine={false} stroke="#9B9EAC" tickMargin={16} />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#9B9EAC"
            dataKey="kilogram"
            domain={["dataMin - 2", "dataMax + 2"]}
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tickMargin={24}
          />
          <Tooltip cursor={{ fill: "rgba(196, 196, 196, 0.5)" }} content={<CustomTooltip />} />

          <Bar yAxisId="right" dataKey="kilogram" name="Poids (kg)" fill="#282D30" radius={[3, 3, 0, 0]} />
          <Bar dataKey="calories" name="Calories brûlées (kCal)" fill="#E60000" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ActivityBarChart
