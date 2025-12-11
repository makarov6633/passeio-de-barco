'use client';

import { useState, useEffect } from 'react';
import { Reserva } from '@/lib/supabase';

export default function AdminDashboard() {
  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState('');
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState<string>('TODOS');

  const login = () => {
    if (senha === 'caleb2025admin') {
      setAutenticado(true);
      carregarReservas();
    } else {
      alert('Senha incorreta!');
    }
  };

  const carregarReservas = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/reservas');
      const data = await response.json();
      setReservas(data);
    } catch (error) {
      console.error('Erro ao carregar reservas:', error);
    }
    setLoading(false);
  };

  const confirmarReserva = async (id: string) => {
    if (!confirm('Confirmar esta reserva?')) return;

    try {
      const response = await fetch('/api/admin/confirmar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert('✅ Reserva confirmada! Cliente notificado via WhatsApp.');
        carregarReservas();
      } else {
        alert('❌ Erro ao confirmar reserva');
      }
    } catch (error) {
      console.error('Erro ao confirmar:', error);
      alert('❌ Erro ao confirmar reserva');
    }
  };

  const reservasFiltradas = filtro === 'TODOS' 
    ? reservas 
    : reservas.filter(r => r.status === filtro);

  const stats = {
    total: reservas.length,
    pendentes: reservas.filter(r => r.status === 'PENDENTE').length,
    confirmadas: reservas.filter(r => r.status === 'CONFIRMADO').length,
    canceladas: reservas.filter(r => r.status === 'CANCELADO').length,
  };

  if (!autenticado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🔐 Admin Dashboard
          </h1>
          <p className="text-gray-600 mb-4 text-center">Caleb's Tour CRM</p>
          <input
            type="password"
            placeholder="Digite a senha..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={login}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard Admin</h1>
            <p className="text-gray-600">Sistema de Gestão de Reservas</p>
          </div>
          <button
            onClick={() => setAutenticado(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-gray-500 text-sm font-medium">Total</div>
            <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
            <div className="text-yellow-700 text-sm font-medium">Pendentes</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.pendentes}</div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <div className="text-green-700 text-sm font-medium">Confirmadas</div>
            <div className="text-3xl font-bold text-green-600">{stats.confirmadas}</div>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow-md">
            <div className="text-red-700 text-sm font-medium">Canceladas</div>
            <div className="text-3xl font-bold text-red-600">{stats.canceladas}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setFiltro('TODOS')}
              className={`px-4 py-2 rounded-lg ${filtro === 'TODOS' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltro('PENDENTE')}
              className={`px-4 py-2 rounded-lg ${filtro === 'PENDENTE' ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setFiltro('CONFIRMADO')}
              className={`px-4 py-2 rounded-lg ${filtro === 'CONFIRMADO' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              Confirmadas
            </button>
            <button
              onClick={carregarReservas}
              className="ml-auto px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              🔄 Atualizar
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando reservas...</p>
            </div>
          ) : reservasFiltradas.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Nenhuma reserva encontrada
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Cliente</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Telefone</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Passeio</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Data</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Pessoas</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Voucher</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {reservasFiltradas.map((reserva) => (
                    <tr key={reserva.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{reserva.cliente?.nome || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{reserva.cliente?.telefone || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{reserva.passeio?.nome || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{reserva.data_passeio}</td>
                      <td className="px-4 py-3 text-sm">{reserva.num_pessoas}</td>
                      <td className="px-4 py-3 text-sm font-mono text-xs">{reserva.voucher}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            reserva.status === 'CONFIRMADO'
                              ? 'bg-green-100 text-green-700'
                              : reserva.status === 'PENDENTE'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {reserva.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {reserva.status === 'PENDENTE' && (
                          <button
                            onClick={() => confirmarReserva(reserva.id!)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                          >
                            ✓ Confirmar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
