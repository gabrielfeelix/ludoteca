import React from "react";
import { FAQSection } from "../landing/FAQSection";
import { FAQ_ITEMS } from "../../data/mockData";
import { Card } from "../shared/Card";
import "./HelpPage.css";

export const HelpPage = () => {
  return (
    <div className="help-page">
      <div className="ludo-container">
        <h1 className="help-title">Ajuda</h1>
        <p className="help-subtitle">
          Tutoriais rápidos e respostas para dúvidas comuns.
        </p>

        <div className="help-grid">
          <Card hover={false}>
            <h3>Como adicionar um jogo</h3>
            <p>
              Clique em “Adicionar jogo”, busque o título e personalize os detalhes.
            </p>
          </Card>
          <Card hover={false}>
            <h3>Como usar a Mesa de Hoje</h3>
            <p>
              Escolha número de jogadores, tempo e peso. A Ludoteca sugere as melhores opções.
            </p>
          </Card>
          <Card hover={false}>
            <h3>Como compartilhar minha coleção</h3>
            <p>
              No Perfil, copie seu link público e envie para o grupo. Eles não precisam de conta.
            </p>
          </Card>
        </div>
      </div>

      <FAQSection items={FAQ_ITEMS} />

      <div className="ludo-container help-contact">
        <Card hover={false}>
          <h3>Contato</h3>
          <p>Email: contato@ludoteca.app</p>
          <p>Comunidade: Discord (em breve)</p>
        </Card>
      </div>
    </div>
  );
};

