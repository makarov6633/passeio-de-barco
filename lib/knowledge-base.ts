export const FAQ_GENERAL = [
  { p: "Onde fica a Caleb's Tour?", r: "Nossa base fica na Travessa Beija-Flor, Jacaré, Cabo Frio - RJ, mas nossos passeios saem principalmente do Cais da Praia dos Anjos em Arraial do Cabo." },
  { p: "Qual o CNPJ?", r: "Nosso CNPJ é 26.096.072/0001-78." },
  { p: "Quais as formas de pagamento?", r: "Aceitamos PIX, dinheiro e cartões de crédito/débito." },
  { p: "Precisa pagar antecipado?", r: "Pedimos um sinal para garantir a reserva, principalmente em alta temporada. O restante pode ser pago no embarque." },
  { p: "É seguro comprar com vocês?", r: "Totalmente! Somos uma empresa registrada (CNPJ 26.096.072/0001-78) e temos milhares de clientes atendidos. Pode conferir nosso Instagram @calebstour." },
  { p: "Criança paga?", r: "Crianças até 5 anos geralmente são isentas ou pagam taxa mínima (consulte por passeio). De 6 a 10 anos tem desconto em alguns roteiros." },
  { p: "E se chover?", r: "Se o tempo impedir a saída (marinha fechar o porto), remarcamos seu passeio ou fazemos o reembolso integral. Se for apenas chuva fraca e o mar estiver seguro, o passeio sai normalmente." },
  { p: "Tem estacionamento?", r: "Não temos estacionamento privativo no cais, mas existem vários estacionamentos pagos nas redondezas da Praia dos Anjos." },
  { p: "Posso levar bebida?", r: "Geralmente não é permitido levar cooler com bebidas, pois os barcos vendem a bordo e oferecem água liberada. Consulte regras específicas para lanchas privadas." },
  { p: "O que levar no passeio?", r: "Protetor solar, chapéu, óculos de sol, toalha, roupa de banho e dinheiro/cartão para extras." }
];

export const TOURS_INFO = {
  barco_arraial: {
    nome: "Passeio de Barco - Arraial do Cabo",
    duracao: "3h30 a 4h",
    saidas: ["09:30", "12:30"],
    embarque: "Marina dos Pescadores (Cais da Praia dos Anjos)",
    roteiro: [
      "Ilha do Farol (Desembarque 40min)",
      "Prainhas do Pontal do Atalaia (Desembarque 40min)",
      "Praia do Forno (Mergulho ao redor)",
      "Gruta Azul (Panorâmico)",
      "Fenda de Nossa Senhora (Panorâmico)",
      "Pedra do Gorila (Panorâmico)",
      "Buraco do Meteoro (Panorâmico)"
    ],
    incluso: ["Água liberada", "Guia", "Bote de apoio", "Banheiro/Som"],
    nao_incluso: ["Taxa de embarque R$ 10,00", "Almoço", "Bebidas alcoólicas"],
    faq: [
      { p: "O barco balança muito?", r: "O roteiro é bem protegido, costuma ser tranquilo. Se tem enjoo fácil, recomendamos tomar um remédio 1h antes." },
      { p: "Tem banheiro?", r: "Sim, nossas embarcações têm banheiro." },
      { p: "Pode descer na Praia do Forno?", r: "A parada é para mergulho ao redor. O desembarque na areia depende das condições e autorização no dia." }
    ]
  },
  quadriciclo: {
    nome: "Quadriciclo",
    duracao: "2h30",
    saidas: ["08:00", "10:30", "13:00", "15:30"],
    capacidade: "2 pessoas por máquina",
    roteiro: [
      "Pedreira", "Lagoa de Kite Surf", "Praia do Pontal", 
      "Prainha", "Lagoa Vermelha", "Praia do Foguete", "Dunas da Praia Grande"
    ],
    regras: ["CNH B para piloto", "Garupa min. 7 anos", "Tênis/Calçado fechado obrigatório"],
    incluso: ["Fotos e Vídeos GoPro", "Guia"],
    faq: [
      { p: "Precisa de carteira?", r: "Sim, o piloto precisa de CNH B (carro)." },
      { p: "Criança pode ir?", r: "Na garupa, a partir de 7 anos." }
    ]
  },
  mergulho: {
    nome: "Mergulho de Cilindro (Batismo)",
    duracao: "Total 2-3h (30min de fundo)",
    profundidade: "5 a 10 metros",
    regras: ["Idade mínima 10 anos", "Não precisa saber nadar"],
    incluso: ["Equipamento completo", "Instrutor exclusivo", "Fotos", "Lanche"],
    faq: [
      { p: "Preciso saber nadar?", r: "Não! O instrutor te conduz o tempo todo." },
      { p: "Tem fotos?", r: "Sim, fotos subaquáticas estão inclusas!" }
    ]
  },
  escuna_buzios: {
    nome: "Passeio de Escuna - Búzios",
    duracao: "2h30",
    roteiro: ["Praia da Armação, Ossos, Azeda", "João Fernandes", "Ilha Feia", "Tartaruga", "Virgens, Amores, Canto"],
    incluso: ["Guia", "Animação", "Coletes"]
  },
  barco_cabofrio: {
    nome: "Passeio de Barco - Cabo Frio",
    duracao: "2h30 a 3h",
    roteiro: ["Ilha do Japonês", "Forte São Mateus", "Praia do Forte", "Farol da Lajinha", "Praia Brava", "Ilha dos Papagaios"]
  },
  jet_ski: {
    nome: "Jet Ski",
    duracao: "20-30min (passeio) ou locação 1h",
    regras: ["Passageiro min. 10 anos", "Piloto min. 18 anos"],
    incluso: ["Colete", "Instrutor/Guia"]
  }
};

export const CALEB_INFO = `
SOBRE A EMPRESA:
Nome: Caleb's Tour Company (CTC)
Slogan: "O Caribe Brasileiro é aqui!"
Instagram: @calebstour
Localização: Região dos Lagos (Arraial do Cabo, Cabo Frio, Búzios)
Missão: Oferecer as melhores experiências turísticas com segurança e alegria.

DIFERENCIAIS:
- Atendimento humanizado e rápido
- Vouchers profissionais
- Diversidade de passeios (Mar, Terra e Ar)
- Milhares de clientes satisfeitos
- Fotos GoPro inclusas no Quadri
- Fotos subaquáticas inclusas no Mergulho

REGRAS GERAIS DE CANCELAMENTO:
- Chuva forte/Marinha fechou: Reagendamento ou Reembolso 100%.
- Desistência do cliente: Avisar com 24h de antecedência para reembolso (pode ter taxa administrativa). Menos de 24h geralmente perde o sinal (No-Show).

LOCAIS DE EMBARQUE:
- Arraial: Cais da Praia dos Anjos.
- Cabo Frio: Terminal de Barcos no Canal.
- Búzios: Pier da Praia da Armação.
`;

export const FALLBACK_QUESTIONS = [
  "Como chegar em Arraial?",
  "Onde comer barato?",
  "Qual a melhor praia?",
  "Tem Uber na cidade?",
  "Onde ver o pôr do sol?"
];
