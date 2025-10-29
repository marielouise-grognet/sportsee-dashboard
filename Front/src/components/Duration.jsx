import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { USER_AVERAGE_SESSIONS } from '../../../Back/app/data.js';

function Duration({ userId }) {
    const user = USER_AVERAGE_SESSIONS.find(u => u.userId === userId);
    const jours = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    if (!user) {
        return <p>Aucune donnée trouvée pour l’utilisateur {userId}</p>;
    }

    const data = user.sessions.map((session, index) => ({
        name: jours[index],
        duration: session.sessionLength
    }));



    return (
        <div className="duration-graph">
            <p className="session-duration">Durée moyenne des sessions</p>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
                >


                    <defs>
                        {/* Dégradé pour la ligne */}
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.2} /> {/* début transparent */}
                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={1} />   {/* fin opaque */}
                        </linearGradient>

                        {/* Dégradé pour le remplissage sous la ligne (optionnel) */}
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
                        padding={{ left: 10, right: 10 }} // ← ici tu ajoutes du padding
                    />

                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="duration"
                        stroke="url(#lineGradient)"   // applique le dégradé à la ligne
                        strokeWidth={3}               // épaisseur
                        fill="url(#fillGradient)"     // remplissage sous la ligne
                        activeDot={{ r: 4 }}
                    />
                </AreaChart>
            </ResponsiveContainer>


        </div>
    );
};

export default Duration;
