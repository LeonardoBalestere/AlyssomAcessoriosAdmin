import axios from 'axios';
import toast from 'react-hot-toast';

// Configuração base do Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests (adicionar token de autenticação se necessário)
api.interceptors.request.use(
  (config) => {
    // Aqui você pode adicionar token de autenticação
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses (tratamento de erros)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratamento global de erros
    const message = error.response?.data?.message || 'Erro inesperado';
    
    if (error.response?.status === 401) {
      toast.error('Não autorizado. Faça login novamente.');
      // Redirecionar para login se necessário
    } else if (error.response?.status === 403) {
      toast.error('Acesso negado');
    } else if (error.response?.status === 404) {
      toast.error('Recurso não encontrado');
    } else if (error.response?.status >= 500) {
      toast.error('Erro interno do servidor');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Tempo limite de conexão excedido');
    } else {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export default api;