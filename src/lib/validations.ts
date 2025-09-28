import * as z from 'zod';

// Schema para Cliente
export const clienteSchema = z.object({
  nome_completo: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  telefone: z.string().optional(),
  endereco: z.string().optional(),
  cpf_cnpj: z.string().min(11, 'CPF/CNPJ deve ter pelo menos 11 caracteres'),
});

export const updateClienteSchema = clienteSchema.partial().extend({
  uuid: z.string().uuid(),
});

// Schema para Veículo
export const veiculoSchema = z.object({
  cliente_uuid: z.string().uuid('UUID do cliente inválido'),
  marca: z.string().min(1, 'Marca é obrigatória'),
  modelo: z.string().min(1, 'Modelo é obrigatório'),
  ano: z.number().int().min(1900, 'Ano inválido').max(new Date().getFullYear() + 1),
  placa: z.string().min(7, 'Placa deve ter pelo menos 7 caracteres'),
  cor: z.string().optional(),
  combustivel: z.enum(['GASOLINA', 'ETANOL', 'DIESEL', 'FLEX', 'GNV']).optional(),
  quilometragem: z.number().int().min(0).optional(),
  observacoes: z.string().optional(),
});

export const updateVeiculoSchema = veiculoSchema.partial().extend({
  uuid: z.string().uuid(),
});

// Schema para Item
export const itemSchema = z.object({
  codigo: z.string().min(1, 'Código é obrigatório'),
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  preco: z.number().min(0, 'Preço deve ser positivo'),
  categoria: z.string().optional(),
  estoque: z.number().int().min(0).optional(),
  fornecedor: z.string().optional(),
  observacoes: z.string().optional(),
});

export const updateItemSchema = itemSchema.partial().extend({
  uuid: z.string().uuid(),
});

// Schema para Serviço
export const servicoSchema = z.object({
  codigo: z.string().min(1, 'Código é obrigatório'),
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  preco: z.number().min(0, 'Preço deve ser positivo'),
  tempo_estimado: z.number().int().min(0).optional(),
  categoria: z.string().optional(),
  observacoes: z.string().optional(),
});

export const updateServicoSchema = servicoSchema.partial().extend({
  uuid: z.string().uuid(),
});

// Schema para Ordem de Serviço
const ordemServicoItemSchema = z.object({
  item_uuid: z.string().uuid(),
  quantidade: z.number().int().min(1),
  preco_unitario: z.number().min(0),
});

const ordemServicoServicoSchema = z.object({
  servico_uuid: z.string().uuid(),
  quantidade: z.number().int().min(1),
  preco_unitario: z.number().min(0),
});

export const ordemServicoSchema = z.object({
  cliente_uuid: z.string().uuid('UUID do cliente inválido'),
  veiculo_uuid: z.string().uuid('UUID do veículo inválido'),
  data_previsao: z.string().optional(),
  descricao: z.string().optional(),
  observacoes: z.string().optional(),
  desconto: z.number().min(0).optional(),
  forma_pagamento: z.enum(['DINHEIRO', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'PIX', 'TRANSFERENCIA']).optional(),
  itens: z.array(ordemServicoItemSchema).optional(),
  servicos: z.array(ordemServicoServicoSchema).optional(),
});

export const updateOrdemServicoSchema = ordemServicoSchema.partial().extend({
  uuid: z.string().uuid(),
  status: z.enum(['AGUARDANDO', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA']).optional(),
});

// Schemas para parâmetros de busca
export const searchParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Tipos derivados dos schemas
export type ClienteFormData = z.infer<typeof clienteSchema>;
export type VeiculoFormData = z.infer<typeof veiculoSchema>;
export type ItemFormData = z.infer<typeof itemSchema>;
export type ServicoFormData = z.infer<typeof servicoSchema>;
export type OrdemServicoFormData = z.infer<typeof ordemServicoSchema>;
export type SearchParamsData = z.infer<typeof searchParamsSchema>;