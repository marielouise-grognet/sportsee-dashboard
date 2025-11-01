import '../sass/app.scss'
import { useParams } from 'react-router-dom'
import yoga from '../assets/yoga.svg'
import bike from '../assets/bike.svg'
import swim from '../assets/swim.svg'
import bodybuild from '../assets/bodybuild.svg'
import ActivityBarChart from '../components/ActivityBarChart'
import Duration from '../components/Duration'
import Performance from '../components/Performance'
import Score from '../components/Score'
import { USER_MAIN_DATA } from '../../../Back/app/data'
import AllNutriments from '../components/AllNutriments'

function App() {
    const { id } = useParams() // récupère l'id depuis l'URL
    const userId = parseInt(id, 10)
    const user = USER_MAIN_DATA.find(u => u.id === userId)
    const firstname = user?.userInfos?.firstName || 'Utilisateur'

    return (
        <main>
            <div className="navbar-side">
                <ul className="side-menu">
                    <li><img className='sidebar-icon' src={yoga} /></li>
                    <li><img className='sidebar-icon' src={swim} /></li>
                    <li><img className='sidebar-icon' src={bike} /></li>
                    <li><img className='sidebar-icon' src={bodybuild} /></li>
                </ul>
                <p className="copyright">Copyright SportSee2020</p>
            </div>
            <section className='main-content'>
                <div className="introduction">
                    <h1 className='Hello'>Bonjour <span style={{ color: "red" }}>{firstname}</span></h1>
                    <p>Félicitations ! Vous avez explosé vos objectifs hier</p>
                </div>
                <div className="user-datas">
                    <div className="graphs">
                        <ActivityBarChart userId={userId} />

                        <div className="other-graphs">
                            <Duration userId={userId} />
                            <Performance userId={userId} />
                            <Score userId={userId} />
                        </div>
                    </div>
                    <AllNutriments userId={userId} />
                </div>
            </section>
        </main>
    )
}

export default App