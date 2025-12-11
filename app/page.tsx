'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

const tours = [
  {
    id: 'barco-arraial',
    title: 'Passeio de Barco - Arraial',
    image: '/WhatsApp-Image-2025-12-10-at-01.43.40-(1).jpeg',
    description: 'O clássico Caribe Brasileiro. Água liberada e roteiro completo por 3h30 a 4h.',
    tiers: [
      { name: 'Tradicional', price: 'R$ 150', detail: 'Frutas + Água' },
      { name: 'Open Bar', price: 'R$ 180', detail: 'Água, Refri, Caipirinha' },
      { name: 'Open Food', price: 'R$ 280', detail: 'Tudo + Churrasco' },
    ],
    features: ['Ilha do Farol, Prainhas, Gruta Azul', 'Embarcação com toboágua e banheiro', 'Check-in 10:30 | Saída 11:00'],
    childPolicy: '0-4 anos: Grátis | 5-7 anos: Meia',
    whatsappMessage: 'Olá! Quero agendar o Passeio de Barco em Arraial!'
  },
  {
    id: 'barco-buzios',
    title: 'Escuna - Búzios',
    image: '/lancha-privada.jpg',
    description: 'Visite 12 praias e 3 ilhas na charmosa Armação dos Búzios.',
    price: 'Consulte',
    features: ['João Fernandes, Azeda, Tartaruga', 'Paradas para mergulho', 'Duração: 2h30'],
    childPolicy: '0-4 anos: Grátis',
    whatsappMessage: 'Olá! Quero saber sobre a Escuna em Búzios!'
  },
  {
    id: 'barco-cabofrio',
    title: 'Passeio de Barco - Cabo Frio',
    image: '/WhatsApp-Image-2025-12-10-at-01.16.19.jpeg',
    description: 'Explore a história e as águas cristalinas de Cabo Frio.',
    price: 'Consulte',
    features: ['Ilha do Japonês, Forte São Mateus', 'Ilha dos Papagaios (Mergulho)', 'Duração: 2h30 a 3h'],
    childPolicy: '0-4 anos: Grátis',
    whatsappMessage: 'Olá! Quero saber sobre o Barco em Cabo Frio!'
  },
  {
    id: 'quadriciclo',
    title: 'Quadriciclo',
    image: '/quadriciclo-dunas.jpg',
    description: 'Adrenalina nas dunas e lagoas. Fotos e vídeos GoPro inclusos!',
    price: 'Consulte',
    features: ['Roteiro: Lagoa Vermelha, Praia Grande', 'Duração: 2h30 com guia', 'CNH B obrigatória para piloto'],
    whatsappMessage: 'Olá! Quero agendar o Quadriciclo!'
  },
  {
    id: 'buggy',
    title: 'Passeio de Buggy',
    image: '/buggy-dunas.jpg',
    description: 'Passeio panorâmico com paradas para banho e fotos.',
    price: 'Consulte',
    features: ['Prainha, Praia do Pontal, Lagoa', 'Pôr do sol na Praia Grande', 'Duração: 2h'],
    whatsappMessage: 'Olá! Quero reservar o Passeio de Buggy!'
  },
  {
    id: 'mergulho',
    title: 'Mergulho de Batismo',
    image: '/mergulho-arraial.jpg',
    description: 'Experiência subaquática segura. Não precisa saber nadar!',
    price: 'Consulte',
    features: ['Instrutor exclusivo', 'Fotos subaquáticas inclusas', 'Idade mínima: 10 anos'],
    childPolicy: 'Integral para todas as idades',
    whatsappMessage: 'Olá! Quero agendar o Mergulho!'
  },
  {
    id: 'jet-ski',
    title: 'Jet Ski',
    image: '/WhatsApp-Image-2025-12-10-at-01.34.08.jpeg',
    description: 'Velocidade e liberdade nas águas turquesas.',
    price: 'Consulte',
    features: ['Equipamentos novos', 'Colete e instrutor incluso', 'Roteiro pelo Canal Itajuru'],
    whatsappMessage: 'Olá! Quero saber sobre o Jet Ski!'
  },
  {
    id: 'rio-de-janeiro',
    title: 'City Tour Rio',
    image: '/rio-city-tour.jpg',
    description: 'Conheça a Cidade Maravilhosa: Cristo Redentor e Pão de Açúcar.',
    price: 'Consulte',
    features: ['Cristo Redentor', 'Transporte executivo', 'Guia credenciado'],
    childPolicy: '0-6 anos: Grátis',
    whatsappMessage: 'Olá! Quero saber sobre o Tour Rio de Janeiro!'
  },
  {
    id: 'lancha',
    title: 'Lancha Privada',
    image: '/lancha-privada.jpg',
    description: 'Exclusividade e conforto para seu grupo fechado.',
    price: 'Sob consulta',
    features: ['Roteiro personalizado', 'Privacidade total', 'Ideal para grupos e eventos'],
    whatsappMessage: 'Olá! Quero saber sobre a Lancha Privada!'
  },
];

const moreServices = [
  { name: 'Catamarã / Black Diamond', desc: 'Embarcações festivas e diferenciadas' },
  { name: 'UTV 4x4', desc: 'Veículo potente para trilhas' },
  { name: 'Jeep Tour', desc: 'Passeio 4x4 coletivo ou privado' },
  { name: 'Canoa Havaiana', desc: 'Experiência de remo em equipe' },
  { name: 'Caiaque Transparente', desc: 'Fotos incríveis com fundo visível' },
  { name: 'Aula de Surf', desc: 'Para iniciantes nas praias da região' },
  { name: 'Voo de Paramotor', desc: 'Vista aérea panorâmica' },
  { name: 'Hospedagem', desc: 'Casas e pousadas parceiras' },
];

const meetingPoints = [
  {
    location: 'Arraial do Cabo',
    address: 'Marina dos Pescadores - Cais da Praia dos Anjos',
    services: ['Passeio de Barco', 'Mergulho de Batismo'],
    checkIn: '10:30',
    departure: '11:00',
    notes: 'Taxa de embarque R$10 (dinheiro). Isentos: crianças até 5 anos e idosos 60+.',
    mapLink: 'https://www.google.com/maps/place/Marina+dos+Pescadores+-+Cais+da+Praia+dos+Anjos'
  },
  {
    location: 'Búzios',
    address: 'Orla Bardot - Praia da Armação',
    services: ['Escuna Búzios'],
    checkIn: '10:00',
    departure: '10:30',
    notes: 'Embarque próximo à estátua de Brigitte Bardot.',
    mapLink: 'https://www.google.com/maps/place/Orla+Bardot,+Armação+dos+Búzios'
  },
  {
    location: 'Cabo Frio',
    address: 'Canal Itajuru - Próx. Ponte Feliciano Sodré',
    services: ['Barco Cabo Frio', 'Jet Ski', 'Quadriciclo', 'Buggy'],
    checkIn: 'Variável',
    departure: 'Variável',
    notes: 'Transfer disponível: R$15 ida ou R$15 volta (apenas bairros de Cabo Frio).',
    mapLink: 'https://www.google.com/maps/place/Ponte+Feliciano+Sodré,+Cabo+Frio'
  },
];

const testimonials = [
  { name: 'Ana Silva', city: 'São Paulo', image: '/avatar_1.png', text: 'Experiência incrível! Equipe super animada e atenciosa.' },
  { name: 'Carlos Santos', city: 'Belo Horizonte', image: '/avatar_2.png', text: 'Transfer pontual e motorista educado. Recomendo!' },
  { name: 'Mariana Costa', city: 'Curitiba', image: '/avatar_3.png', text: 'Mergulho de batismo foi mágico. Fotos lindas!' },
  { name: 'Fernanda Rocha', city: 'Rio de Janeiro', image: '/avatar_4.png', text: 'Buggy nas dunas é imperdível. Muita emoção!' },
  { name: 'Lucas Pereira', city: 'Brasília', image: '/avatar_5.png', text: 'Atendimento nota 1000 pelo WhatsApp.' },
  { name: 'Juliana Lima', city: 'Salvador', image: '/avatar_6.png', text: 'Open bar no barco! Caipirinha deliciosa.' },
  { name: 'Rafael Souza', city: 'Porto Alegre', image: '/avatar_7.png', text: 'Jet Ski sensacional. Equipamentos novos!' },
  { name: 'Beatriz Alves', city: 'Goiânia', image: '/avatar_8.png', text: 'Organização impecável. Check-in rápido.' },
  { name: 'Gabriel Ferreira', city: 'Vitória', image: '/avatar_9.png', text: 'O Caribe Brasileiro realmente existe!' },
  { name: 'Carla Dias', city: 'Florianópolis', image: '/avatar_10.png', text: 'Melhor dia das férias. Obrigada Caleb\'s!' },
];

const galleryImages = [
  '/WhatsApp-Image-2025-12-10-at-01.43.40-(1).jpeg',
  '/WhatsApp-Image-2025-12-10-at-01.43.40.jpeg',
  '/WhatsApp-Image-2025-12-10-at-01.34.08.jpeg',
  '/WhatsApp-Image-2025-12-10-at-01.16.19.jpeg',
  '/WhatsApp-Image-2025-12-10-at-01.16.22.jpeg',
  '/WhatsApp-Image-2025-12-10-at-01.18.35.jpeg',
  '/mergulho-arraial.jpg',
  '/quadriciclo-dunas.jpg',
  '/buggy-dunas.jpg',
];

const whatsappNumber = '5522998249911';
const whatsappLink = `https://wa.me/${whatsappNumber}`;

export default function Home() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, dir: 'left' | 'right') => {
    if (ref.current) ref.current.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logo-ctc.png" 
              alt="Caleb's Tour Co." 
              width={50} 
              height={50} 
              className="rounded-full ring-2 ring-white/30"
              quality={100}
              unoptimized
            />
            <span className={`font-bold text-lg hidden md:block transition-colors ${scrolled ? 'text-[#0a4d54]' : 'text-white'}`}>
              Caleb&apos;s Tour
            </span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link href="#passeios" className={`text-sm font-medium transition-colors hover:text-[#25D366] hidden md:block ${scrolled ? 'text-gray-700' : 'text-white'}`}>
              Passeios
            </Link>
            <Link href="#locais" className={`text-sm font-medium transition-colors hover:text-[#25D366] hidden md:block ${scrolled ? 'text-gray-700' : 'text-white'}`}>
              Locais
            </Link>
            <Link href="#depoimentos" className={`text-sm font-medium transition-colors hover:text-[#25D366] hidden md:block ${scrolled ? 'text-gray-700' : 'text-white'}`}>
              Depoimentos
            </Link>
            <Link 
              href={whatsappLink}
              target="_blank"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-sm py-2.5 px-5 rounded-full transition-all hover:scale-105"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Reservar
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70"></div>
        
        <div className="relative z-10 text-center px-4">
          <div className="mb-8 animate-[fadeIn_1s_ease-out]">
            <div className="relative inline-block">
              <div className="absolute -inset-3 bg-gradient-to-br from-cyan-400/30 to-teal-500/30 rounded-full blur-2xl"></div>
              <Image 
                src="/logo-ctc.png" 
                alt="Caleb's Tour Co." 
                width={220} 
                height={220} 
                className="relative mx-auto rounded-full ring-4 ring-white/20 shadow-2xl hover:scale-105 transition-transform duration-500"
                priority
                quality={100}
                unoptimized
              />
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide mb-10 animate-[fadeIn_1.5s_ease-out]">
            O Caribe Brasileiro começa aqui
          </p>
          
          <Link 
            href={whatsappLink}
            target="_blank"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-lg py-4 px-10 rounded-full transition-all hover:scale-105 shadow-2xl animate-[fadeIn_2s_ease-out]"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            AGENDAR PASSEIO
          </Link>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </section>

      <div className="bg-[#0a4d54] text-white py-4 px-4 text-center text-sm font-medium">
        <span className="inline-flex items-center gap-2 flex-wrap justify-center">
          ⚠️ Passeio Barco Arraial: Check-in 10:30 | Saída 11:00 | Taxa R$10 (dinheiro) | Proibido cooler
        </span>
      </div>

      <section id="passeios" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#25D366] font-bold text-sm uppercase tracking-widest">Experiências</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0a4d54] mt-2">NOSSOS PASSEIOS</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">Escolha como quer viver o paraíso</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div key={tour.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image src={tour.image} alt={tour.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{tour.title}</h3>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-gray-600 mb-4 text-sm">{tour.description}</p>
                  
                  {tour.tiers ? (
                    <div className="mb-4 space-y-2 bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-xl text-sm border border-cyan-100">
                      {tour.tiers.map((t, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="font-medium text-[#0a4d54]">{t.name}</span>
                          <span className="text-[#25D366] font-bold">{t.price}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mb-4 bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-xl text-center border border-cyan-100">
                      <span className="text-[#0a4d54] font-bold text-lg">{tour.price}</span>
                    </div>
                  )}

                  <ul className="space-y-2 text-sm text-gray-600 flex-1 mb-4">
                    {tour.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#25D366] font-bold">✓</span> {f}
                      </li>
                    ))}
                  </ul>

                  {tour.childPolicy && (
                    <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800 flex items-center gap-2">
                      <span>👶</span>
                      <span>{tour.childPolicy}</span>
                    </div>
                  )}

                  <Link 
                    href={`${whatsappLink}?text=${encodeURIComponent(tour.whatsappMessage)}`}
                    target="_blank"
                    className="w-full bg-[#0a4d54] hover:bg-[#073538] text-white font-bold py-3 rounded-xl text-center transition-all group-hover:scale-[1.02]"
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-[#0a4d54] mb-6 text-center">Mais Serviços</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moreServices.map((service, i) => (
                <Link 
                  key={i}
                  href={`${whatsappLink}?text=${encodeURIComponent(`Olá! Quero saber sobre ${service.name}`)}`}
                  target="_blank"
                  className="bg-gray-50 hover:bg-[#0a4d54] hover:text-white p-4 rounded-xl text-center transition-all group border border-gray-100"
                >
                  <p className="font-bold text-sm group-hover:text-white text-[#0a4d54]">{service.name}</p>
                  <p className="text-xs text-gray-500 group-hover:text-cyan-200 mt-1">{service.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="locais" className="py-24 px-4 bg-[#0a4d54] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-300 font-bold text-sm uppercase tracking-widest">Onde Encontrar</span>
            <h2 className="text-4xl md:text-5xl font-black mt-2">PONTOS DE ENCONTRO</h2>
            <p className="text-cyan-200 mt-4 max-w-xl mx-auto">Saiba onde embarcar em cada experiência</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {meetingPoints.map((point, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold">{point.location}</h3>
                </div>
                
                <p className="text-cyan-200 text-sm mb-4">{point.address}</p>
                
                <div className="mb-4">
                  <p className="text-xs text-cyan-300 uppercase font-bold mb-2">Serviços neste local:</p>
                  <div className="flex flex-wrap gap-1">
                    {point.services.map((s, j) => (
                      <span key={j} className="bg-white/20 px-2 py-1 rounded text-xs">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3 mb-4 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-cyan-300">Check-in:</span>
                    <span className="font-bold">{point.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300">Saída:</span>
                    <span className="font-bold">{point.departure}</span>
                  </div>
                </div>

                <p className="text-xs text-cyan-200 mb-4">⚠️ {point.notes}</p>

                <Link 
                  href={point.mapLink}
                  target="_blank"
                  className="w-full inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white hover:text-[#0a4d54] text-white font-bold py-2 px-4 rounded-full text-sm transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                  Ver no Mapa
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-10 flex justify-between items-end">
          <div>
            <span className="text-[#25D366] font-bold text-sm uppercase tracking-widest">Momentos</span>
            <h2 className="text-4xl font-black text-[#0a4d54] mt-2">GALERIA</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll(galleryRef, 'left')} className="p-3 rounded-full bg-white shadow-md border hover:bg-gray-100 transition">
              <svg className="w-5 h-5 text-[#0a4d54]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={() => scroll(galleryRef, 'right')} className="p-3 rounded-full bg-white shadow-md border hover:bg-gray-100 transition">
              <svg className="w-5 h-5 text-[#0a4d54]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
        
        <div ref={galleryRef} className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {galleryImages.map((img, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[400px] h-[280px] relative rounded-2xl overflow-hidden shadow-lg snap-start flex-shrink-0 group">
              <Image src={img} alt={`Galeria ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      <section id="depoimentos" className="py-24 bg-[#0a4d54] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-10 flex justify-between items-end">
          <div>
            <span className="text-cyan-300 font-bold text-sm uppercase tracking-widest">Avaliações</span>
            <h2 className="text-4xl font-black mt-2">DEPOIMENTOS</h2>
            <p className="text-cyan-200 text-sm mt-1">+500 avaliações 5 estrelas</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll(testimonialRef, 'left')} className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={() => scroll(testimonialRef, 'right')} className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
        
        <div ref={testimonialRef} className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-[300px] bg-white/10 backdrop-blur p-6 rounded-2xl snap-start flex-shrink-0 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Image src={t.image} alt={t.name} width={50} height={50} className="rounded-full border-2 border-[#25D366]" />
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-cyan-200">{t.city}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <p className="text-sm text-cyan-50 italic">&quot;{t.text}&quot;</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#25D366] font-bold text-sm uppercase tracking-widest">Sobre Nós</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0a4d54] mt-2">CALEB&apos;S TOUR</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image 
                src="/logo-ctc.png" 
                alt="Caleb's Tour Co." 
                width={300} 
                height={300} 
                className="mx-auto rounded-full shadow-2xl"
                quality={100}
                unoptimized
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#0a4d54] mb-4">O Caribe Brasileiro é aqui!</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                A <strong>Caleb&apos;s Tour Company (CTC)</strong> é referência em turismo na Região dos Lagos do Rio de Janeiro. 
                Oferecemos experiências inesquecíveis em Arraial do Cabo, Búzios e Cabo Frio, conectando você às águas mais cristalinas do Brasil.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Nossa equipe é apaixonada por proporcionar momentos únicos: desde o clássico passeio de barco pelo Caribe Brasileiro, 
                até aventuras de quadriciclo nas dunas, mergulhos inesquecíveis e muito mais.
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Razão Social</p>
                    <p className="font-bold text-[#0a4d54]">Caleb&apos;s Tour Company</p>
                  </div>
                  <div>
                    <p className="text-gray-500">CNPJ</p>
                    <p className="font-bold text-[#0a4d54]">26.096.072/0001-78</p>
                  </div>
                  <div>
                    <p className="text-gray-500">WhatsApp</p>
                    <p className="font-bold text-[#0a4d54]">(22) 99824-9911</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Instagram</p>
                    <p className="font-bold text-[#0a4d54]">@calebstour</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-500 text-sm">Endereço</p>
                  <p className="font-medium text-[#0a4d54]">Travessa Beija-Flor, Jacaré - Cabo Frio, RJ</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link 
                  href={whatsappLink}
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-3 px-6 rounded-full transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Fale Conosco
                </Link>
                <Link 
                  href="https://instagram.com/calebstour"
                  target="_blank"
                  className="inline-flex items-center gap-2 border-2 border-[#0a4d54] text-[#0a4d54] hover:bg-[#0a4d54] hover:text-white font-bold py-3 px-6 rounded-full transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#052e32] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <Image src="/logo-ctc.png" alt="Logo" width={60} height={60} className="rounded-full" quality={100} unoptimized />
              <div>
                <p className="font-bold text-lg">Caleb&apos;s Tour Company</p>
                <p className="text-sm text-cyan-400">O Caribe Brasileiro é aqui!</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href={whatsappLink} target="_blank" className="w-10 h-10 bg-white/10 hover:bg-[#25D366] rounded-full flex items-center justify-center transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </Link>
              <Link href="https://instagram.com/calebstour" target="_blank" className="w-10 h-10 bg-white/10 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </Link>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>
              <p>CNPJ: 26.096.072/0001-78</p>
              <p>Travessa Beija-Flor, Jacaré - Cabo Frio, RJ</p>
            </div>
            <p>© 2025 Caleb&apos;s Tour Company. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <Link 
        href={whatsappLink}
        target="_blank"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1da851] text-white p-4 rounded-full shadow-2xl z-50 transition-all hover:scale-110"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </Link>
    </main>
  );
}
