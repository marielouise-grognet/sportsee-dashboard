import logo from '../assets/logo.png'
import '../sass/navbar.scss'
import yoga from'../assets/yoga.svg'
import bike from'../assets/bike.svg'
import swim from'../assets/swim.svg'
import bodybuild from'../assets/bodybuild.svg'

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-top">
                <ul className="header-menu">
                    <li><img className="header-logo"
                        src={logo} alt="Sportsee logo" />
                    </li>
                    <li>Accueil</li>
                    <li>Profil</li>
                    <li>Réglages</li>
                    <li>Communauté</li>
                </ul>
            </div>
            <div className="navbar-side">
                <ul className="side-menu">
                    <li><img className='sidebar-icon' src={yoga}/></li>
                    <li><img className='sidebar-icon' src={swim}/></li>
                    <li><img className='sidebar-icon' src={bike}/></li>
                    <li><img className='sidebar-icon' src={bodybuild}/></li>
                </ul>
                <p className="copyright">Copyright SportSee2020</p>
            </div>
        </div>
    )
}

export default Navbar