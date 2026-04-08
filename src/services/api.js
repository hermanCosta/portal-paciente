import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export async function get(endpoint) {
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        throw error;
    }
};

export async function post(endpoint, data) {
    try {
        const response = await api.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao enviar dados:", error);
        throw error;
    }
};

export async function patch(endpoint, data) {
    try {
        const response = await api.patch(endpoint, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar dados:", error);
        throw error;
    }
}
