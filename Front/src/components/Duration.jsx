import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { USER_AVERAGE_SESSIONS } from '../../../Back/app/data.js';

function Duration({userId}) {
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
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >

                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="duration" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Duration;
