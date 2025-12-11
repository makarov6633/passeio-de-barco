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
    price: 'R$ 340 - R$ 380',
    features: ['Roteiro: Lagoa Vermelha, Praia Grande', 'Duração: 2h com guia', 'CNH obrigatória para piloto'],
    whatsappMessage: 'Olá! Quero agendar o Quadriciclo!'
  },
  {
    id: 'buggy',
    title: 'Passeio de Buggy',
    image: '/buggy-dunas.jpg',
    description: 'Passeio panorâmico com paradas para banho e fotos em todas as praias.',
    price: 'R$ 400',
    features: ['Prainha, Praia do Pontal, Lagoa Vermelha', 'Deserto da Praia Grande', 'Duração: 2h30'],
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
  { name: 'Catamarã / Black Diamond', desc: 'Embarcações festivas' },
  { name: 'UTV 4x4', desc: 'Trilhas potentes' },
  { name: 'Jeep Tour', desc: 'Passeio 4x4' },
  { name: 'Canoa Havaiana', desc: 'Remo em equipe' },
  { name: 'Caiaque Transparente', desc: 'Fotos incríveis' },
  { name: 'Aula de Surf', desc: 'Para iniciantes' },
  { name: 'Voo de Paramotor', desc: 'R$ 400 | 12-15min' },
  { name: 'Hospedagem', desc: 'Pousadas parceiras' },
];

const meetingPoints = [
  {
    location: 'Arraial do Cabo',
    address: 'Marina dos Pescadores - Praia dos Anjos',
    services: ['Passeio de Barco', 'Mergulho'],
    checkIn: '10:30',
    departure: '11:00',
    notes: 'Taxa R$10 (dinheiro). Crianças até 5 e idosos 60+: isentos.',
    mapLink: 'https://www.google.com/maps/place/Marina+dos+Pescadores+-+Cais+da+Praia+dos+Anjos'
  },
  {
    location: 'Búzios',
    address: 'Orla Bardot - Praia da Armação',
    services: ['Escuna Búzios'],
    checkIn: '10:00',
    departure: '10:30',
    notes: 'Próximo à estátua de Brigitte Bardot.',
    mapLink: 'https://www.google.com/maps/place/Orla+Bardot,+Armação+dos+Búzios'
  },
  {
    location: 'Cabo Frio',
    address: 'Canal Itajuru - Ponte Feliciano Sodré',
    services: ['Barco', 'Jet Ski', 'Quadriciclo', 'Buggy'],
    checkIn: 'Variável',
    departure: 'Variável',
    notes: 'Transfer R$15 ida ou volta (bairros Cabo Frio).',
    mapLink: 'https://www.google.com/maps/place/Ponte+Feliciano+Sodré,+Cabo+Frio'
  },
];

const testimonials = [
  { name: 'Ana Silva', city: 'São Paulo', text: 'Experiência incrível! Equipe super animada e atenciosa.' },
  { name: 'Carlos Santos', city: 'Belo Horizonte', text: 'Transfer pontual e motorista educado. Recomendo!' },
  { name: 'Mariana Costa', city: 'Curitiba', text: 'Mergulho de batismo foi mágico. Fotos lindas!' },
  { name: 'Fernanda Rocha', city: 'Rio de Janeiro', text: 'Buggy nas dunas é imperdível. Muita emoção!' },
  { name: 'Lucas Pereira', city: 'Brasília', text: 'Atendimento nota 1000 pelo WhatsApp.' },
  { name: 'Juliana Lima', city: 'Salvador', text: 'Open bar no barco! Caipirinha deliciosa.' },
  { name: 'Rafael Souza', city: 'Porto Alegre', text: 'Jet Ski sensacional. Equipamentos novos!' },
  { name: 'Beatriz Alves', city: 'Goiânia', text: 'Organização impecável. Check-in rápido.' },
  { name: 'Gabriel Ferreira', city: 'Vitória', text: 'O Caribe Brasileiro realmente existe!' },
  { name: 'Carla Dias', city: 'Florianópolis', text: 'Melhor dia das férias. Obrigada Caleb\'s!' },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, dir: 'left' | 'right') => {
    if (ref.current) ref.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  const closeMenuAndNavigate = (href: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo-ctc.png" 
              alt="Caleb's Tour" 
              width={44} 
              height={44} 
              className="rounded-full ring-2 ring-white/30"
              quality={100}
              unoptimized
            />
            <span className={`font-extrabold text-base transition-colors ${scrolled ? 'text-[#0a4d54]' : 'text-white'} hidden sm:block`}>
              Caleb&apos;s Tour
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#galeria" className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-[#25D366] ${scrolled ? 'text-gray-700' : 'text-white'}`}>
              Galeria
            </Link>
            <Link href="#passeios" className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-[#25D366] ${scrolled ? 'text-gray-700' : 'text-white'}`}>
              Passeios
            </Link>
            <Link href="#locais" className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-[#25D366] ${scrolled ? 'text-gray-700' : 'text-white'}`}>
              Locais
            </Link>
            <Link href="#depoimentos" className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-[#25D366] ${scrolled ? 'text-gray-700' : 'text-white'}`}>
              Depoimentos
            </Link>
            <Link 
              href={whatsappLink}
              target="_blank"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-extrabold text-sm py-2.5 px-5 rounded-full transition-all hover:scale-105"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              RESERVAR
            </Link>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <Link 
              href={whatsappLink}
              target="_blank"
              className="flex items-center gap-1 bg-[#25D366] hover:bg-[#1da851] text-white font-extrabold text-xs py-2 px-3 rounded-full"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-[#0a4d54]' : 'text-white'}`}
              aria-label="Menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay active" onClick={() => setMobileMenuOpen(false)} />
      )}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Image src="/logo-ctc.png" alt="Logo" width={40} height={40} className="rounded-full" unoptimized />
              <span className="font-extrabold text-[#0a4d54]">Caleb&apos;s Tour</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-500" aria-label="Fechar">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <nav className="space-y-1">
            {[
              { href: '#galeria', label: 'Galeria', icon: '📸' },
              { href: '#passeios', label: 'Passeios', icon: '🚤' },
              { href: '#locais', label: 'Locais', icon: '📍' },
              { href: '#depoimentos', label: 'Depoimentos', icon: '⭐' },
              { href: '#sobre', label: 'Sobre Nós', icon: 'ℹ️' },
            ].map((item) => (
              <button
                key={item.href}
                onClick={() => closeMenuAndNavigate(item.href)}
                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-bold text-[#0a4d54] text-lg">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <Link 
              href={whatsappLink}
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-extrabold text-lg py-4 px-6 rounded-2xl w-full"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              AGENDAR AGORA
            </Link>
            <p className="text-center text-gray-400 text-sm mt-4">(22) 99824-9911</p>
          </div>
        </div>
      </div>

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
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
        
        <div className="relative z-10 text-center px-4 max-w-xl mx-auto">
          <div className="mb-6 animate-[fadeIn_1s_ease-out]">
            <Image 
              src="/logo-ctc.png" 
              alt="Caleb's Tour Co." 
              width={160} 
              height={160} 
              className="mx-auto rounded-full ring-4 ring-white/20 shadow-2xl"
              priority
              quality={100}
              unoptimized
            />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 animate-[fadeIn_1.2s_ease-out] uppercase tracking-tight">
            O Caribe Brasileiro
          </h1>
          <p className="text-lg sm:text-xl text-white/90 font-medium mb-8 animate-[fadeIn_1.5s_ease-out]">
            começa aqui
          </p>
          
          <Link 
            href={whatsappLink}
            target="_blank"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-extrabold text-base sm:text-lg py-4 px-8 rounded-full transition-all hover:scale-105 shadow-2xl animate-[fadeIn_2s_ease-out]"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            AGENDAR PASSEIO
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </section>

      <div className="bg-[#0a4d54] text-white py-3 px-4 text-center">
        <span className="inline-flex items-center gap-2 flex-wrap justify-center text-sm font-bold">
          ⚠️ Barco Arraial: Check-in 10:30 | Saída 11:00 | Taxa R$10
        </span>
      </div>

      <section id="galeria" className="py-16 md:py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-6 flex justify-between items-center">
          <div>
            <span className="text-[#25D366] font-extrabold text-xs uppercase tracking-widest">Momentos</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#0a4d54] mt-1 uppercase">Galeria</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll(galleryRef, 'left')} className="p-2.5 rounded-full bg-white shadow-md border hover:bg-gray-100 transition touch-manipulation">
              <svg className="w-5 h-5 text-[#0a4d54]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={() => scroll(galleryRef, 'right')} className="p-2.5 rounded-full bg-white shadow-md border hover:bg-gray-100 transition touch-manipulation">
              <svg className="w-5 h-5 text-[#0a4d54]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
        
        <div ref={galleryRef} className="flex gap-3 overflow-x-auto px-4 pb-4 snap-x scrollbar-hide touch-pan-x" style={{ scrollbarWidth: 'none' }}>
          {galleryImages.map((img, i) => (
            <div key={i} className="min-w-[260px] sm:min-w-[320px] md:min-w-[400px] h-[200px] sm:h-[240px] md:h-[280px] relative rounded-2xl overflow-hidden shadow-lg snap-start flex-shrink-0 group">
              <Image src={img} alt={`Galeria ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      <section id="passeios" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#25D366] font-extrabold text-xs uppercase tracking-widest">Experiências</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#0a4d54] mt-1 uppercase">Nossos Passeios</h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">Escolha como quer viver o paraíso</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {tours.map((tour) => (
              <div key={tour.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
                <div className="relative h-44 sm:h-52 overflow-hidden">
                  <Image src={tour.image} alt={tour.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <h3 className="absolute bottom-3 left-3 right-3 text-lg sm:text-xl font-extrabold text-white leading-tight">{tour.title}</h3>
                </div>
                
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">{tour.description}</p>
                  
                  {tour.tiers ? (
                    <div className="mb-3 space-y-1.5 bg-gradient-to-br from-cyan-50 to-teal-50 p-3 rounded-xl text-sm border border-cyan-100">
                      {tour.tiers.map((t, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="font-bold text-[#0a4d54]">{t.name}</span>
                          <span className="text-[#25D366] font-extrabold">{t.price}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mb-3 bg-gradient-to-br from-cyan-50 to-teal-50 p-3 rounded-xl text-center border border-cyan-100">
                      <span className="text-[#0a4d54] font-extrabold text-lg">{tour.price}</span>
                    </div>
                  )}

                  <ul className="space-y-1.5 text-sm text-gray-600 flex-1 mb-3">
                    {tour.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#25D366] font-extrabold">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {tour.childPolicy && (
                    <div className="mb-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800 flex items-center gap-2">
                      <span>👶</span>
                      <span className="font-medium">{tour.childPolicy}</span>
                    </div>
                  )}

                  <Link 
                    href={`${whatsappLink}?text=${encodeURIComponent(tour.whatsappMessage)}`}
                    target="_blank"
                    className="w-full bg-[#0a4d54] hover:bg-[#073538] text-white font-extrabold py-3 rounded-xl text-center transition-all active:scale-95 touch-manipulation"
                  >
                    RESERVAR
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-16 bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
            <h3 className="text-xl md:text-2xl font-extrabold text-[#0a4d54] mb-6 text-center uppercase">Mais Serviços</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {moreServices.map((service, i) => (
                <Link 
                  key={i}
                  href={`${whatsappLink}?text=${encodeURIComponent(`Olá! Quero saber sobre ${service.name}`)}`}
                  target="_blank"
                  className="bg-white hover:bg-[#0a4d54] hover:text-white p-4 rounded-xl text-center transition-all group border border-gray-100 active:scale-95 touch-manipulation"
                >
                  <p className="font-extrabold text-sm group-hover:text-white text-[#0a4d54]">{service.name}</p>
                  <p className="text-xs text-gray-500 group-hover:text-cyan-200 mt-1">{service.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="locais" className="py-16 md:py-24 px-4 bg-[#0a4d54] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-cyan-300 font-extrabold text-xs uppercase tracking-widest">Onde Encontrar</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mt-1 uppercase">Pontos de Encontro</h2>
            <p className="text-cyan-200 mt-2 text-sm md:text-base">Saiba onde embarcar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {meetingPoints.map((point, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                  </div>
                  <h3 className="text-lg font-extrabold">{point.location}</h3>
                </div>
                
                <p className="text-cyan-200 text-sm mb-3">{point.address}</p>
                
                <div className="mb-3">
                  <p className="text-xs text-cyan-300 uppercase font-extrabold mb-2">Serviços:</p>
                  <div className="flex flex-wrap gap-1">
                    {point.services.map((s, j) => (
                      <span key={j} className="bg-white/20 px-2 py-1 rounded text-xs font-medium">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3 mb-3 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-cyan-300">Check-in:</span>
                    <span className="font-extrabold">{point.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300">Saída:</span>
                    <span className="font-extrabold">{point.departure}</span>
                  </div>
                </div>

                <p className="text-xs text-cyan-200 mb-4">⚠️ {point.notes}</p>

                <Link 
                  href={point.mapLink}
                  target="_blank"
                  className="w-full inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white hover:text-[#0a4d54] text-white font-extrabold py-2.5 px-4 rounded-full text-sm transition-all active:scale-95 touch-manipulation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                  VER NO MAPA
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="depoimentos" className="py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-6 flex justify-between items-center">
          <div>
            <span className="text-[#25D366] font-extrabold text-xs uppercase tracking-widest">Avaliações</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#0a4d54] mt-1 uppercase">Depoimentos</h2>
            <p className="text-gray-500 text-sm mt-1">+500 avaliações 5 estrelas</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll(testimonialRef, 'left')} className="p-2.5 rounded-full bg-white shadow-md border hover:bg-gray-100 transition touch-manipulation">
              <svg className="w-5 h-5 text-[#0a4d54]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={() => scroll(testimonialRef, 'right')} className="p-2.5 rounded-full bg-white shadow-md border hover:bg-gray-100 transition touch-manipulation">
              <svg className="w-5 h-5 text-[#0a4d54]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
        
        <div ref={testimonialRef} className="flex gap-3 overflow-x-auto px-4 pb-4 snap-x scrollbar-hide touch-pan-x" style={{ scrollbarWidth: 'none' }}>
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-[280px] sm:min-w-[300px] bg-white p-5 rounded-2xl snap-start flex-shrink-0 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0a4d54] to-[#25D366] rounded-full flex items-center justify-center text-white font-extrabold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-extrabold text-[#0a4d54]">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.city}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 italic">&quot;{t.text}&quot;</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sobre" className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#25D366] font-extrabold text-xs uppercase tracking-widest">Sobre Nós</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#0a4d54] mt-1 uppercase">Caleb&apos;s Tour</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center">
              <Image 
                src="/logo-ctc.png" 
                alt="Caleb's Tour Co." 
                width={220} 
                height={220} 
                className="rounded-full shadow-2xl"
                quality={100}
                unoptimized
              />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#0a4d54] mb-4">O Caribe Brasileiro é aqui!</h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
                A <strong>Caleb&apos;s Tour Company (CTC)</strong> é referência em turismo na Região dos Lagos do Rio de Janeiro. 
                Oferecemos experiências inesquecíveis em Arraial do Cabo, Búzios e Cabo Frio.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                Desde o clássico passeio de barco pelo Caribe Brasileiro, até aventuras de quadriciclo nas dunas e mergulhos inesquecíveis.
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Razão Social</p>
                    <p className="font-extrabold text-[#0a4d54]">Caleb&apos;s Tour Company</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">CNPJ</p>
                    <p className="font-extrabold text-[#0a4d54]">26.096.072/0001-78</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">WhatsApp</p>
                    <p className="font-extrabold text-[#0a4d54]">(22) 99824-9911</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Instagram</p>
                    <p className="font-extrabold text-[#0a4d54]">@calebstour</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-500 text-xs">Endereço</p>
                  <p className="font-bold text-[#0a4d54] text-sm">Travessa Beija-Flor, Jacaré - Cabo Frio, RJ</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link 
                  href={whatsappLink}
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-extrabold py-3 px-5 rounded-full transition-all active:scale-95 touch-manipulation text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Fale Conosco
                </Link>
                <Link 
                  href="https://instagram.com/calebstour"
                  target="_blank"
                  className="inline-flex items-center gap-2 border-2 border-[#0a4d54] text-[#0a4d54] hover:bg-[#0a4d54] hover:text-white font-extrabold py-3 px-5 rounded-full transition-all active:scale-95 touch-manipulation text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#052e32] text-white py-10 px-4 safe-bottom">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <Image src="/logo-ctc.png" alt="Logo" width={50} height={50} className="rounded-full" quality={100} unoptimized />
              <div>
                <p className="font-extrabold text-lg">Caleb&apos;s Tour Company</p>
                <p className="text-sm text-cyan-400">O Caribe Brasileiro é aqui!</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={whatsappLink} target="_blank" className="w-11 h-11 bg-white/10 hover:bg-[#25D366] rounded-full flex items-center justify-center transition-all active:scale-95 touch-manipulation">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </Link>
              <Link href="https://instagram.com/calebstour" target="_blank" className="w-11 h-11 bg-white/10 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all active:scale-95 touch-manipulation">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </Link>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="text-center md:text-left">
              <p className="font-medium">CNPJ: 26.096.072/0001-78</p>
              <p>Travessa Beija-Flor, Jacaré - Cabo Frio, RJ</p>
            </div>
            <p className="text-center">© 2025 Caleb&apos;s Tour Company</p>
          </div>
        </div>
      </footer>

      <Link 
        href={whatsappLink}
        target="_blank"
        className="fixed bottom-5 right-5 bg-[#25D366] hover:bg-[#1da851] text-white p-3.5 rounded-full shadow-2xl z-50 transition-all active:scale-95 touch-manipulation"
        aria-label="WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </Link>
    </main>
  );
}
