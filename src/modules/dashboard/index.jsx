import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadSpinner";
import { get } from "../../services/api";
import { usePaciente } from "../../contexts/PacienteContext";

function DashBoardPage() {
  const { dados } = usePaciente();

  const { paciente, consultas, exames} = dados;


  if(!paciente || !exames.length || !consultas.length) {
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