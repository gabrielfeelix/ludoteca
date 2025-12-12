import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AppHeader } from "./AppHeader";
import { BottomNav } from "./BottomNav";
import { Card } from "../shared/Card";
import { FAQ_ITEMS, APP_TABS } from "../../data/mockData";
import { Sparkles, User, Library, NotebookPen } from "lucide-react";
import "./HelpPage.css";

export const HelpPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("colecao");

  const APP_TABS_MAPPED = APP_TABS.map(tab => ({
    ...tab,
    icon: tab.icon === "Library" ? Library : tab.icon === "Sparkles" ? Sparkles : tab.icon === "NotebookPen" ? NotebookPen : User
  }));
  const NAV_TABS = APP_TABS_MAPPED.filter(tab => tab.key !== "perfil");

  return (
    <div className="dashboard-shell">
      <AppHeader
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        tabs={NAV_TABS}
        onOpenHelp={() => {}}
        onOpenProfile={() => setActiveTab("perfil")}
        onOpenSettings={() => navigate("/home/settings")}
      />

      <div className="ludo-container help-page">
        <div className="help-header">
          <button
            className="back-button"
            onClick={() => navigate("/home")}
            type="button"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
          <div>
            <h1 className="help-title">Central de Ajuda</h1>
            <p className="help-subtitle">
              Tutoriais rápidos e respostas para suas dúvidas.
            </p>
          </div>
        </div>

        <div className="help-grid">
          <Card hover={false}>
            <h3>Como adicionar um jogo</h3>
            <p>
              Clique em "Adicionar jogo", busque o título e personalize os detalhes da sua coleção.
            </p>
          </Card>
          <Card hover={false}>
            <h3>Como usar a Mesa de Hoje</h3>
            <p>
              Escolha número de jogadores, tempo e peso. A Ludoteca sugere as melhores opções automaticamente.
            </p>
          </Card>
          <Card hover={false}>
            <h3>Como compartilhar minha coleção</h3>
            <p>
              No Perfil, copie seu link público e envie para o grupo. Eles não precisam de conta.
            </p>
          </Card>
        </div>

        <div className="help-faq-section">
          <h2 className="help-section-title">Perguntas Frequentes</h2>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, idx) => (
              <details key={idx} className="faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <Card hover={false} className="help-contact">
          <h3>Precisa de ajuda?</h3>
          <p>
            Email: <a href="mailto:contato@ludoteca.app">contato@ludoteca.app</a>
          </p>
          <p>Comunidade: Discord (em breve)</p>
        </Card>
      </div>

      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} tabs={NAV_TABS} />
    </div>
  );
};
