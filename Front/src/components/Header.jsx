import logo from '../assets/logo.png'
import '../sass/app.scss'


function Header() {
    return (
        <div className="header">
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
    )
}

export default Header 