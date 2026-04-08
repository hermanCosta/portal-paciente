import { usePaciente } from "../../../contexts/PacienteContext";
import LoginForm from '../LoginForm/Index';
import LoginHeader from '../LoginHeader';
import LoginTip from '../LoginTip';
import './style.css';
///Users/hermancosta/dev/reactTraining/portal-paciente/src/contexts/PacienteContext.jsx

function LoginPage() {
    const { paciente } = usePaciente();
    return (
        <main className="login-page" id="login-page">
            <div className="login-card" >
                <LoginHeader title="Portal do Paciente" brand="Unimed" icon="🏥" />
                <LoginForm setPaciente={paciente} />
                <LoginTip cartao="0089234000012" password="123456"/>               
            </div>            
        </main>
    )
}
export default LoginPage;