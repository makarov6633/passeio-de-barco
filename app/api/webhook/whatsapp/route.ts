import { NextRequest, NextResponse } from 'next/server';
import { processMessage } from '@/lib/ai-agent';

const MessagingResponse = require('twilio').twiml.MessagingResponse;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const incomingMsg = formData.get('Body') as string;
    const fromNumber = formData.get('From') as string;

    console.log(`📩 WhatsApp de ${fromNumber}: ${incomingMsg}`);

    if (!incomingMsg || !fromNumber) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const aiResponse = await processMessage(fromNumber, incomingMsg);

    const twiml = new MessagingResponse();
    twiml.message(aiResponse);

    return new NextResponse(twiml.toString(), {
      status: 200,
      headers: { 'Content-Type': 'text/xml' },
    });

  } catch (error) {
    console.error('❌ Erro no Webhook WhatsApp:', error);
    
    const twiml = new MessagingResponse();
    twiml.message('Desculpe, tive um problema técnico. Tente novamente ou ligue para (22) 99824-9911');

    return new NextResponse(twiml.toString(), {
      status: 200,
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Webhook do WhatsApp está funcionando!',
    timestamp: new Date().toISOString()
  });
}
