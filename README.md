# 🚤 Caleb's Tour - Website + CRM

Website oficial da **Caleb's Tour Company** com sistema CRM integrado para gerenciamento de reservas.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-DB-3ecf8e)
![Twilio](https://img.shields.io/badge/Twilio-WhatsApp-red)

---

## 🌊 Sobre o Projeto

Website completo para a empresa de turismo **Caleb's Tour**, especializada em passeios pela Região dos Lagos (Arraial do Cabo, Búzios, Cabo Frio).

### **Recursos Principais:**

✅ **Website Responsivo**
- Hero section com vídeo 720p
- Catálogo de 9+ passeios
- Galeria de fotos
- Depoimentos de clientes
- Seção "Sobre a Empresa"

✅ **Sistema de Reservas Online**
- Formulário integrado no site
- Validação de dados
- Feedback em tempo real

✅ **CRM Completo**
- Banco de dados Supabase
- Dashboard administrativo
- Filtros e estatísticas
- Confirmação de reservas

✅ **Automação WhatsApp (Twilio)**
- Notificação automática para cliente
- Alerta para equipe sobre nova reserva
- Confirmação final via WhatsApp

---

## 🚀 Setup Rápido

### **1. Instalar Dependências**

```bash
npm install
```

### **2. Configurar Supabase**

1. Crie projeto em [supabase.com](https://supabase.com)
2. Execute o SQL em `SUPABASE_SETUP.sql`
3. Copie as credenciais

### **3. Configurar Variáveis de Ambiente**

Copie `.env.example` para `.env.local` e preencha:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key
SUPABASE_SERVICE_ROLE_KEY=sua_service_key

# Twilio (já configurado)
TWILIO_ACCOUNT_SID=AC44bb10...
TWILIO_AUTH_TOKEN=1b0f1d98...
TWILIO_MESSAGING_SERVICE_SID=MG476072...
```

### **4. Rodar o Projeto**

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 📚 Documentação Completa

- **[CRM_SETUP.md](./CRM_SETUP.md)** - Guia completo do sistema CRM
- **[SUPABASE_SETUP.sql](./SUPABASE_SETUP.sql)** - SQL para criar banco

---

## 🎨 Estrutura do Projeto

```
passeio-de-barco/
├── app/
│   ├── page.tsx              # Página principal
│   ├── admin/page.tsx        # Dashboard admin
│   ├── layout.tsx            # Layout global
│   ├── globals.css           # Estilos globais
│   └── api/                  # API Routes
│       └── reservas/
│           ├── create/       # Criar reserva
│           ├── confirm/      # Confirmar reserva
│           └── list/         # Listar reservas
├── components/
│   ├── reserva-modal.tsx     # Modal de reserva
│   └── tour-card.tsx         # Card de passeio
├── lib/
│   ├── supabase.ts           # Cliente Supabase
│   ├── twilio.ts             # Cliente Twilio
│   └── api.ts                # Utilitários
├── public/                   # Assets (imagens, vídeos)
├── .env.local                # Variáveis de ambiente (não versionado)
├── CRM_SETUP.md              # Guia do CRM
└── SUPABASE_SETUP.sql        # Setup do banco
```

---

## 🔑 Acessos

### **Dashboard Admin**
- URL: `/admin`
- Senha: `caleb2025admin` (altere em `.env.local`)

### **Supabase Dashboard**
- URL: https://supabase.com/dashboard
- Acesso com sua conta

### **Twilio Console**
- URL: https://console.twilio.com
- Credenciais já configuradas

---

## 📱 Funcionalidades

### **Para Clientes:**
- ✅ Navegação intuitiva pelos passeios
- ✅ Formulário de reserva online
- ✅ Confirmação automática via WhatsApp
- ✅ Botão direto para WhatsApp (alternativa)

### **Para Administradores:**
- ✅ Dashboard com estatísticas
- ✅ Visualização de todas as reservas
- ✅ Filtros por status
- ✅ Confirmação com um clique
- ✅ WhatsApp automático ao confirmar

---

## 🛠️ Tecnologias

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Banco de Dados:** Supabase (PostgreSQL)
- **Comunicação:** Twilio WhatsApp API
- **Deploy:** Vercel (recomendado)

---

## 📊 Banco de Dados

### **Tabelas:**

**clientes**
- id, nome, email, telefone, whatsapp, total_reservas

**reservas**
- id, cliente_id, nome_cliente, email, telefone, whatsapp
- passeio_id, passeio_nome, data_preferida, numero_pessoas
- status, observacoes, valor_estimado

**passeios**
- id, nome, categoria, descricao, duracao, preco_base

---

## 🚀 Deploy

### **Vercel (Recomendado)**

1. Conecte o repositório no [Vercel](https://vercel.com)
2. Adicione as variáveis de ambiente
3. Deploy automático a cada push

### **Outras Opções**
- Netlify
- Railway
- AWS Amplify

---

## 📝 Próximas Melhorias

- [ ] Sistema de pagamentos online
- [ ] Integração com Google Calendar
- [ ] Lembretes automáticos por WhatsApp
- [ ] App mobile para equipe
- [ ] Relatórios em PDF/Excel
- [ ] Sistema de avaliações pós-passeio

---

## 📞 Suporte

**Caleb's Tour Company**  
CNPJ: 26.096.072/0001-78  
WhatsApp: (22) 99824-9911  
Instagram: [@calebstour](https://instagram.com/calebstour)

---

## 📄 Licença

© 2025 Caleb's Tour Company. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para o Caribe Brasileiro 🌊**
