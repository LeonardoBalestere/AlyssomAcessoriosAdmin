export type Item = {
  uuid: string;
  codigo: string;
  nome: string;
  descricao?: string;
  preco: number;
  categoria?: string;
  estoque?: number;
  fornecedor?: string;
  observacoes?: string;
  criado: string;
  alterado?: string;
};

export type CreateItemRequest = Omit<Item, 'uuid' | 'criado' | 'alterado'>;
export type UpdateItemRequest = Partial<CreateItemRequest> & { uuid: string };