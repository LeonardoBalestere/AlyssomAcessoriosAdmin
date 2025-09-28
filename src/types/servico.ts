export type Servico = {
  uuid: string;
  codigo: string;
  nome: string;
  descricao?: string;
  preco: number;
  tempo_estimado?: number; // em minutos
  categoria?: string;
  observacoes?: string;
  criado: string;
  alterado?: string;
};

export type CreateServicoRequest = Omit<Servico, 'uuid' | 'criado' | 'alterado'>;
export type UpdateServicoRequest = Partial<CreateServicoRequest> & { uuid: string };