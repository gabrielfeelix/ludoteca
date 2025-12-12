import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQSection.css';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <button className="faq-question" onClick={onToggle}>
        <span>{question}</span>
        <ChevronDown className={`faq-icon ${isOpen ? 'faq-icon--open' : ''}`} />
      </button>
      <div className={`faq-answer ${isOpen ? 'faq-answer--open' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

export const FAQSection = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="ludo-container">
        <div className="faq-header">
          <h2>Perguntas Frequentes</h2>
          <p className="faq-subtitle">Tudo o que você precisa saber sobre a Ludoteca</p>
        </div>
        <div className="faq-list">
          {items.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
