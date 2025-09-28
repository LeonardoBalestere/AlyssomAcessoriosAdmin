'use client';

import Link from 'next/link';
import { Users, Car, Package, Wrench, ClipboardList, Plus } from 'lucide-react';

const stats = [
  { name: 'Total de Clientes', value: '0', icon: Users, href: '/dashboard/clientes' },
  { name: 'Veículos Cadastrados', value: '0', icon: Car, href: '/dashboard/veiculos' },
  { name: 'Itens em Estoque', value: '0', icon: Package, href: '/dashboard/itens' },
  { name: 'Serviços Disponíveis', value: '0', icon: Wrench, href: '/dashboard/servicos' },
];

const quickActions = [
  { name: 'Nova Ordem de Serviço', href: '/dashboard/ordens/nova', icon: Plus, color: 'bg-blue-500 hover:bg-blue-600' },
  { name: 'Novo Cliente', href: '/dashboard/clientes/novo', icon: Plus, color: 'bg-green-500 hover:bg-green-600' },
  { name: 'Novo Veículo', href: '/dashboard/veiculos/novo', icon: Plus, color: 'bg-purple-500 hover:bg-purple-600' },
  { name: 'Novo Item', href: '/dashboard/itens/novo', icon: Plus, color: 'bg-orange-500 hover:bg-orange-600' },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao sistema de gestão da Alyssom Acessórios</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <dt>
                <div className="absolute bg-indigo-500 rounded-md p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </dd>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                href={action.href}
                className={`${action.color} flex items-center justify-center px-4 py-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {action.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Ordens de Serviço Recentes
          </h3>
          <div className="text-center py-8">
            <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma ordem de serviço</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comece criando uma nova ordem de serviço.
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard/ordens/nova"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nova Ordem de Serviço
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}