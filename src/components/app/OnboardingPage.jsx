import React, { useState } from "react";
import { ArrowRight, ArrowLeft, PartyPopper } from "lucide-react";
import { Card } from "../shared/Card";
import { Toast } from "../shared/Toast";
import "./OnboardingPage.css";

export const OnboardingPage = ({ onDone }) => {
  const [step, setStep] = useState(0);
  const [slug, setSlug] = useState("gabriel");
  const [firstGame, setFirstGame] = useState("");
  const [toast, setToast] = useState(null);

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="onboarding-wrapper">
      <Card className="onboarding-card" hover={false}>
        <div className="onboarding-steps">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`step-dot ${step === i ? "active" : ""}`}>
              {i + 1}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="onboarding-step">
            <h1>Bem-vindo à Ludoteca!</h1>
            <p>Vamos configurar sua estante em 2 minutinhos.</p>
            <div className="onboarding-illustration">🎲</div>
            <button className="btn btn-primary" type="button" onClick={next}>
              Começar <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="onboarding-step">
            <h1>Primeiro jogo</h1>
            <p>Qual é o primeiro jogo da sua coleção?</p>
            <input
              type="text"
              placeholder="Digite o nome do jogo..."
              value={firstGame}
              onChange={(e) => setFirstGame(e.target.value)}
            />
            <div className="onboarding-actions">
              <button className="btn btn-outline" type="button" onClick={back}>
                <ArrowLeft size={16} /> Voltar
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  if (!firstGame) {
                    setToast({ variant: "info", message: "Você pode pular por enquanto" });
                    next();
                  } else {
                    setToast({ variant: "success", message: `${firstGame} adicionado (mock)` });
                    next();
                  }
                }}
              >
                Continuar <ArrowRight size={16} />
              </button>
              <button className="btn btn-ghost" type="button" onClick={next}>
                Pular por enquanto
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step">
            <h1>Seu link público</h1>
            <p>Escolha o endereço da sua Ludoteca.</p>
            <label className="slug-row">
              ludoteca.app/
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.replace(/\s/g, ""))}
              />
            </label>
            <small className="muted">Disponibilidade será verificada quando houver backend.</small>
            <div className="onboarding-actions">
              <button className="btn btn-outline" type="button" onClick={back}>
                <ArrowLeft size={16} /> Voltar
              </button>
              <button className="btn btn-primary" type="button" onClick={next}>
                Confirmar <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-step">
            <PartyPopper size={48} />
            <h1>Tudo pronto!</h1>
            <p>Sua Ludoteca está no ar. Agora é só adicionar seus jogos.</p>
            <button
              className="btn btn-primary"
              type="button"
              onClick={onDone}
            >
              Ir para minha coleção <ArrowRight size={16} />
            </button>
          </div>
        )}
      </Card>

      {toast && (
        <Toast
          variant={toast.variant}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

