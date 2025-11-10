import '../sass/app.scss'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import yoga from '../assets/yoga.svg'
import bike from '../assets/bike.svg'
import swim from '../assets/swim.svg'
import bodybuild from '../assets/bodybuild.svg'
import ActivityGraph from '../components/ActivityGraph'
import DurationGraph from '../components/DurationGraph'
import PerformanceGraph from '../components/PerformanceGraph'
import ScoreGraph from '../components/ScoreGraph'
import AllNutriments from '../components/AllNutriments'
import { getUserMainData } from '../services/dataService'

function App() {
    const { id } = useParams()
    const userId = parseInt(id, 10)
    const [userMainData, setUserMainData] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const userData = await getUserMainData(userId)
                setUserMainData(userData)
                setError(false)
            } catch (error) {
                console.error("Erreur récupération user :", error)
                setError(true)
            }
        }
        fetchData()
    }, [userId])

    const firstname = userMainData?.userInfos?.firstName || 'Utilisateur'

    return (
        <main>
            <div className="navbar-side">
                <ul className="side-menu">
                    <li><img className='sidebar-icon' src={yoga} alt="yoga" /></li>
                    <li><img className='sidebar-icon' src={swim} alt="natation" /></li>
                    <li><img className='sidebar-icon' src={bike} alt="vélo" /></li>
                    <li><img className='sidebar-icon' src={bodybuild} alt="musculation" /></li>
                </ul>
                <p className="copyright">Copyright SportSee2020</p>
            </div>

            <section className='main-content'>
                {error ? (
                    <p className="error-message">Impossible de récupérer les données...</p>
                ) :  (
                    <>
                        <div className="introduction">
                            <h1 className='Hello'>
                                Bonjour <span style={{ color: "red" }}>{firstname}</span>
                            </h1>
                            <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
                        </div>
                        <div className="user-datas">
                            <div className="graphs">
                                <ActivityGraph userId={userId} />
                                <div className="other-graphs">
                                    <DurationGraph userId={userId} />
                                    <PerformanceGraph userId={userId} />
                                    <ScoreGraph userId={userId} />
                                </div>
                            </div>
                            <AllNutriments userId={userId} />
                        </div>
                    </>
                )}
            </section>
        </main>
    )
}

export default App
