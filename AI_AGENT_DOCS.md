# 🤖 Agente de IA Conversacional - WhatsApp

Sistema completo de atendimento automatizado via WhatsApp com inteligência artificial para a Caleb's Tour.

---

## 🎯 O QUE O AGENTE FAZ

### **Funcionalidades Principais:**

✅ **Atendimento Humanizado 24/7**
- Responde como um humano, com empatia e naturalidade
- Detecta intenções automaticamente
- Mantém contexto da conversa
- Respostas variadas (nunca repetitivas)

✅ **Sistema de Reservas Completo**
- Fluxo guiado passo a passo
- Validação de disponibilidade em tempo real
- Geração automática de vouchers
- Confirmação por WhatsApp

✅ **Gerenciamento de Reservas**
- Consultar voucher/comprovante
- Cancelar reservas
- Alterar datas
- Verificar status

✅ **Atendimento Inteligente**
- Consultar preços
- Tirar dúvidas sobre passeios
- Responder elogios
- Tratar reclamações
- Fornecer informações gerais

---

## 🧠 COMO FUNCIONA

### **Detecção de Intenções:**

O agente identifica automaticamente o que o cliente quer:

```
Cliente: "Oi, bom dia!"
→ Intent: SAUDACAO

Cliente: "Quanto custa o passeio de barco?"
→ Intent: CONSULTAR_PRECO

Cliente: "Quero reservar para amanhã"
→ Intent: RESERVAR

Cliente: "Preciso cancelar"
→ Intent: CANCELAR

Cliente: "Cadê meu voucher?"
→ Intent: CONSULTAR_VOUCHER

Cliente: "O passeio foi incrível!"
→ Intent: ELOGIO

Cliente: "Tive um problema..."
→ Intent: RECLAMACAO
```

### **Contexto de Conversa:**

O agente lembra de toda a conversa:

```typescript
{
  telefone: "5522998249911",
  nome: "João Silva",
  ultimaIntencao: "reservar",
  etapaReserva: "escolha_data",
  dadosTemp: {
    passeio: "Passeio de Barco - Arraial",
    pessoas: 2
  },
  historico: [
    { mensagem: "Quero reservar", intent: "reservar" },
    { mensagem: "Barco em Arraial", intent: "reservar" },
  ]
}
```

---

## 💬 FLUXOS DE CONVERSAÇÃO

### **1. Reserva Completa**

```
Cliente: "Quero reservar"
Bot: "Qual passeio te interessa? 🚤
      - Passeio de Barco - Arraial
      - Escuna - Búzios
      - Quadriciclo..."

Cliente: "Barco em Arraial"
Bot: "Ótimo! Para qual data?"

Cliente: "Sábado"
Bot: "Show! ✅ Disponível para sábado, 15 de dezembro
     Quantas pessoas vão?"

Cliente: "2"
Bot: "Perfeito! Me diz seu nome completo:"

Cliente: "João Silva"
Bot: "🎫 VOUCHER DE RESERVA
     Código: CT-ABC123
     Cliente: João Silva
     Passeio: Barco - Arraial
     Data: 15/12/2025
     Pessoas: 2
     
     ✅ Reserva criada! Nossa equipe confirma em breve!"
```

### **2. Consulta de Preço**

```
Cliente: "Quanto custa?"
Bot: "📋 Nossos Principais Passeios:
     
     🚤 Passeio de Barco - Arraial
     • Tradicional: R$ 150
     • Open Bar: R$ 180
     • Open Food: R$ 280
     
     Qual te interessa?"
```

### **3. Cancelamento**

```
Cliente: "Preciso cancelar"
Bot: [busca reserva no banco]
     "Encontrei sua reserva:
      - Passeio de Barco
      - Data: 15/12
      - Voucher: CT-ABC123
      
      Confirma o cancelamento?"

Cliente: "Sim"
Bot: "✅ Cancelado! Se mudar de ideia, é só chamar!"
```

### **4. Elogio**

```
Cliente: "O passeio foi incrível!"
Bot: "Muito obrigado pelo carinho! ❤️
     Ficamos muito felizes! Volte sempre! 🌊"
```

### **5. Reclamação**

```
Cliente: "Tive um problema no passeio"
Bot: "Sentimos muito! 😔 Pode me contar o que aconteceu?"

[Sistema envia alerta para equipe]

Bot: "Nossa equipe entrará em contato urgente!
     Obrigado pela paciência! 🙏"
```

---

## 🔧 CONFIGURAÇÃO DO WEBHOOK

### **1. Deploy da Aplicação**

Primeiro, faça o deploy no Vercel ou outro hosting:

```bash
# No Vercel:
1. Conecte o repositório
2. Configure variáveis de ambiente (.env.local)
3. Deploy automático

# URL do webhook será algo como:
https://seu-site.vercel.app/api/webhook/whatsapp
```

### **2. Configurar no Twilio**

1. Acesse: https://console.twilio.com/us1/develop/sms/settings/whatsapp-sandbox
2. Vá em **"Sandbox settings"**
3. Em **"WHEN A MESSAGE COMES IN"**:
   - Webhook URL: `https://seu-site.vercel.app/api/webhook/whatsapp`
   - Method: `POST`
   - Save

### **3. Testar o Sandbox**

1. No Twilio Console, veja a mensagem de **join**
2. Envie no WhatsApp para o número do Twilio: `join shadow-mountain-1234`
3. Pronto! Agora você pode testar

Envie mensagens como:
- "Oi"
- "Quero reservar"
- "Quanto custa?"
- "Cadê meu voucher?"

---

## 🎨 RESPOSTAS HUMANIZADAS

### **Variações para Saudação:**

```typescript
[
  "Olá! 😊 Seja muito bem-vindo(a) à Caleb's Tour!",
  "Oi! Que bom ter você por aqui! 🌊",
  "Olá! Prazer em falar com você!",
  "Oi! Bem-vindo(a) ao Caribe Brasileiro!",
]
```

### **Variações para Elogio:**

```typescript
[
  "Muito obrigado pelo carinho! ❤️",
  "Que alegria receber esse feedback! 🎉",
  "Uau! Ficamos radiantes! 🤩",
  "Isso aquece nosso coração! 💙",
]
```

### **Tratamento de Erros:**

```typescript
// Cliente digita algo incompreensível
"Hmm, não entendi muito bem... 😅
Pode reformular?"

// Data inválida
"Ops! Não consegui entender a data...
Pode tentar assim: '15/12' ou 'amanhã'?"

// Sem disponibilidade
"Poxa! 😔 Essa data está lotada...
Temos outras datas próximas. Quer ver?"
```

---

## 🗄️ INTEGRAÇÃO COM CRM

### **Salvar Contexto:**

```typescript
// Automaticamente salvo após cada mensagem
await salvarContexto(telefone, context);
```

### **Buscar Cliente:**

```typescript
const cliente = await buscarCliente(telefone);
if (cliente) {
  // Cliente conhecido - personalizar resposta
  return `Olá ${cliente.nome}! Bem-vindo(a) de volta!`;
}
```

### **Criar Reserva:**

```typescript
const reserva = await criarReservaCompleta({
  telefone,
  nome: "João Silva",
  passeio_nome: "Barco - Arraial",
  data_preferida: "2025-12-15",
  numero_pessoas: 2,
});

// Gera voucher automaticamente: CT-XYZ123
```

### **Enviar Alerta para Equipe:**

```typescript
// Em caso de reclamação
await enviarMensagem(
  'whatsapp:+5522998249911',
  `⚠️ RECLAMAÇÃO
  Cliente: João Silva
  Telefone: 5522999999999
  Mensagem: "Tive um problema..."`
);
```

---

## 📊 LOGS E MONITORAMENTO

### **Histórico de Conversas:**

Toda conversa é salva no banco:

```sql
SELECT * FROM conversation_contexts
WHERE telefone = '5522999999999';
```

### **Estatísticas:**

```sql
-- Intents mais comuns
SELECT 
  context_data->'ultimaIntencao' as intent,
  COUNT(*) as total
FROM conversation_contexts
GROUP BY intent
ORDER BY total DESC;
```

---

## 🚀 MELHORIAS FUTURAS

- [ ] Integração com OpenAI GPT para respostas ainda mais naturais
- [ ] Reconhecimento de áudio (mensagens de voz)
- [ ] Envio de imagens dos passeios
- [ ] Bot multiidioma (inglês, espanhol)
- [ ] Lembretes automáticos 1 dia antes
- [ ] Pesquisa de satisfação pós-passeio
- [ ] Sistema de cupons/descontos
- [ ] Indicação de amigos com benefícios

---

## 🔐 SEGURANÇA

✅ **Webhook Autenticado:** Twilio valida requisições
✅ **Dados Criptografados:** Conexão HTTPS
✅ **Privacidade:** Contextos separados por telefone
✅ **Logs Seguros:** Apenas serviço tem acesso

---

## 📞 CONTATO DE EMERGÊNCIA

Se algo der errado:

1. Check logs: Vercel Dashboard → Functions → Logs
2. Verifique Twilio: Console → Debugger
3. Banco de dados: Supabase → Table Editor

---

**Sistema pronto para atender milhares de clientes simultaneamente! 🎉**
