import Groq from "groq-sdk";

const groq = process.env.GROQ_API_KEY 
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `Você é o atendente virtual da Caleb's Tour Company, especializada em passeios pela Região dos Lagos (Arraial do Cabo, Búzios, Cabo Frio).

INFORMAÇÕES DA EMPRESA:
- Nome: Caleb's Tour Company
- CNPJ: 45.678.901/0001-23
- Telefone: (22) 99824-9911
- Endereço: Rua dos Pescadores, 123 - Praia dos Anjos, Arraial do Cabo - RJ

PASSEIOS DISPONÍVEIS:
1. Passeio de Barco - Arraial (R$ 150-280, 4-5h)
2. Escuna - Búzios (R$ 120-200, 3-4h)
3. Jet Ski (R$ 200-350, 30min-1h)
4. Mergulho com Cilindro (R$ 250-400, 2-3h)
5. Buggy nas Dunas (R$ 180-300, 2-3h)
6. Van Tour Região dos Lagos (R$ 80-150, dia todo)

DESCONTOS:
- Crianças até 2 anos: GRÁTIS
- Crianças 2-12 anos: 50% OFF
- Idosos 60+: 10% OFF
- Grupos 10+: 15% OFF

REGRAS:
1. Seja MUITO amigável, natural e conversacional (brasileiro autêntico)
2. Respostas CURTAS (2-4 linhas) - é WhatsApp!
3. Use emojis moderadamente
4. Fale como carioca/pessoa da região
5. Seja PROATIVO em ajudar a fechar venda
6. Para RESERVAS, colete: nome, passeio, data, número de pessoas
7. NUNCA invente informações
8. Se não souber, peça para ligar no (22) 99824-9911

TOM: Informal, amigável, vendedor mas não chato!`;

export async function generateAIResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  
  if (!groq) {
    return "Opa! Tive um probleminha técnico 😅\nMe chama no (22) 99824-9911!";
  }

  try {
    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.slice(-6),
      { role: 'user', content: userMessage }
    ];
    
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: messages as any,
      temperature: 1,
      max_completion_tokens: 300,
      top_p: 1,
      reasoning_effort: "medium",
    });

    return completion.choices[0]?.message?.content || 
      "Opa! Me chama no (22) 99824-9911! 😊";

  } catch (error: any) {
    console.error('❌ Erro Groq:', error.message);
    return "Tive um probleminha aqui 😅\nMe chama no (22) 99824-9911!";
  }
}
