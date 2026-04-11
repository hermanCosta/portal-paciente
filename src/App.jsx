import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './modules/auth/LoginPage';
import DashBoardPage from './modules/dashboard';
import ExamesPage from './modules/exames/ExamePage';
import ConsultasPage from './modules/consultas/ConsultaPage';
import AgendamentoPage from './modules/agendamentos/AgendamentoPage';
import MainLayout from './components/MainLayout';
import './App.css';

import {PacienteProvider, usePaciente} from './contexts/PacienteContext';

function AppRoutes() {
  const  { dados } = usePaciente();
  const { paciente } = dados;

return (
   <Routes>
        <Route
          path="/login"
          element={!paciente ? <LoginPage /> : <Navigate to="/" />}
        />
          <Route element={paciente ? <MainLayout /> : <Navigate to="/login" />}  >      
          <Route path="/" element={<DashBoardPage />} />
          <Route path="/consultas" element={<ConsultasPage />} />
          <Route path="/exames" element={<ExamesPage />} />
          <Route path="/agendamentos" element={<AgendamentoPage />} />
        </Route>
      </Routes>
);
}

function App(){
  return (
    <PacienteProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PacienteProvider>
  );
}

export default App;
