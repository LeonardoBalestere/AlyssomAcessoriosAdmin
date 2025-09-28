'use client';

import Link from 'next/link';
import { Plus, ClipboardList } from 'lucide-react';

export default function OrdensPage() {
  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ordens de Serviço</h1>
          <p className="text-gray-600">Gerencie todas as ordens de serviço</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/dashboard/ordens/nova"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nova Ordem de Serviço
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="text-center py-12">
          <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma ordem de serviço encontrada</h3>
          <p className="mt-1 text-sm text-gray-500">
            Comece criando a primeira ordem de serviço.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/ordens/nova"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nova Ordem de Serviço
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}