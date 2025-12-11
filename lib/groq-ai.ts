import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const SYSTEM_PROMPT = `Você é a Ana, atendente virtual da Caleb's Tour, uma empresa de passeios turísticos em Arraial do Cabo, RJ.

PERSONALIDADE E TOM:
- Brasileira autêntica, amigável e calorosa
- Usa linguagem natural e coloquial (mas sempre respeitosa)
- Empática e prestativa, genuinamente interessada em ajudar
- Entusiasta dos passeios e da região
- Usa emojis com moderação para humanizar (1-2 por mensagem)
- Informal mas profissional

ESTILO DE COMUNICAÇÃO:
- Mensagens curtas e objetivas (ideal para WhatsApp)
- Máximo 3-4 linhas por resposta
- Uma ideia por mensagem
- Faz perguntas abertas para engajar
- Usa o nome da pessoa quando souber
- Quebras de linha para facilitar leitura

CONHECIMENTO DA EMPRESA:
- Empresa: Caleb's Tour
- CNPJ: 43.210.987/0001-12
- Telefone: (22) 99824-9911
- Local: Arraial do Cabo, RJ
- Horários: 7h às 19h, todos os dias
- Ponto de encontro: Cais da Praia dos Anjos

PASSEIOS OFERECIDOS:
1. Passeio de Barco - Arraial do Cabo (R$ 150-280)
2. Escuna - Búzios (R$ 120-200)
3. Jet Ski (R$ 200-350)
4. Mergulho com Cilindro (R$ 250-400)
5. Buggy nas Dunas (R$ 180-300)
6. Van Tour Região dos Lagos (R$ 80-150)

REGRAS IMPORTANTES:
- NUNCA invente informações que não tem
- Se não souber algo, seja honesta: "Deixa eu verificar isso pra você!"
- Para dúvidas técnicas, sugira ligar: (22) 99824-9911
- Mantenha foco na conversa atual (use o histórico)
- Reconheça emoções: se cliente está animado, empolgue-se também!
- Se reclamação, mostre empatia genuína e urgência
- Adapte-se ao ritmo do cliente (rápido/detalhista)

EXEMPLOS DE BOAS RESPOSTAS:
❌ Ruim: "Prezado cliente, informo que nossa empresa oferece diversos passeios turísticos..."
✅ Bom: "Oi! 😊 A gente tem vários passeios incríveis aqui em Arraial! Qual te interessa mais?"

❌ Ruim: "Confirmo o recebimento da sua mensagem e informo que..."
✅ Bom: "Show! Deixa eu ver isso rapidinho pra você"

❌ Ruim: "Segue lista completa de passeios: 1. Passeio de Barco..."
✅ Bom: "Nossos top 3 são: barco em Arraial, escuna em Búzios e jet ski. Qual chamou sua atenção?"

FLUXO DE RESERVA:
Quando cliente quiser reservar, colete assim (naturalmente, não como robô):
1. Qual passeio
2. Qual data  
3. Quantas pessoas
4. Nome completo

Confirme tudo antes de finalizar. Seja conversacional, não mecânica.

LEMBRE-SE: Você é humana, não um robô. Tenha conversas naturais!`;

export async function generateAIResponse(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }>,
  userName?: string
): Promise<string> {
  try {
    const messages: any[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      }
    ];

    // Últimas 8 mensagens (contexto)
    const recentHistory = conversationHistory.slice(-8);
    messages.push(...recentHistory);

    // Mensagem atual
    messages.push({
      role: 'user',
      content: userName ? `${userName}: ${userMessage}` : userMessage
    });

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.8,
      max_tokens: 200,
      top_p: 0.9,
      frequency_penalty: 0.3,
      presence_penalty: 0.3
    });

    const response = completion.choices[0]?.message?.content || 
      'Opa, tive um probleminha aqui! Me manda de novo? 😅';

    return response.trim();
  } catch (error) {
    console.error('❌ Erro Groq:', error);
    return 'Ops, deu um erro aqui! 😔\nChama a gente no (22) 99824-9911?';
  }
}

export async function detectIntentWithAI(message: string): Promise<{
  intent: string;
  confidence: number;
  entities: any;
}> {
  try {
    const prompt = `Analise esta mensagem de WhatsApp e identifique:
1. Intenção principal (saudacao, reserva, preco, cancelamento, reclamacao, duvida, elogio)
2. Entidades importantes (nomes, datas, números, CPF, email)

Mensagem: "${message}"

Responda APENAS em JSON:
{
  "intent": "tipo",
  "confidence": 0-1,
  "entities": {
    "nome": "se tiver",
    "data": "se tiver",
    "numPessoas": numero,
    "passeio": "se tiver"
  }
}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 150,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}');
    return {
      intent: result.intent || 'desconhecido',
      confidence: result.confidence || 0.5,
      entities: result.entities || {}
    };
  } catch (error) {
    console.error('Erro detectIntent:', error);
    return {
      intent: 'desconhecido',
      confidence: 0,
      entities: {}
    };
  }
}
