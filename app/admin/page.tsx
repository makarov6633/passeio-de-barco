'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Reserva {
  id: string;
  nome_cliente: string;
  email: string;
  telefone: string;
  whatsapp: string;
  passeio_nome: string;
  data_preferida: string;
  numero_pessoas: number;
  observacoes?: string;
  status: 'pendente' | 'confirmado' | 'cancelado' | 'realizado';
  created_at: string;
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filtro, setFiltro] = useState<string>('todos');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'caleb2025admin') {
      setAuthenticated(true);
      loadReservas();
    } else {
      alert('Senha incorreta');
    }
  };

  const loadReservas = async (status?: string) => {
    setLoading(true);
    try {
      const url = status && status !== 'todos' 
        ? `/api/reservas/list?status=${status}`
        : '/api/reservas/list';
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setReservas(data.reservas);
      }
    } catch (error) {
      console.error('Erro ao carregar reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmar = async (id: string) => {
    if (!confirm('Confirmar esta reserva?')) return;
    
    try {
      const response = await fetch('/api/reservas/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reserva_id: id }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Reserva confirmada! Cliente receberá WhatsApp.');
        loadReservas(filtro);
      }
    } catch (error) {
      console.error('Erro ao confirmar:', error);
      alert('Erro ao confirmar reserva');
    }
  };

  useEffect(() => {
    if (authenticated) {
      loadReservas(filtro);
    }
  }, [filtro, authenticated]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a4d54] to-[#052e32] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <Image 
              src="/logo-ctc.png" 
              alt="Caleb's Tour" 
              width={100} 
              height={100} 
              className="mx-auto rounded-full mb-4"
              unoptimized
            />
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-2">Caleb&apos;s Tour CRM</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha de Acesso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0a4d54] focus:border-transparent outline-none"
                placeholder="Digite a senha"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#0a4d54] hover:bg-[#073538] text-white font-bold py-3 rounded-xl transition-all"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  const stats = {
    total: reservas.length,
    pendentes: reservas.filter(r => r.status === 'pendente').length,
    confirmadas: reservas.filter(r => r.status === 'confirmado').length,
    realizadas: reservas.filter(r => r.status === 'realizado').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'confirmado': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      case 'realizado': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0a4d54] text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image 
              src="/logo-ctc.png" 
              alt="Logo" 
              width={50} 
              height={50} 
              className="rounded-full"
              unoptimized
            />
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-cyan-200 text-sm">Gerenciamento de Reservas</p>
            </div>
          </div>
          
          <button
            onClick={() => setAuthenticated(false)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <p className="text-gray-500 text-sm">Total</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-6 shadow-md border border-yellow-200">
            <p className="text-yellow-700 text-sm">Pendentes</p>
            <p className="text-3xl font-bold text-yellow-900">{stats.pendentes}</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 shadow-md border border-green-200">
            <p className="text-green-700 text-sm">Confirmadas</p>
            <p className="text-3xl font-bold text-green-900">{stats.confirmadas}</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 shadow-md border border-blue-200">
            <p className="text-blue-700 text-sm">Realizadas</p>
            <p className="text-3xl font-bold text-blue-900">{stats.realizadas}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Reservas</h2>
            
            <div className="flex gap-2">
              {['todos', 'pendente', 'confirmado', 'realizado', 'cancelado'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFiltro(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filtro === status
                      ? 'bg-[#0a4d54] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#0a4d54]"></div>
              <p className="text-gray-500 mt-4">Carregando...</p>
            </div>
          ) : reservas.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              Nenhuma reserva encontrada
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contato</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passeio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pessoas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ação</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {reservas.map((reserva) => (
                    <tr key={reserva.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{reserva.nome_cliente}</p>
                          {reserva.observacoes && (
                            <p className="text-xs text-gray-500 mt-1">{reserva.observacoes}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{reserva.telefone}</p>
                          {reserva.email && (
                            <p className="text-gray-500 text-xs">{reserva.email}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{reserva.passeio_nome}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">
                          {new Date(reserva.data_preferida).toLocaleDateString('pt-BR')}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{reserva.numero_pessoas}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reserva.status)}`}>
                          {reserva.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {reserva.status === 'pendente' && (
                          <button
                            onClick={() => handleConfirmar(reserva.id)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all"
                          >
                            Confirmar
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
