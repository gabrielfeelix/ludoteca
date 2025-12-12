import React, { useMemo, useState } from "react";
import { Link as LinkIcon, Copy, Trash2, Upload, Download } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { Card } from "../shared/Card";
import "./ProfilePage.css";

const sections = [
  { key: "perfil", label: "Meu perfil" },
  { key: "preferencias", label: "Preferências" },
  { key: "link", label: "Link público" },
  { key: "notificacoes", label: "Notificações" },
  { key: "privacidade", label: "Dados e privacidade" }
];

export const ProfilePage = () => {
  const { user, addNotification } = useUser();
  const [activeSection, setActiveSection] = useState("perfil");
  const [publicCollection, setPublicCollection] = useState(user.preferences.publicCollection !== false);
  const [showPlayTime, setShowPlayTime] = useState(user.preferences.showPlayTime !== false);
  const [publicNotes, setPublicNotes] = useState(user.preferences.publicNotes || false);
  const [notifyVisits, setNotifyVisits] = useState(user.notifications.visits || false);
  const [notifyMonthly, setNotifyMonthly] = useState(user.notifications.monthly !== false);
  const [copied, setCopied] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteText, setDeleteText] = useState("");

  const profile = useMemo(
    () => ({
      name: user.name,
      email: user.email,
      location: user.location,
      avatar: user.avatar,
      stats: user.stats,
      publicUrl: user.publicUrl
    }),
    [user]
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard?.writeText(profile.publicUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const getInitials = () => profile.name.split(" ").map(n => n[0]).join("").toUpperCase();

  const renderSection = () => {
    if (activeSection === "perfil") {
      return (
        <div className="profile-section">
          <Card hover={false}>
            <div className="profile-hero">
              <div className="profile-avatar">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="avatar-img" />
                ) : (
                  <span>{getInitials()}</span>
                )}
              </div>
              <div>
                <h2 className="profile-name">{profile.name}</h2>
                <p className="profile-email">{profile.email}</p>
                <p className="profile-location">{profile.location}</p>
                <a href="/home/settings" className="btn btn-outline" type="button" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Upload size={16} />
                  Alterar foto
                </a>
              </div>
            </div>
          </Card>

          <div className="profile-stats">
            <Card hover={false} className="stat-card">
              <strong>{profile.stats.games}</strong>
              <span>Jogos na coleção</span>
            </Card>
            <Card hover={false} className="stat-card">
              <strong>{profile.stats.matches}</strong>
              <span>Partidas registradas</span>
            </Card>
            <Card hover={false} className="stat-card">
              <strong>{profile.stats.hours}h</strong>
              <span>Tempo total jogado</span>
            </Card>
            <Card hover={false} className="stat-card">
              <strong>{profile.stats.since}</strong>
              <span>Membro desde</span>
            </Card>
          </div>
        </div>
      );
    }

    if (activeSection === "preferencias") {
      return (
        <div className="profile-section">
          <Card hover={false}>
            <h3 className="section-title-sm">Preferências da Ludoteca</h3>

            <div className="form-row">
              <label>
                Complexidade padrão
                <select defaultValue="Medio">
                  <option>Leve</option>
                  <option>Medio</option>
                  <option>Pesado</option>
                  <option>Todos</option>
                </select>
              </label>
              <label>
                Idioma das regras
                <select defaultValue="Português">
                  <option>Português</option>
                  <option>Inglês</option>
                  <option>Espanhol</option>
                </select>
              </label>
            </div>

            <div className="switch-row">
              <span>Mostrar tempo de jogo nos cards</span>
              <input
                type="checkbox"
                checked={showPlayTime}
                onChange={(e) => setShowPlayTime(e.target.checked)}
              />
            </div>
            <div className="switch-row">
              <span>Mostrar minhas notas publicamente</span>
              <input
                type="checkbox"
                checked={publicNotes}
                onChange={(e) => setPublicNotes(e.target.checked)}
              />
            </div>
          </Card>
        </div>
      );
    }

    if (activeSection === "link") {
      return (
        <div className="profile-section">
          <Card hover={false}>
            <h3 className="section-title-sm">Link público</h3>

            <div className="public-link-row">
              <div className="public-link">
                <LinkIcon size={18} />
                <span>{profile.publicUrl}</span>
              </div>
              <button className="btn btn-outline" type="button" onClick={copyLink}>
                <Copy size={16} /> {copied ? "Copiado!" : "Copiar link"}
              </button>
            </div>

            <div className="switch-row">
              <span>Coleção pública</span>
              <input
                type="checkbox"
                checked={publicCollection}
                onChange={(e) => setPublicCollection(e.target.checked)}
              />
            </div>

            <label className="full-width">
              Personalizar URL
              <input type="text" defaultValue="/gabriel" />
              <small className="muted">
                Disponibilidade será verificada quando houver backend.
              </small>
            </label>
          </Card>
        </div>
      );
    }

    if (activeSection === "notificacoes") {
      return (
        <div className="profile-section">
          <Card hover={false}>
            <h3 className="section-title-sm">Notificações por email</h3>

            <label className="check-row">
              <input
                type="checkbox"
                checked={notifyVisits}
                onChange={(e) => setNotifyVisits(e.target.checked)}
              />
              Email quando amigos acessarem minha coleção
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                checked={notifyMonthly}
                onChange={(e) => setNotifyMonthly(e.target.checked)}
              />
              Resumo mensal da Ludoteca
            </label>
            <label className="check-row">
              <input type="checkbox" defaultChecked />
              Novidades e atualizações
            </label>
          </Card>
        </div>
      );
    }

    return (
      <div className="profile-section">
        <Card hover={false}>
          <h3 className="section-title-sm">Gerenciar dados</h3>
          <div className="danger-actions">
            <button className="btn btn-outline" type="button">
              <Download size={16} /> Exportar meus dados
            </button>
            <button className="btn btn-outline" type="button">
              <Upload size={16} /> Importar do BGG/Ludopedia
            </button>
          </div>
        </Card>

        <Card hover={false} className="danger-card">
          <h3 className="section-title-sm">Zona de perigo</h3>
          <p className="muted">
            Ao excluir sua conta, sua coleção e suas notas serão removidas
            permanentemente.
          </p>
          <button
            className="btn btn-outline danger-btn"
            type="button"
            onClick={() => setDeleteModalOpen(true)}
          >
            <Trash2 size={16} /> Excluir minha conta
          </button>
        </Card>
      </div>
    );
  };

  return (
    <div className="profile-layout">
      <aside className="profile-sidebar">
        {sections.map((section) => (
          <button
            key={section.key}
            type="button"
            className={`profile-nav-item ${
              activeSection === section.key ? "active" : ""
            }`}
            onClick={() => setActiveSection(section.key)}
          >
            {section.label}
          </button>
        ))}
      </aside>

      <div className="profile-mobile-tabs">
        <select
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
          aria-label="Selecionar seção"
        >
          {sections.map((section) => (
            <option key={section.key} value={section.key}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      <main className="profile-content">{renderSection()}</main>

      {deleteModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => setDeleteModalOpen(false)}>
          <div className="modal-card delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Tem certeza?</h3>
            <p>
              Digite <strong>EXCLUIR</strong> para confirmar.
            </p>
            <input
              type="text"
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
              placeholder="EXCLUIR"
              className="delete-input"
            />
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setDeleteText("");
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={deleteText.trim().toUpperCase() !== "EXCLUIR"}
                onClick={() => {
                  setDeleteModalOpen(false);
                  setDeleteText("");
                }}
              >
                Confirmar exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

