import React, { useState } from "react";
import { Card } from "../shared/Card";
import { Toast } from "../shared/Toast";
import "./PartidasPage.css";

export const PartidasPage = () => {
  const [toast, setToast] = useState(null);
  return (
    <div className="partidas-wrapper">
      <Card className="partidas-card" hover={false}>
        <div className="partidas-illustration">🏆</div>
        <h1>Registro de Partidas</h1>
        <p>
          Em breve você poderá salvar resultados, histórias e momentos das suas
          sessões de jogo.
        </p>
        <Card className="partidas-preview" hover={false}>
          <p>Nenhuma partida registrada ainda.</p>
        </Card>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() =>
            setToast({ variant: "info", message: "Aviso ativado (mock)" })
          }
        >
          Me avise quando estiver pronto
        </button>
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

