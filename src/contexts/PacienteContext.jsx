import { createContext, use, useContext, useState } from "react";
import { post } from "../services/api";

const PacienteContext = createContext(null);
const dadosIniciais = {paciente: null, exames: [], consultas: []};

export const PacienteProvider = ({ children }) => {
    const [dados, setDados] = useState(dadosIniciais);
    const [paciente, setPaciente] = useState(null);
    const [error, setError] = useState(null);

    const login = async (carteirinha, senha) => {
        setError(null);

        try {
            const paciente = await post("/login", { carteirinha, senha });            
            const exames = await get(`/exames?pacienteId=${paciente.id}`);
            const consultas = await get(`/consultas?pacienteId=${paciente.id}`);                            
            
            console.log("Login bem-sucedido:", data);
            setDados({paciente, exames, consultas});
      } catch (err) {       
        setError("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.");
      }
    };

    const logout = async () =>{
        setPaciente(null);
    };

    return (
        <PacienteContext.Provider value={{dados, login, logout, error}}>
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