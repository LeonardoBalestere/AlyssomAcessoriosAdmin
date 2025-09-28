import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { Item, CreateItemRequest, UpdateItemRequest, PaginationResponse, SearchParams } from '../types';
import toast from 'react-hot-toast';

// Hook para buscar todos os itens com paginação
export function useItens(params?: SearchParams) {
  return useQuery<PaginationResponse<Item>>({
    queryKey: ['itens', params],
    queryFn: async () => {
      const response = await api.get('/itens', { params });
      return response.data;
    },
  });
}

// Hook para buscar um item específico
export function useItem(uuid: string) {
  return useQuery<Item>({
    queryKey: ['itens', uuid],
    queryFn: async () => {
      const response = await api.get(`/itens/${uuid}`);
      return response.data;
    },
    enabled: !!uuid,
  });
}

// Hook para buscar itens por código ou nome (para autocomplete)
export function useItensSearch(search: string) {
  return useQuery<Item[]>({
    queryKey: ['itens', 'search', search],
    queryFn: async () => {
      const response = await api.get('/itens/search', { params: { q: search } });
      return response.data;
    },
    enabled: search.length >= 2,
  });
}

// Hook para criar item
export function useCreateItem() {
  const queryClient = useQueryClient();
  
  return useMutation<Item, Error, CreateItemRequest>({
    mutationFn: async (data) => {
      const response = await api.post('/itens', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itens'] });
      toast.success('Item cadastrado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao criar item:', error);
    },
  });
}

// Hook para atualizar item
export function useUpdateItem() {
  const queryClient = useQueryClient();
  
  return useMutation<Item, Error, UpdateItemRequest>({
    mutationFn: async (data) => {
      const response = await api.put(`/itens/${data.uuid}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['itens'] });
      queryClient.invalidateQueries({ queryKey: ['itens', data.uuid] });
      toast.success('Item atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar item:', error);
    },
  });
}

// Hook para deletar item
export function useDeleteItem() {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: async (uuid) => {
      await api.delete(`/itens/${uuid}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itens'] });
      toast.success('Item excluído com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao excluir item:', error);
    },
  });
}