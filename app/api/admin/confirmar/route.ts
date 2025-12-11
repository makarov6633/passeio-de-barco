import { NextRequest, NextResponse } from 'next/server';
import { updateReservaStatus, supabase } from '@/lib/supabase';
import { sendWhatsAppMessage } from '@/lib/ai-agent';

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID da reserva é obrigatório' }, { status: 400 });
    }

    const { data: reserva, error } = await supabase
      .from('reservas')
      .select(`
        *,
        cliente:clientes(*),
        passeio:passeios(*)
      `)
      .eq('id', id)
      .single();

    if (error || !reserva) {
      return NextResponse.json({ error: 'Reserva não encontrada' }, { status: 404 });
    }

    const success = await updateReservaStatus(id, 'CONFIRMADO');

    if (!success) {
      return NextResponse.json({ error: 'Erro ao confirmar reserva' }, { status: 500 });
    }

    const mensagem = `🎉 **RESERVA CONFIRMADA!**

Olá ${reserva.cliente.nome}! 😊

Sua reserva está **CONFIRMADA**! 🎊

📋 **Detalhes:**
🚤 ${reserva.passeio.nome}
📅 ${reserva.data_passeio}
👥 ${reserva.num_pessoas} pessoa(s)
🎫 Voucher: ${reserva.voucher}

📍 **Ponto de Encontro:**
Cais da Praia dos Anjos
Arraial do Cabo, RJ

⏰ **Horário:**
Chegue 15 minutos antes

📞 **Dúvidas:**
(22) 99824-9911

Nos vemos em breve! 🌊☀️

--
Caleb's Tour`;

    await sendWhatsAppMessage(reserva.cliente.telefone, mensagem);

    return NextResponse.json({ success: true, message: 'Reserva confirmada e cliente notificado!' });

  } catch (error) {
    console.error('Erro ao confirmar reserva:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
