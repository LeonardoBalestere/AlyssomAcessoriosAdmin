'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useClientes, useDeleteCliente } from '../../../hooks';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Cliente } from '../../../types';

export default function ClientesPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  
  const { data, isLoading, error } = useClientes({ search, page, limit: 10 });
  const deleteCliente = useDeleteCliente();

  const handleDelete = async (cliente: Cliente) => {
    if (window.confirm(`Tem certeza que deseja excluir o cliente ${cliente.nome_completo}?`)) {
      try {
        await deleteCliente.mutateAsync(cliente.uuid);
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
      }
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Erro ao carregar clientes</div>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600">Gerencie todos os clientes da oficina</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/dashboard/clientes/novo"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Novo Cliente
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Buscar clientes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            <p className="mt-2 text-gray-500">Carregando clientes...</p>
          </div>
        ) : data?.data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum cliente encontrado</p>
            <Link
              href="/dashboard/clientes/novo"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Adicionar Primeiro Cliente
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {data?.data.map((cliente) => (
              <li key={cliente.uuid} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {cliente.nome_completo}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {cliente.cpf_cnpj} {cliente.email && `• ${cliente.email}`}
                        </p>
                        {cliente.telefone && (
                          <p className="text-sm text-gray-500 truncate">
                            {cliente.telefone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center space-x-2">
                    <Link
                      href={`/dashboard/clientes/${cliente.uuid}`}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Link>
                    <Link
                      href={`/dashboard/clientes/${cliente.uuid}/editar`}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(cliente)}
                      disabled={deleteCliente.isPending}
                      className="inline-flex items-center px-2.5 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Excluir
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Mostrando {((page - 1) * 10) + 1} a {Math.min(page * 10, data.total)} de {data.total} resultados
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
              disabled={page === data.totalPages}
              className="px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}