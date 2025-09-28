'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Car, ClipboardList } from 'lucide-react';
import { useCliente, useVeiculosByCliente, useOrdensServicoByCliente } from '../../../../hooks';

export default function ClientePage() {
  const params = useParams();
  const uuid = params.id as string;

  const { data: cliente, isLoading, error } = useCliente(uuid);
  const { data: veiculos } = useVeiculosByCliente(uuid);
  const { data: ordens } = useOrdensServicoByCliente(uuid);

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Erro ao carregar cliente</div>
        <Link
          href="/dashboard/clientes"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Voltar para Clientes
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        <p className="mt-2 text-gray-500">Carregando cliente...</p>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">Cliente não encontrado</div>
        <Link
          href="/dashboard/clientes"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Voltar para Clientes
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/dashboard/clientes"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para Clientes
          </Link>
          <Link
            href={`/dashboard/clientes/${uuid}/editar`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Edit className="h-5 w-5 mr-2" />
            Editar Cliente
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{cliente.nome_completo}</h1>
        <p className="text-gray-600">Detalhes do cliente</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações do Cliente */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Informações do Cliente
              </h3>
            </div>
            <div className="px-6 py-4">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Nome Completo</dt>
                  <dd className="mt-1 text-sm text-gray-900">{cliente.nome_completo}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">CPF/CNPJ</dt>
                  <dd className="mt-1 text-sm text-gray-900">{cliente.cpf_cnpj}</dd>
                </div>
                {cliente.email && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{cliente.email}</dd>
                  </div>
                )}
                {cliente.telefone && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Telefone</dt>
                    <dd className="mt-1 text-sm text-gray-900">{cliente.telefone}</dd>
                  </div>
                )}
                {cliente.endereco && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Endereço</dt>
                    <dd className="mt-1 text-sm text-gray-900">{cliente.endereco}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-gray-500">Cadastrado em</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(cliente.criado).toLocaleDateString('pt-BR')}
                  </dd>
                </div>
                {cliente.alterado && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Última atualização</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(cliente.alterado).toLocaleDateString('pt-BR')}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        {/* Sidebar - Ações Rápidas */}
        <div>
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Ações Rápidas
              </h3>
            </div>
            <div className="px-6 py-4 space-y-3">
              <Link
                href={`/dashboard/veiculos/novo?cliente=${uuid}`}
                className="w-full inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Car className="h-5 w-5 mr-2" />
                Adicionar Veículo
              </Link>
              <Link
                href={`/dashboard/ordens/nova?cliente=${uuid}`}
                className="w-full inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <ClipboardList className="h-5 w-5 mr-2" />
                Nova Ordem de Serviço
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Veículos */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Veículos ({veiculos?.length || 0})
              </h3>
              <Link
                href={`/dashboard/veiculos/novo?cliente=${uuid}`}
                className="text-sm text-indigo-600 hover:text-indigo-900"
              >
                Adicionar veículo
              </Link>
            </div>
          </div>
          <div className="px-6 py-4">
            {!veiculos || veiculos.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Nenhum veículo cadastrado</p>
            ) : (
              <div className="space-y-3">
                {veiculos.map((veiculo) => (
                  <div key={veiculo.uuid} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {veiculo.marca} {veiculo.modelo} ({veiculo.ano})
                      </p>
                      <p className="text-sm text-gray-500">Placa: {veiculo.placa}</p>
                    </div>
                    <Link
                      href={`/dashboard/veiculos/${veiculo.uuid}`}
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                      Ver detalhes
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ordens de Serviço */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Ordens de Serviço ({ordens?.length || 0})
              </h3>
              <Link
                href={`/dashboard/ordens/nova?cliente=${uuid}`}
                className="text-sm text-indigo-600 hover:text-indigo-900"
              >
                Nova ordem
              </Link>
            </div>
          </div>
          <div className="px-6 py-4">
            {!ordens || ordens.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Nenhuma ordem de serviço encontrada</p>
            ) : (
              <div className="space-y-3">
                {ordens.map((ordem) => (
                  <div key={ordem.uuid} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Ordem #{ordem.numero}
                      </p>
                      <p className="text-sm text-gray-500">
                        Status: {ordem.status} • R$ {ordem.valor_final.toFixed(2)}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/ordens/${ordem.uuid}`}
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                      Ver detalhes
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}