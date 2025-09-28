export type Veiculo = {
  uuid: string;
  cliente_uuid: string;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cor?: string;
  combustivel?: 'GASOLINA' | 'ETANOL' | 'DIESEL' | 'FLEX' | 'GNV';
  quilometragem?: number;
  observacoes?: string;
  criado: string;
  alterado?: string;
};

export type CreateVeiculoRequest = Omit<Veiculo, 'uuid' | 'criado' | 'alterado'>;
export type UpdateVeiculoRequest = Partial<CreateVeiculoRequest> & { uuid: string };