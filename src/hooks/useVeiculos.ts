import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { Veiculo, CreateVeiculoRequest, UpdateVeiculoRequest, PaginationResponse, SearchParams } from '../types';
import toast from 'react-hot-toast';

// Hook para buscar todos os veículos com paginação
export function useVeiculos(params?: SearchParams) {
  return useQuery<PaginationResponse<Veiculo>>({
    queryKey: ['veiculos', params],
    queryFn: async () => {
      const response = await api.get('/veiculos', { params });
      return response.data;
    },
  });
}

// Hook para buscar veículos por cliente
export function useVeiculosByCliente(clienteUuid: string) {
  return useQuery<Veiculo[]>({
    queryKey: ['veiculos', 'cliente', clienteUuid],
    queryFn: async () => {
      const response = await api.get(`/clientes/${clienteUuid}/veiculos`);
      return response.data;
    },
    enabled: !!clienteUuid,
  });
}

// Hook para buscar um veículo específico
export function useVeiculo(uuid: string) {
  return useQuery<Veiculo>({
    queryKey: ['veiculos', uuid],
    queryFn: async () => {
      const response = await api.get(`/veiculos/${uuid}`);
      return response.data;
    },
    enabled: !!uuid,
  });
}

// Hook para criar veículo
export function useCreateVeiculo() {
  const queryClient = useQueryClient();
  
  return useMutation<Veiculo, Error, CreateVeiculoRequest>({
    mutationFn: async (data) => {
      const response = await api.post('/veiculos', data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['veiculos'] });
      queryClient.invalidateQueries({ queryKey: ['veiculos', 'cliente', data.cliente_uuid] });
      toast.success('Veículo cadastrado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao criar veículo:', error);
    },
  });
}

// Hook para atualizar veículo
export function useUpdateVeiculo() {
  const queryClient = useQueryClient();
  
  return useMutation<Veiculo, Error, UpdateVeiculoRequest>({
    mutationFn: async (data) => {
      const response = await api.put(`/veiculos/${data.uuid}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['veiculos'] });
      queryClient.invalidateQueries({ queryKey: ['veiculos', data.uuid] });
      queryClient.invalidateQueries({ queryKey: ['veiculos', 'cliente', data.cliente_uuid] });
      toast.success('Veículo atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar veículo:', error);
    },
  });
}

// Hook para deletar veículo
export function useDeleteVeiculo() {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: async (uuid) => {
      await api.delete(`/veiculos/${uuid}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['veiculos'] });
      toast.success('Veículo excluído com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao excluir veículo:', error);
    },
  });
}