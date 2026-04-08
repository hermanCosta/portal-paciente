import { useState } from "react";
import LoginHeader from "../LoginHeader";
import InputField from "../../../components/InputField";

import { usePaciente } from "../../../contexts/PacienteContext";
import "./style.css";

function LoginForm() {
    const  {login, error} = usePaciente();
    const  [carteirinha, setCarteirinha] = useState("");
    const  [senha, setSenha] = useState("");   


  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(carteirinha, senha);     
  };   

  return (
    <div className="login-card" >
      <LoginHeader />

    <form onSubmit={handleSubmit} className="login-form" id="login-form">
        <InputField
          id="carteirinha"
          type="text"
          placeholder="Digite sua carteirinha"
          label="Carteirinha"
          value={carteirinha}
          onChange={(e) => setCarteirinha(e.target.value)}
        />

        <InputField
          id="senha"
          type="password"
          placeholder="Digite sua senha"
          label="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {error && <div className="error-message" id="login-error"></div>}

        <button type="submit" className="btn-primary">Entrar</button>
    </form>
    </div>
  )
}

export default LoginForm;