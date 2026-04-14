import { createContext, use, useContext, useState } from "react";
import { get, post } from "../services/api";

const PacienteContext = createContext(null);
const dadosIniciais = { paciente: null, exames: [], consultas: [] };

export const PacienteProvider = ({ children }) => {
    const [dados, setDados] = useState(dadosIniciais);
    const [error, setError] = useState(null);

    const login = async (carteirinha, senha) => {
        setError(null);

        try {
            const paciente = await post("/login", { carteirinha, senha });
            const exames = await get(`/exames?pacienteId=${paciente.id}`);
            const consultas = await get(`/consultas?pacienteId=${paciente.id}`);

            setDados({ paciente, exames, consultas });
        } catch (err) {
            console.log("erro: ", err);
            setError("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.");
        }
    };

    const atualizarExames = async () => {
        const exames = await get(`/exames?pacienteId=${dados.paciente.id}`);
        setDados((prev) => ({ ...prev, exames }));
    };

    const atualizarConsultas = async () => {
        const consultas = await get(`/consultas?pacienteId=${dados.paciente.id}`);
        setDados((prev) => ({ ...prev, consultas }));
    };

    const logout = async () => {
        setDados(dadosIniciais);
    };

    return (
        <PacienteContext.Provider value={{ dados, login, logout, error, atualizarConsultas, atualizarExames }}>
            {children}
        </PacienteContext.Provider>
    );
};

export const usePaciente = () => {
    const context = useContext(PacienteContext);
    if (!context) {
        throw new Error('usePaciente dever usado dentro de um PacienteProvider');
    }

    return context;
};