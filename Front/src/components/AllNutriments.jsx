import { USER_MAIN_DATA } from '../../../Back/app/data.js';
import Nutriment from './Nutriment.jsx'
import fatIcon from '../assets/fat-icon.svg'
import carbIcon from '../assets/carbs-icon.svg'
import proteinIcon from '../assets/protein-icon.svg'
import caloriesIcon from '../assets/calories-icon.svg'




function AllNutriments({ userId }) {
    const user = USER_MAIN_DATA.find(u => u.id === userId);

    if (!user) {
        return <p>Aucune donnée trouvée pour l’utilisateur {userId}</p>;
    }

    const keyData = user.keyData;

    const nutrimentsLabels = {
        calorieCount: 'Calories',
        proteinCount: 'Protéines',
        carbohydrateCount: 'Glucides',
        lipidCount: 'Lipides',
    };

    const nutrimentsUnities = {
        calorieCount :'kCal',
        proteinCount :'g',
        carbohydrateCount :'g',
        lipidCount:'g',
    }

    const nutrimentsIcons = {
        calorieCount: caloriesIcon,
        proteinCount: proteinIcon,
        carbohydrateCount: carbIcon,
        lipidCount: fatIcon,
    };

    const nutrimentsArray = Object.entries(keyData); 

    return (
        <div className="nutriments-container">
            {nutrimentsArray.map(([key, value]) => (
                <Nutriment
                    key={key}
                    type={nutrimentsLabels[key]}
                    value={value}
                    icon={nutrimentsIcons[key]}
                    unity={nutrimentsUnities[key]}
                />
            ))}
        </div>
    );
}

export default AllNutriments;
