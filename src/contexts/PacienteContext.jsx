import { createContext, useContext, useState } from "react";
import { post } from "../services/api";

const PacienteContext = createContext(null);

export const PacienteProvider = ({ children }) => {
    const [paciente, setPaciente] = useState(null);
    const [error, setError] = useState(null);

    const login = async (carteirinha, senha) => {
        setError(null);

        try {
        const data = await post("/login", { carteirinha, senha });
        console.log("Login bem-sucedido:", data);
        setPaciente(data);
      } catch (err) {       
        setError("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.");
      }
    };

    const logout = async () =>{
        setPaciente(null);
    };

    return (
        <PacienteContext.Provider value={{paciente, login, logout, error}}>
            {children}
        </PacienteContext.Provider>
    );
};

export const usePaciente = () => {
    const context =useContext(PacienteContext);
    if(!context){
        throw new Error('usePaciente dever usado dentro de um PaccienteProvider');
    }

    return context;
};