import { useState } from "react";
import ExamesTable from "./ExamesTable";

import { usePaciente } from "../../../contexts/PacienteContext";

function ExamesPage() {
  const { dados, atualizarExames } = usePaciente();
  const { exames } = dados;
  const [carregando, setCarregando] = useState(false);

  const handleAtualizar = async () => {
    setCarregando(true);
    await atualizarExames();
    setCarregando(false);
  };

  return (
    <div>
      <h1>Exames</h1>
      <button onClick={handleAtualizar} disabled={carregando}>
        {carregando ? 'Atualizando...' : 'Atualizar dados'}
      </button>
      {
        exames && exames.length > 0 ? (
          <ExamesTable exames={exames} />
        ) : (
          <p>Não há exames disponíveis.</p>
        )
      }
    </div>
  );
}

export default ExamesPage;