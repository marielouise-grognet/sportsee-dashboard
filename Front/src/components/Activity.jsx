import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

import { USER_ACTIVITY } from '../../../Back/app/data.js';

// Tooltip personnalisé
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const kilogram = payload.find(p => p.dataKey === 'kilogram')?.value;
        const calories = payload.find(p => p.dataKey === 'calories')?.value;

        return (
            <div style={{
                backgroundColor: '#fff',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc'
            }}>
                <p>{`${kilogram}kg`}</p>
                <p>{`${calories}kCal`}</p>
            </div>
        );
    }
    return null;
};

function ActivityWeightChart({ userId }) {
    // Trouve l’utilisateur
    const user = USER_ACTIVITY.find(u => u.userId === userId);

    if (!user) {
        return <p>Aucune donnée trouvée pour l’utilisateur {userId}</p>;
    }

    // Prépare les données
    const data = user.sessions.map((session, index) => ({
        name: `J${index + 1}`,
        kilogram: session.kilogram,
        calories: session.calories
    }));

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
            <h3 style={{ textAlign: 'center' }}>Activité quotidienne</h3>

            <BarChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                {/* Axe gauche : kilogram */}
                <YAxis yAxisId="left" label={{ value: 'kg', angle: -90, position: 'insideLeft' }} />
                {/* Axe droit : calories */}
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} />
                <Bar
                    yAxisId="left"
                    dataKey="kilogram"
                    name="Poids (kg)"
                    fill="#282D30"
                    barSize={7}
                    radius={[3, 3, 0, 0]}
                />
                <Bar
                    yAxisId="right"
                    dataKey="calories"
                    name="Calories (kCal)"
                    fill="#E60000"
                    barSize={7}
                    radius={[3, 3, 0, 0]}
                />
            </BarChart>
        </div>
    );
}

export default ActivityWeightChart;
