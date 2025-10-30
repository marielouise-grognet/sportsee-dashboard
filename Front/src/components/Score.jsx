import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { USER_MAIN_DATA } from '../../../Back/app/data.js';

function Score({ userId }) {
    const user = USER_MAIN_DATA.find(u => u.id === userId);

    if (!user) {
        return <p>Aucune donnée trouvée pour l’utilisateur {userId}</p>;
    }

    const score = user.todayScore ?? user.score;

    const data = [
        {
            name: 'Score',
            value: score * 100,
            fill: '#FF0000',
        },
    ];


    return (
        <div className='score-graph'>
            <h2
                style={{
                    position: 'absolute',
                    top: 3,
                    left: 30,
                    fontSize: 15,
                    fontWeight: 500,
                    color: '#20253A',
                }}
            >
                Score
            </h2>

            <ResponsiveContainer>
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="70%"
                    barSize={10}
                    data={data}
                    startAngle={90}
                    endAngle={90 + 360 * score}

                >

                    <RadialBar
                        dataKey="value"
                        background
                        clockWise
                        cornerRadius={10}
                    />
                </RadialBarChart>
            </ResponsiveContainer>


            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '50%',
                    width: '115px',
                    height: '115px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <p style={{ fontSize: 22, fontWeight: 'bold', margin: 0 }}>
                    {score * 100}%
                </p>
                <p style={{ fontSize: 12, color: '#74798C', margin: 0, paddingLeft: 20, paddingRight: 20 }}>
                    de votre objectif
                </p>
            </div>
        </div>
    );
}

export default Score;
