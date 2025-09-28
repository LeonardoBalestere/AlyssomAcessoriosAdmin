import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { Servico, CreateServicoRequest, UpdateServicoRequest, PaginationResponse, SearchParams } from '../types';
import toast from 'react-hot-toast';

// Hook para buscar todos os serviços com paginação
export function useServicos(params?: SearchParams) {
  return useQuery<PaginationResponse<Servico>>({
    queryKey: ['servicos', params],
    queryFn: async () => {
      const response = await api.get('/servicos', { params });
      return response.data;
    },
  });
}

// Hook para buscar um serviço específico
export function useServico(uuid: string) {
  return useQuery<Servico>({
    queryKey: ['servicos', uuid],
    queryFn: async () => {
      const response = await api.get(`/servicos/${uuid}`);
      return response.data;
    },
    enabled: !!uuid,
  });
}

// Hook para buscar serviços por código ou nome (para autocomplete)
export function useServicosSearch(search: string) {
  return useQuery<Servico[]>({
    queryKey: ['servicos', 'search', search],
    queryFn: async () => {
      const response = await api.get('/servicos/search', { params: { q: search } });
      return response.data;
    },
    enabled: search.length >= 2,
  });
}

// Hook para criar serviço
export function useCreateServico() {
  const queryClient = useQueryClient();
  
  return useMutation<Servico, Error, CreateServicoRequest>({
    mutationFn: async (data) => {
      const response = await api.post('/servicos', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['servicos'] });
      toast.success('Serviço cadastrado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao criar serviço:', error);
    },
  });
}

// Hook para atualizar serviço
export function useUpdateServico() {
  const queryClient = useQueryClient();
  
  return useMutation<Servico, Error, UpdateServicoRequest>({
    mutationFn: async (data) => {
      const response = await api.put(`/servicos/${data.uuid}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['servicos'] });
      queryClient.invalidateQueries({ queryKey: ['servicos', data.uuid] });
      toast.success('Serviço atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar serviço:', error);
    },
  });
}

// Hook para deletar serviço
export function useDeleteServico() {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: async (uuid) => {
      await api.delete(`/servicos/${uuid}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['servicos'] });
      toast.success('Serviço excluído com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao excluir serviço:', error);
    },
  });
}