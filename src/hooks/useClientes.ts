import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { Cliente, CreateClienteRequest, UpdateClienteRequest, PaginationResponse, SearchParams } from '../types';
import toast from 'react-hot-toast';

// Hook para buscar todos os clientes com paginação
export function useClientes(params?: SearchParams) {
  return useQuery<PaginationResponse<Cliente>>({
    queryKey: ['clientes', params],
    queryFn: async () => {
      const response = await api.get('/clientes', { params });
      return response.data;
    },
  });
}

// Hook para buscar um cliente específico
export function useCliente(uuid: string) {
  return useQuery<Cliente>({
    queryKey: ['clientes', uuid],
    queryFn: async () => {
      const response = await api.get(`/clientes/${uuid}`);
      return response.data;
    },
    enabled: !!uuid,
  });
}

// Hook para criar cliente
export function useCreateCliente() {
  const queryClient = useQueryClient();
  
  return useMutation<Cliente, Error, CreateClienteRequest>({
    mutationFn: async (data) => {
      const response = await api.post('/clientes', data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      toast.success('Cliente cadastrado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao criar cliente:', error);
    },
  });
}

// Hook para atualizar cliente
export function useUpdateCliente() {
  const queryClient = useQueryClient();
  
  return useMutation<Cliente, Error, UpdateClienteRequest>({
    mutationFn: async (data) => {
      const response = await api.put(`/clientes/${data.uuid}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      queryClient.invalidateQueries({ queryKey: ['clientes', data.uuid] });
      toast.success('Cliente atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar cliente:', error);
    },
  });
}

// Hook para deletar cliente
export function useDeleteCliente() {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: async (uuid) => {
      await api.delete(`/clientes/${uuid}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      toast.success('Cliente excluído com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao excluir cliente:', error);
    },
  });
}