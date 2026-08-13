import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';
import type { Language } from '../../../contexts/language';

const FAQS: Record<Language, { question: string; answer: string }[]> = {
  es: [
    {
      question: '¿Los productos tienen garantía?',
      answer: 'Sí, todos nuestros productos cuentan con garantía de fábrica según la marca y el fabricante.',
    },
    {
      question: '¿Costo de envío de los productos?',
      answer: 'El costo de envío varía según tu ubicación y el tamaño del pedido — te lo confirmamos junto con la cotización.',
    },
    {
      question: '¿Cómo adquirir un producto?',
      answer: 'Escríbenos por WhatsApp, correo o el formulario de esta página y te enviamos la cotización correspondiente.',
    },
    {
      question: '¿Cuánto tiempo tardan en enviar un presupuesto?',
      answer: 'Normalmente respondemos en menos de 24 horas hábiles.',
    },
    {
      question: '¿Dónde puedo conseguir sus productos?',
      answer: 'Directamente con nosotros — contáctanos por teléfono, WhatsApp o el formulario de esta página.',
    },
  ],
  en: [
    {
      question: 'Do the products have a warranty?',
      answer: 'Yes, all our products come with a factory warranty depending on the brand and manufacturer.',
    },
    {
      question: 'What is the shipping cost?',
      answer: 'Shipping cost varies depending on your location and order size — we confirm it along with your quote.',
    },
    {
      question: 'How can I purchase a product?',
      answer: 'Message us on WhatsApp, email, or the form on this page, and we’ll send you a quote.',
    },
    {
      question: 'How long does it take to get a quote?',
      answer: 'We usually respond within 24 business hours.',
    },
    {
      question: 'Where can I get your products?',
      answer: 'Directly from us — reach out by phone, WhatsApp, or the form on this page.',
    },
  ],
};

const FaqSection = () => {
  const { language, t } = useLanguage();
  const faqs = FAQS[language];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <span style={{ color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
        {t('faqLabel')}
      </span>
      <h3 style={{ fontSize: '1.8rem', fontFamily: 'Oswald', textTransform: 'uppercase', margin: '0.5rem 0 1.5rem', color: 'var(--text-light)' }}>
        {t('faqTitle')}
      </h3>

      <div style={{ borderTop: '1px solid var(--border-color)' }}>
        {faqs.map((faq, i) => {
          const isOpen = i === openIndex;
          return (
            <div key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'none',
                  border: 'none',
                  padding: '1.25rem 0',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'var(--text-light)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                }}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={20}
                  style={{
                    flexShrink: 0,
                    color: 'var(--primary)',
                    transition: 'transform 0.25s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
              <div
                style={{
                  maxHeight: isOpen ? '200px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}
              >
                <p style={{ color: 'var(--text-muted)', paddingBottom: '1.25rem', lineHeight: 1.6 }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqSection;
