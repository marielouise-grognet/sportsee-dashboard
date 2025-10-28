import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import { USER_ACTIVITY } from '../../../Back/app/data.js';

// Tooltip personnalisé
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const kilogram = payload.find(p => p.dataKey === 'kilogram')?.value;
        const calories = payload.find(p => p.dataKey === 'calories')?.value;

        return (
            <div style={{
                backgroundColor:'#E60000',
                padding: '10px',
                border: '1px solid #ccc',
                color : '#FFFFFF'
            }}>
                <p>{`${kilogram}kg`}</p>
                <p>{`${calories}kCal`}</p>
            </div>
        );
    }
    return null;
};

function ActivityWeightChart({ userId }) {
    const user = USER_ACTIVITY.find(u => u.userId === userId);

    if (!user) {
        return <p>Aucune donnée trouvée pour l’utilisateur {userId}</p>;
    }

    const data = user.sessions.map((session, index) => ({
        name: `${index + 1}`,
        kilogram: session.kilogram,
        calories: session.calories
    }));

    // Calculer min et max avec marge pour que les ticks soient visibles
    const allValues = data.flatMap(d => [d.kilogram, d.calories]);
    const minValue = Math.floor(Math.min(...allValues) / 10) * 10 - 10;
    const maxValue = Math.ceil(Math.max(...allValues) / 10) * 10 + 10;

    // Générer 6 graduations uniformes
    const tickStep = (maxValue - minValue) / 5;
    const ticks = Array.from({ length: 6 }, (_, i) => minValue + i * tickStep);

    return (
        <div className="daily-graph" >
            <h3 style={{ textAlign: 'center' }}>Activité quotidienne</h3>

            <BarChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                {/* YAxis unique à droite avec ticks forcés */}
                <YAxis
                    yAxisId="default"
                    orientation="right"
                    type="number"
                    ticks={ticks}
                />

                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} />

                <Bar
                    yAxisId="default"
                    dataKey="kilogram"
                    name="Poids (kg)"
                    fill="#282D30"
                    barSize={7}
                    radius={[3, 3, 0, 0]}
                />
                <Bar
                    yAxisId="default"
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
