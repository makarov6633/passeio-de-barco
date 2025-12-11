# 🚀 Caleb's Tour - Sistema CRM Integrado

Sistema completo de gerenciamento de reservas com **Twilio WhatsApp** + **Supabase**.

---

## ✅ O QUE FOI IMPLEMENTADO

### 1. **Banco de Dados (Supabase)**
- ✅ Tabela `clientes` - cadastro de clientes
- ✅ Tabela `reservas` - todas as reservas
- ✅ Tabela `passeios` - catálogo de passeios
- ✅ Triggers automáticos (atualização de contadores)
- ✅ Índices para performance
- ✅ Row Level Security (RLS)

### 2. **Integração WhatsApp (Twilio)**
- ✅ Notificação automática para cliente após reserva
- ✅ Notificação para empresa sobre nova reserva
- ✅ Confirmação automática via WhatsApp quando admin confirma
- ✅ Mensagens formatadas profissionalmente

### 3. **Frontend**
- ✅ Modal de reserva integrado no site
- ✅ Formulário completo com validação
- ✅ Feedback visual de sucesso/erro
- ✅ Design responsivo

### 4. **Backend (API Routes)**
- ✅ `/api/reservas/create` - Criar nova reserva
- ✅ `/api/reservas/confirm` - Confirmar reserva
- ✅ `/api/reservas/list` - Listar reservas (com filtros)

### 5. **Dashboard Admin**
- ✅ Painel protegido por senha
- ✅ Estatísticas em tempo real
- ✅ Filtros por status
- ✅ Botão para confirmar reservas
- ✅ Visualização completa dos dados

---

## 🔧 SETUP - PASSO A PASSO

### **1. Criar Projeto no Supabase**

1. Acesse: https://supabase.com
2. Clique em **"New Project"**
3. Preencha:
   - Nome: `caleb-tour-crm`
   - Senha do banco: (crie uma senha segura)
   - Região: `South America (São Paulo)`
4. Aguarde 2 minutos até o projeto estar pronto

### **2. Executar SQL de Setup**

1. No painel do Supabase, vá em **SQL Editor** (menu lateral)
2. Clique em **"New Query"**
3. Copie TODO o conteúdo do arquivo `SUPABASE_SETUP.sql`
4. Cole no editor e clique em **"Run"**
5. Deve aparecer "Success. No rows returned"

### **3. Copiar Credenciais do Supabase**

1. No painel, vá em **Settings** → **API**
2. Copie os seguintes valores:

```
Project URL: https://xxxxxxxx.supabase.co
anon/public key: eyJhbGc...
service_role key: eyJhbGc... (⚠️ CLICAR EM "REVEAL" PARA VER)
```

### **4. Atualizar Arquivo .env.local**

Abra o arquivo `.env.local` e substitua:

```bash
# Supabase Credentials (SUBSTITUA AQUI)
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**As credenciais do Twilio já estão configuradas!**

### **5. Testar Integração**

```bash
# Restart do servidor
npm run dev
```

1. Acesse: http://localhost:3000
2. Clique em **"Reservar"** em qualquer passeio
3. Preencha o formulário
4. Submeta

**O que deve acontecer:**
- ✅ Reserva salva no Supabase
- ✅ WhatsApp enviado para o cliente
- ✅ WhatsApp enviado para a empresa (22) 99824-9911

---

## 📱 TESTANDO WHATSAPP

### **Sandbox do Twilio**

Se você está usando o **Twilio Trial** (gratuito), precisa:

1. Acesse: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
2. Siga as instruções para **conectar seu WhatsApp ao Sandbox**
3. Envie a mensagem: `join <seu-codigo>` para o número do Twilio

**Exemplo:**
```
join shadow-mountain-1234
```

Depois disso, seu número estará autorizado a receber mensagens do Twilio.

### **Número de Produção (Opcional)**

Para usar em produção (sem restrições), você precisa:
- Solicitar um **WhatsApp Business Number** aprovado pelo Twilio
- Processo leva 1-3 dias úteis
- Custo: ~$1/mês + $0.005 por mensagem

---

## 🎨 USAR NO SITE

### **Adicionar Botão de Reserva**

No arquivo `app/page.tsx`, adicione o modal:

```tsx
'use client';

import { useState } from 'react';
import ReservaModal from '@/components/reserva-modal';

// ... seu código existente ...

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [passeioSelecionado, setPasseioSelecionado] = useState('');

  const abrirReserva = (nomePasseio: string) => {
    setPasseioSelecionado(nomePasseio);
    setModalOpen(true);
  };

  return (
    <>
      {/* Seu conteúdo */}
      
      {/* Adicione onde tem o botão "Reservar" */}
      <button onClick={() => abrirReserva('Passeio de Barco - Arraial')}>
        Reservar
      </button>

      {/* Modal */}
      <ReservaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        passeioNome={passeioSelecionado}
      />
    </>
  );
}
```

---

## 🔐 ACESSAR DASHBOARD ADMIN

1. Acesse: http://localhost:3000/admin
2. Senha: `caleb2025admin`

**Recursos do Dashboard:**
- 📊 Estatísticas em tempo real
- 📋 Lista de todas as reservas
- 🔍 Filtros por status
- ✅ Botão para confirmar reservas
- 📱 Envia WhatsApp automaticamente ao confirmar

---

## 🔒 SEGURANÇA

### **Credenciais já configuradas:**
- ✅ `.env.local` - **NÃO será commitado ao Git** (está no .gitignore)
- ✅ Twilio credentials - protegidas no backend
- ✅ Supabase Service Role - usado apenas em API routes (servidor)

### **Mudar senha do Admin:**

No arquivo `.env.local`:
```bash
ADMIN_PASSWORD=sua_senha_forte_aqui
```

---

## 📊 FLUXO COMPLETO

```
1. Cliente preenche formulário no site
         ↓
2. Next.js API cria reserva no Supabase
         ↓
3. Twilio envia WhatsApp para cliente: "Reserva recebida!"
         ↓
4. Twilio envia WhatsApp para empresa: "Nova reserva!"
         ↓
5. Equipe acessa /admin
         ↓
6. Clica em "Confirmar"
         ↓
7. Status muda para "confirmado"
         ↓
8. Twilio envia WhatsApp para cliente: "Reserva confirmada!"
```

---

## 🚀 PRÓXIMOS PASSOS (OPCIONAL)

- [ ] Lembretes automáticos 1 dia antes do passeio
- [ ] Exportar relatórios em Excel/CSV
- [ ] Integração com Google Calendar
- [ ] Sistema de pagamentos (Stripe/Mercado Pago)
- [ ] Painel de métricas avançado
- [ ] App mobile para equipe

---

## 🆘 SUPORTE

### **Erros Comuns:**

**1. "Failed to fetch"**
- Verifique se o servidor está rodando (`npm run dev`)
- Confirme que `.env.local` está configurado

**2. "Supabase error"**
- Verifique se executou o SQL de setup
- Confirme as credenciais no `.env.local`

**3. "Twilio error"**
- Verifique se o número do cliente está no formato correto
- Se estiver em Trial, o número precisa estar no Sandbox

---

## 📞 CONTATO

Sistema desenvolvido para **Caleb's Tour Company**  
CNPJ: 26.096.072/0001-78  
WhatsApp: (22) 99824-9911

---

**✅ SISTEMA PRONTO PARA USO!**
