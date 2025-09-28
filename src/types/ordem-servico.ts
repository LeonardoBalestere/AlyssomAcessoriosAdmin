import { Cliente } from './cliente';
import { Veiculo } from './veiculo';
import { Item } from './item';
import { Servico } from './servico';

export type OrdemServicoItem = {
  uuid: string;
  ordem_servico_uuid: string;
  item_uuid: string;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
  item?: Item;
};

export type OrdemServicoServico = {
  uuid: string;
  ordem_servico_uuid: string;
  servico_uuid: string;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
  servico?: Servico;
};

export type OrdemServico = {
  uuid: string;
  cliente_uuid: string;
  veiculo_uuid: string;
  numero: string;
  status: 'AGUARDANDO' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
  data_abertura: string;
  data_previsao?: string;
  data_conclusao?: string;
  descricao?: string;
  observacoes?: string;
  valor_total: number;
  desconto?: number;
  valor_final: number;
  forma_pagamento?: 'DINHEIRO' | 'CARTAO_CREDITO' | 'CARTAO_DEBITO' | 'PIX' | 'TRANSFERENCIA';
  criado: string;
  alterado?: string;
  
  // Relacionamentos
  cliente?: Cliente;
  veiculo?: Veiculo;
  itens?: OrdemServicoItem[];
  servicos?: OrdemServicoServico[];
};

export type CreateOrdemServicoRequest = {
  cliente_uuid: string;
  veiculo_uuid: string;
  data_previsao?: string;
  descricao?: string;
  observacoes?: string;
  desconto?: number;
  forma_pagamento?: 'DINHEIRO' | 'CARTAO_CREDITO' | 'CARTAO_DEBITO' | 'PIX' | 'TRANSFERENCIA';
  itens?: Array<{
    item_uuid: string;
    quantidade: number;
    preco_unitario: number;
  }>;
  servicos?: Array<{
    servico_uuid: string;
    quantidade: number;
    preco_unitario: number;
  }>;
};

export type UpdateOrdemServicoRequest = Partial<CreateOrdemServicoRequest> & { 
  uuid: string;
  status?: 'AGUARDANDO' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
};