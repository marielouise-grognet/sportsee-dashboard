import './sass/app.scss'
import yoga from './assets/yoga.svg'
import bike from './assets/bike.svg'
import swim from './assets/swim.svg'
import bodybuild from './assets/bodybuild.svg'
import ActivityBarChart from './components/ActivityBarChart'
import Duration from './components/Duration'
import { USER_MAIN_DATA } from '../../Back/app/data'

function App() {
    // Récupérer l'utilisateur avec id 12
    const user = USER_MAIN_DATA.find(u => u.id === 12)
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
            <div className="introduction">
                <h1 className='Hello'>Bonjour {firstname}</h1>
                <p>Félicitations ! Vous avez explosé vos objectifs hier</p>
            </div>
            <div className="graphs">
                    <ActivityBarChart userId={12} />

                <div className="other-graphs">
                    <Duration userId={12} />


                </div>


            </div>
        </main>
    )
}

export default App
