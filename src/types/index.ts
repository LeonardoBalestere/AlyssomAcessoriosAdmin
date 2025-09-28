// Exporta todos os tipos do sistema
export * from './cliente';
export * from './veiculo';
export * from './item';
export * from './servico';
export * from './ordem-servico';

// Tipos auxiliares comuns
export type PaginationResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ApiError = {
  message: string;
  code?: string;
  details?: any;
};

export type SearchParams = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};