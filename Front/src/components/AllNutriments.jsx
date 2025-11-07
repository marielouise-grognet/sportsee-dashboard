import Nutriment from './Nutriment.jsx'
import fatIcon from '../assets/fat-icon.svg'
import carbIcon from '../assets/carbs-icon.svg'
import proteinIcon from '../assets/protein-icon.svg'
import caloriesIcon from '../assets/calories-icon.svg'
import { useEffect, useState } from "react"
import { getUserMainData } from "../services/dataService.js"


function AllNutriments({ userId }) {
    const [userMainData, setUserMainData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserMainData(userId)
                setUserMainData(userData)
            }
            catch (err) {
                console.error(err)
                setError('Impossible de récupérer les données')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [userId])

    if (loading) return <p>Chargement...</p>
    if (error) return <p>{error}</p>
    if (!userMainData) return <p>Aucune donnée disponible</p>

    const keyData = userMainData.keyData

    const nutrimentsLabels = {
        calorieCount: 'Calories',
        proteinCount: 'Protéines',
        carbohydrateCount: 'Glucides',
        lipidCount: 'Lipides',
    }

    const nutrimentsUnities = {
        calorieCount: 'kCal',
        proteinCount: 'g',
        carbohydrateCount: 'g',
        lipidCount: 'g',
    }

    const nutrimentsIcons = {
        calorieCount: caloriesIcon,
        proteinCount: proteinIcon,
        carbohydrateCount: carbIcon,
        lipidCount: fatIcon,
    }

    const nutrimentsArray = Object.entries(keyData)

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
    )
}

export default AllNutriments
