export type Cliente = {
  uuid: string;
  nome_completo: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  cpf_cnpj: string;
  criado: string;
  alterado?: string;
};

export type CreateClienteRequest = Omit<Cliente, 'uuid' | 'criado' | 'alterado'>;
export type UpdateClienteRequest = Partial<CreateClienteRequest> & { uuid: string };