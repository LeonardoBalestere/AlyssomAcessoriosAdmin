'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { clienteSchema, ClienteFormData } from '../../../../lib/validations';
import { useCreateCliente } from '../../../../hooks';

export default function NovoClientePage() {
  const router = useRouter();
  const createCliente = useCreateCliente();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
  });

  const onSubmit = async (data: ClienteFormData) => {
    try {
      await createCliente.mutateAsync(data);
      router.push('/dashboard/clientes');
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Link
            href="/dashboard/clientes"
            className="mr-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Novo Cliente</h1>
        <p className="text-gray-600">Cadastre um novo cliente no sistema</p>
      </div>

      {/* Form */}
      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
          <div>
            <label htmlFor="nome_completo" className="block text-sm font-medium text-gray-700">
              Nome Completo *
            </label>
            <input
              type="text"
              id="nome_completo"
              {...register('nome_completo')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Digite o nome completo do cliente"
            />
            {errors.nome_completo && (
              <p className="mt-2 text-sm text-red-600">{errors.nome_completo.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="cpf_cnpj" className="block text-sm font-medium text-gray-700">
              CPF/CNPJ *
            </label>
            <input
              type="text"
              id="cpf_cnpj"
              {...register('cpf_cnpj')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Digite o CPF ou CNPJ"
            />
            {errors.cpf_cnpj && (
              <p className="mt-2 text-sm text-red-600">{errors.cpf_cnpj.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Digite o email do cliente"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="text"
              id="telefone"
              {...register('telefone')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Digite o telefone do cliente"
            />
            {errors.telefone && (
              <p className="mt-2 text-sm text-red-600">{errors.telefone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
              Endereço
            </label>
            <textarea
              id="endereco"
              rows={3}
              {...register('endereco')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Digite o endereço completo do cliente"
            />
            {errors.endereco && (
              <p className="mt-2 text-sm text-red-600">{errors.endereco.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Link
              href="/dashboard/clientes"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}