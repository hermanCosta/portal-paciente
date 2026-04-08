import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadSpinner";
import { get } from "../../services/api";
import { usePaciente } from "../../contexts/PacienteContext";

function DashBoardPage() {
  const { paciente } = usePaciente();

  const [consultas, setConsultas] = useState([]);
  const [exames, setExames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {     
        const consultasResponse = await get(`/consultas?pacienteId=${paciente.id}`);
        setConsultas(consultasResponse) || [];

        const examesResponse = await get(`/exames?pacienteId=${paciente.id}`);
        setExames(examesResponse) || [];

        console.log("Consultas:", consultasResponse.data);
        console.log("Exames:", examesResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    
    fetchData();

  }, []);

  if(!exames.length || !consultas.length) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Bem-vindo(a), {paciente.nome}!</p>

      {consultas && consultas.length > 0 && (
        <div> 
          <h3>Consultas Recentes</h3>
          <div>
            {consultas.slice(0, 3).map((consulta) => (
              <div key={consulta.id}>                
                <strong> {consulta.especialidade}</strong>
                
                <span> - {consulta.medico}</span>
                <span> | {consulta.data}</span>
                <span> | {consulta.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}       

      {exames && exames.length > 0 && (
        <div> 
          <h3>Exames Recentes</h3>
          <div>
            {exames.slice(0, 3).map((exame) => (
              <div key={exame.id}>                

                <strong> {exame.tipo}</strong>                                
                <span> | {exame.data}</span>
                <span> | {exame.status}</span>
              </div>
            ))}
          </div>
        </div> 
      )}              
    </div>
  );
}

export default DashBoardPage;