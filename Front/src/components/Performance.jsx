import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { USER_PERFORMANCE } from '../../../Back/app/data.js';

function Performance({ userId }) {
    // 1️⃣ Trouver l'utilisateur correspondant
    const user = USER_PERFORMANCE.find(u => u.userId === userId);

    if (!user) {
        return <p>Aucune donnée trouvée pour l’utilisateur {userId}</p>;
    }


    const kindLabelsFR = {
        cardio: 'Cardio',
        energy: 'Énergie',
        endurance: 'Endurance',
        strength: 'Force',
        speed: 'Vitesse',
        intensity: 'Intensité'
    };

    // 2️⃣ Reformater les données pour le RadarChart
    const data = user.data.map(item => ({
        subject: kindLabelsFR[user.kind[item.kind]], // ex: "cardio"
        value: item.value,              // ex: 80
    }));

    const shiftedData = [data[data.length - 1], ...data.slice(0, -1)];


    // 3️⃣ Composant du graphique
    return (
        <div className="performance-graph">
            <ResponsiveContainer>
                <RadarChart
                    data={shiftedData}
                    outerRadius="70%"
                    margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
                >
                    <PolarGrid radialLines={false} /> {/* grille circulaire sans lignes radiales */}
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#fff', fontSize: 11 }}
                    />
                    <PolarRadiusAxis tick={false} axisLine={false} /> {/* pas de ticks */}
                    <Radar
                        dataKey="value"
                        stroke="#FF0101"
                        fill="#FF0101"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Performance;
