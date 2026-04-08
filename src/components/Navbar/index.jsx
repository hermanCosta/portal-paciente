import {NavLink} from 'react-router-dom';
import { usePaciente } from '../../contexts/PacienteContext';
import './style.css';


const NAV_LINKS = [
  { to: '/', label: 'Início', end: true },
  { to: '/consultas', label: 'Consultas' },
  { to: '/exames', label: 'Exames' },
  { to: '/agendamentos', label: 'Agendamentos' },
];

const navlinkClass = ({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link';

function NavBar() {
    const {paciente, logout} = usePaciente();

    return (
        <header className="navbar">
            <div className='navbar-brand'>
                <span className='navbar-brand-icon'>🩺</span>
                <span className='navbar-brand-name'>Portal do Paciente </span>            
            </div>

            <nav className="navbar-nav">
                {NAV_LINKS.map(({to, label, end}) => (
                    <NavLink key={to} to={to} end={end} className={navlinkClass}>
                    {label}
                    </NavLink>
                ))}
            </nav>

            <div className='navbar-actions'>
                <button className='navbar-bell' title='Notificações'>🔔</button>
                <span className='navbar-user'> {paciente?.nome}</span>
                <button className='navbar-logout' onClick={() => logout()}>Sair</button>
            </div>
        </header>
    );
}

export default NavBar;