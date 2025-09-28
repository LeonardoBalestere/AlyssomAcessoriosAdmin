import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { OrdemServico, CreateOrdemServicoRequest, UpdateOrdemServicoRequest, PaginationResponse, SearchParams } from '../types';
import toast from 'react-hot-toast';

// Hook para buscar todas as ordens de serviço com paginação
export function useOrdensServico(params?: SearchParams) {
  return useQuery<PaginationResponse<OrdemServico>>({
    queryKey: ['ordens-servico', params],
    queryFn: async () => {
      const response = await api.get('/ordens-servico', { params });
      return response.data;
    },
  });
}

// Hook para buscar uma ordem de serviço específica
export function useOrdemServico(uuid: string) {
  return useQuery<OrdemServico>({
    queryKey: ['ordens-servico', uuid],
    queryFn: async () => {
      const response = await api.get(`/ordens-servico/${uuid}`);
      return response.data;
    },
    enabled: !!uuid,
  });
}

// Hook para buscar ordens de serviço por cliente
export function useOrdensServicoByCliente(clienteUuid: string) {
  return useQuery<OrdemServico[]>({
    queryKey: ['ordens-servico', 'cliente', clienteUuid],
    queryFn: async () => {
      const response = await api.get(`/clientes/${clienteUuid}/ordens-servico`);
      return response.data;
    },
    enabled: !!clienteUuid,
  });
}

// Hook para buscar ordens de serviço por veículo
export function useOrdensServicoByVeiculo(veiculoUuid: string) {
  return useQuery<OrdemServico[]>({
    queryKey: ['ordens-servico', 'veiculo', veiculoUuid],
    queryFn: async () => {
      const response = await api.get(`/veiculos/${veiculoUuid}/ordens-servico`);
      return response.data;
    },
    enabled: !!veiculoUuid,
  });
}

// Hook para criar ordem de serviço
export function useCreateOrdemServico() {
  const queryClient = useQueryClient();
  
  return useMutation<OrdemServico, Error, CreateOrdemServicoRequest>({
    mutationFn: async (data) => {
      const response = await api.post('/ordens-servico', data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ordens-servico'] });
      queryClient.invalidateQueries({ queryKey: ['ordens-servico', 'cliente', data.cliente_uuid] });
      queryClient.invalidateQueries({ queryKey: ['ordens-servico', 'veiculo', data.veiculo_uuid] });
      toast.success('Ordem de serviço criada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao criar ordem de serviço:', error);
    },
  });
}

// Hook para atualizar ordem de serviço
export function useUpdateOrdemServico() {
  const queryClient = useQueryClient();
  
  return useMutation<OrdemServico, Error, UpdateOrdemServicoRequest>({
    mutationFn: async (data) => {
      const response = await api.put(`/ordens-servico/${data.uuid}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ordens-servico'] });
      queryClient.invalidateQueries({ queryKey: ['ordens-servico', data.uuid] });
      queryClient.invalidateQueries({ queryKey: ['ordens-servico', 'cliente', data.cliente_uuid] });
      queryClient.invalidateQueries({ queryKey: ['ordens-servico', 'veiculo', data.veiculo_uuid] });
      toast.success('Ordem de serviço atualizada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar ordem de serviço:', error);
    },
  });
}

// Hook para deletar ordem de serviço
export function useDeleteOrdemServico() {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: async (uuid) => {
      await api.delete(`/ordens-servico/${uuid}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ordens-servico'] });
      toast.success('Ordem de serviço excluída com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao excluir ordem de serviço:', error);
    },
  });
}

// Hook para atualizar status da ordem de serviço
export function useUpdateStatusOrdemServico() {
  const queryClient = useQueryClient();
  
  return useMutation<OrdemServico, Error, { uuid: string; status: string }>({
    mutationFn: async ({ uuid, status }) => {
      const response = await api.patch(`/ordens-servico/${uuid}/status`, { status });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ordens-servico'] });
      queryClient.invalidateQueries({ queryKey: ['ordens-servico', data.uuid] });
      toast.success('Status atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar status:', error);
    },
  });
}