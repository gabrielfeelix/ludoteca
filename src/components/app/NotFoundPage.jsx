import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../shared/Card";
import "./NotFoundPage.css";

export const NotFoundPage = () => {
  return (
    <div className="notfound-wrapper">
      <Card className="notfound-card" hover={false}>
        <div className="notfound-illustration">🧭</div>
        <h1>Ops! Essa página não existe</h1>
        <p>Parece que você rolou o dado errado.</p>
        <div className="notfound-actions">
          <Link to="/landingpage" className="btn btn-primary">
            Voltar para a Home
          </Link>
          <Link to="/home" className="btn btn-outline">
            Ir para minha coleção
          </Link>
        </div>
      </Card>
    </div>
  );
};

