import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const businessWhatsApp = process.env.TWILIO_BUSINESS_WHATSAPP;

export const twilioClient = twilio(accountSid, authToken);

export async function sendWhatsAppToClient(to: string, message: string) {
  try {
    const result = await twilioClient.messages.create({
      body: message,
      messagingServiceSid: messagingServiceSid,
      to: `whatsapp:+55${to.replace(/\D/g, '')}`,
    });
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('Erro ao enviar WhatsApp para cliente:', error);
    return { success: false, error };
  }
}

export async function sendWhatsAppToBusiness(message: string) {
  try {
    const result = await twilioClient.messages.create({
      body: message,
      messagingServiceSid: messagingServiceSid,
      to: businessWhatsApp!,
    });
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('Erro ao enviar WhatsApp para empresa:', error);
    return { success: false, error };
  }
}

export function formatReservaMessage(reserva: {
  nome: string;
  passeio: string;
  data: string;
  pessoas: number;
}) {
  return `🔔 *Nova Reserva!*

👤 Cliente: ${reserva.nome}
🚤 Passeio: ${reserva.passeio}
📅 Data Preferida: ${new Date(reserva.data).toLocaleDateString('pt-BR')}
👥 Pessoas: ${reserva.pessoas}

Acesse o painel admin para confirmar.`;
}

export function formatConfirmacaoCliente(reserva: {
  nome: string;
  passeio: string;
  data: string;
}) {
  return `✅ *Reserva Recebida!*

Olá ${reserva.nome}!

Sua reserva para o *${reserva.passeio}* foi recebida com sucesso.

📅 Data preferida: ${new Date(reserva.data).toLocaleDateString('pt-BR')}

Nossa equipe irá confirmar em breve via WhatsApp.

_Caleb's Tour - O Caribe Brasileiro é aqui!_`;
}

export function formatConfirmacaoFinal(reserva: {
  nome: string;
  passeio: string;
  data: string;
  horario: string;
  local: string;
}) {
  return `🎉 *Reserva Confirmada!*

Olá ${reserva.nome}!

Sua reserva está confirmada! 

🚤 *${reserva.passeio}*
📅 Data: ${new Date(reserva.data).toLocaleDateString('pt-BR')}
⏰ Check-in: ${reserva.horario}
📍 Local: ${reserva.local}

⚠️ *Importante:*
- Chegue 30 minutos antes
- Taxa de embarque R$10 (dinheiro)
- Proibido cooler

Nos vemos em breve! 🌊

_Caleb's Tour_
WhatsApp: (22) 99824-9911`;
}
