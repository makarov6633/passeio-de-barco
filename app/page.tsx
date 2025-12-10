'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

const tours = [
  {
    id: 'barco-arraial',
    title: 'Passeio de Barco',
    image: '/WhatsApp-Image-2025-12-10-at-01.43.40-(1).jpeg',
    description: 'A experiência mais completa de Arraial do Cabo!',
    tiers: [
      { name: 'Tradicional', price: 'R$ 150', detail: 'Frutas + Água' },
      { name: 'Open Bar', price: 'R$ 180', detail: 'Água, Refri, Caipirinha' },
      { name: 'Open Food', price: 'R$ 280', detail: 'Tudo + Churrasco' },
    ],
    features: ['Ilha do Farol, Prainhas, Gruta Azul', 'Embarcação com toboágua', 'Check-in 10:30 | Saída 11:00'],
    whatsappMessage: 'Olá! Quero agendar o Passeio de Barco!'
  },
  {
    id: 'rio-de-janeiro',
    title: 'Tour Rio de Janeiro',
    image: '/WhatsApp-Image-2025-12-10-at-01.16.19.jpeg',
    description: 'Visite o Cristo Redentor e a Cidade Maravilhosa.',
    price: 'Consulte',
    features: ['Cristo Redentor', 'Transporte executivo', 'Guia credenciado'],
    whatsappMessage: 'Olá! Quero saber sobre o Tour Rio de Janeiro!'
  },
  {
    id: 'jet-ski',
    title: 'Jet Ski',
    image: '/WhatsApp-Image-2025-12-10-at-01.34.08.jpeg',
    description: 'Adrenalina nas águas cristalinas de Cabo Frio.',
    price: 'Consulte',
    features: ['Equipamentos novos', 'Colete incluso', 'Instruções para iniciantes'],
    whatsappMessage: 'Olá! Quero saber sobre o Jet Ski!'
  },
  {
    id: 'buggy',
    title: 'Passeio de Buggy',
    image: '/buggy-dunas.jpg',
    description: 'Aventura pelas dunas e praias da região.',
    price: 'Consulte',
    features: ['Roteiro pelas dunas', 'Pôr do sol na Praia Grande', 'Até 4 pessoas'],
    whatsappMessage: 'Olá! Quero reservar o Passeio de Buggy!'
  },
  {
    id: 'quadriciclo',
    title: 'Quadriciclo',
    image: '/quadriciclo-dunas.jpg',
    description: 'Pilote sua própria aventura off-road.',
    price: 'Consulte',
    features: ['Máquinas 600cc automáticas', 'Trilhas e dunas', 'CNH B necessária'],
    whatsappMessage: 'Olá! Quero agendar o Quadriciclo!'
  },
  {
    id: 'mergulho',
    title: 'Mergulho de Batismo',
    image: '/mergulho-arraial.jpg',
    description: 'Descubra a vida marinha do Caribe Brasileiro.',
    price: 'Integral',
    features: ['Instrutor exclusivo', 'Não precisa saber nadar', 'Fotos subaquáticas inclusas'],
    whatsappMessage: 'Olá! Quero agendar o Mergulho!'
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
  '/mergulho-arraial.jpg',
  '/quadriciclo-dunas.jpg',
  '/buggy-dunas.jpg',
];

const whatsappNumber = '5522998249911';
const whatsappLink = `https://wa.me/${whatsappNumber}`;
const mapLink = "https://www.google.com/maps/place/Cais+da+Praia+dos+Anjos";

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
      
      {/* HEADER FIXO TRANSPARENTE */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logo-ctc.png" 
              alt="Caleb's Tour Co." 
              width={50} 
              height={50} 
              className="rounded-full"
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
            <Link href="#transfer" className={`text-sm font-medium transition-colors hover:text-[#25D366] hidden md:block ${scrolled ? 'text-gray-700' : 'text-white'}`}>
              Transfer
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

      {/* HERO - VÍDEO + LOGO GRANDE */}
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
        
        {/* Overlay gradiente suave */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60"></div>
        
        {/* Conteúdo Central */}
        <div className="relative z-10 text-center px-4">
          {/* LOGO GRANDE */}
          <div className="mb-8 animate-[fadeIn_1s_ease-out]">
            <Image 
              src="/logo-ctc.png" 
              alt="Caleb's Tour Co." 
              width={280} 
              height={280} 
              className="mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              priority
              quality={100}
              unoptimized
            />
          </div>
          
          {/* Slogan minimalista */}
          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide mb-10 animate-[fadeIn_1.5s_ease-out]">
            O Caribe Brasileiro começa aqui
          </p>
          
          {/* CTA Principal */}
          <Link 
            href={whatsappLink}
            target="_blank"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-lg py-4 px-10 rounded-full transition-all hover:scale-105 shadow-2xl animate-[fadeIn_2s_ease-out]"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            AGENDAR PASSEIO
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </section>

      {/* BARRA DE INFO */}
      <div className="bg-[#0a4d54] text-white py-4 px-4 text-center text-sm font-medium">
        <span className="inline-flex items-center gap-2">
          ⚠️ Check-in 10:30 | Saída 11:00 | Taxa R$10 (dinheiro) | Proibido cooler
        </span>
      </div>

      {/* PASSEIOS */}
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

                  <ul className="space-y-2 text-sm text-gray-600 flex-1 mb-6">
                    {tour.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#25D366] font-bold">✓</span> {f}
                      </li>
                    ))}
                  </ul>

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
        </div>
      </section>

      {/* TRANSFER */}
      <section id="transfer" className="py-24 px-4 bg-[#0a4d54] text-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <span className="text-cyan-300 text-sm font-bold uppercase tracking-widest">Serviço</span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 mb-6">Transfer</h2>
            <p className="text-cyan-100 text-lg mb-8">Buscamos você em Cabo Frio com conforto.</p>
            
            <div className="bg-white/10 backdrop-blur p-6 rounded-2xl mb-8 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-xl font-bold">R$</div>
                <div>
                  <p className="text-2xl font-bold">R$ 15 ida | R$ 15 volta</p>
                  <p className="text-cyan-200 text-sm">Pix no embarque</p>
                </div>
              </div>
              <p className="text-cyan-200 text-sm">⚠️ Atendemos apenas bairros de Cabo Frio</p>
            </div>

            <Link 
              href={`${whatsappLink}?text=Olá! Quero agendar o Transfer!`}
              target="_blank"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105"
            >
              Agendar Transfer
            </Link>
          </div>
          <div className="lg:w-1/2">
            <Image src="/van-tour.jpg" alt="Transfer" width={600} height={400} className="rounded-3xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* PONTO DE ENCONTRO */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 h-[350px] w-full relative rounded-3xl overflow-hidden shadow-xl group">
            <Image src="/cais-praia-anjos.jpg" alt="Cais Praia dos Anjos" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a4d54] to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold">Cais da Praia dos Anjos</h3>
              <p className="text-cyan-200 text-sm">Ponto de partida</p>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <span className="text-[#0a4d54] text-sm font-bold uppercase tracking-widest">Localização</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-6">Ponto de Encontro</h2>
            
            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
              <div className="flex justify-between mb-3 pb-3 border-b border-gray-200">
                <span className="text-gray-600">Check-in</span>
                <span className="font-bold text-[#0a4d54]">10:30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saída do Barco</span>
                <span className="font-bold text-[#0a4d54]">11:00</span>
              </div>
            </div>

            <Link 
              href={mapLink} 
              target="_blank"
              className="inline-flex items-center gap-2 border-2 border-[#0a4d54] text-[#0a4d54] hover:bg-[#0a4d54] hover:text-white font-bold py-3 px-8 rounded-full transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
              Ver no Google Maps
            </Link>
          </div>
        </div>
      </section>

      {/* GALERIA */}
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

      {/* DEPOIMENTOS */}
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

      {/* REGRAS */}
      <section className="py-16 px-4 bg-white border-t">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-sm font-bold text-[#0a4d54] uppercase tracking-widest mb-8">Política de Crianças</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h4 className="font-bold text-[#0a4d54] mb-4">Passeio de Barco</h4>
              <div className="space-y-2">
                <div className="flex justify-between"><span>0 a 4 anos</span><span className="text-[#25D366] font-bold">Grátis</span></div>
                <div className="flex justify-between"><span>5 a 7 anos</span><span className="text-[#0a4d54] font-bold">Meia</span></div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h4 className="font-bold text-[#0a4d54] mb-4">Outros Passeios</h4>
              <div className="space-y-2">
                <div className="flex justify-between"><span>City Tour Cabo Frio (0-4)</span><span className="text-[#25D366] font-bold">Grátis</span></div>
                <div className="flex justify-between"><span>City Tour Rio (0-6)</span><span className="text-[#25D366] font-bold">Grátis</span></div>
                <div className="flex justify-between"><span>Mergulho</span><span className="text-gray-800 font-bold">Integral</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#052e32] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <Image src="/logo-ctc.png" alt="Logo" width={60} height={60} className="rounded-full" quality={100} unoptimized />
            <div>
              <p className="font-bold text-lg">Caleb&apos;s Tour Co.</p>
              <p className="text-sm text-cyan-400">CNPJ: 26.096.072/0001-78</p>
            </div>
          </div>
          <div className="text-center md:text-right text-gray-400 text-sm">
            <p>Travessa Beija-Flor, Jacaré - Cabo Frio, RJ</p>
            <p className="mt-1">© 2025 Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
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