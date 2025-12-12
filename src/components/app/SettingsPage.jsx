import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Palette, Lock, Upload, Eye, Save } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { Card } from "../shared/Card";
import "./SettingsPage.css";

const sections = [
  { key: "aparencia", label: "Aparência", icon: "Palette" },
  { key: "notificacoes", label: "Notificações", icon: "Bell" },
  { key: "privacidade", label: "Privacidade", icon: "Lock" }
];

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, updatePreferences, updateUserPhoto, addNotification } = useUser();
  const [activeSection, setActiveSection] = useState("aparencia");
  const [isSaving, setIsSaving] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [settings, setSettings] = useState({
    theme: user.preferences.theme || "light",
    language: user.preferences.language || "Português",
    complexity: user.preferences.complexity || "Medio",
    showPlayTime: user.preferences.showPlayTime !== false,
    publicNotes: user.preferences.publicNotes || false,
    publicCollection: user.preferences.publicCollection !== false,
    emailNotifications: user.notifications.updates !== false,
    emailVisits: user.notifications.visits || false,
    emailMonthly: user.notifications.monthly !== false
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result;
        setUploadedImage(base64);
        updateUserPhoto(base64);
        addNotification({
          type: "success",
          title: "Foto atualizada",
          message: "Sua foto de perfil foi alterada com sucesso"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setTimeout(() => {
      updatePreferences({
        theme: settings.theme,
        language: settings.language,
        complexity: settings.complexity,
        showPlayTime: settings.showPlayTime,
        publicNotes: settings.publicNotes,
        publicCollection: settings.publicCollection
      });
      addNotification({
        type: "success",
        title: "Configurações salvas",
        message: "Suas preferências foram atualizadas com sucesso"
      });
      setIsSaving(false);
    }, 800);
  };

  const renderSection = () => {
    if (activeSection === "aparencia") {
      return (
        <div className="settings-section">
          <Card hover={false}>
            <h3 className="section-title">Tema</h3>

            <div className="settings-group">
              <label className="radio-group">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={settings.theme === "light"}
                  onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                />
                <span className="radio-label">
                  <strong>Claro</strong>
                  <small>Interface clara com fundo branco</small>
                </span>
              </label>
              <label className="radio-group">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={settings.theme === "dark"}
                  onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                />
                <span className="radio-label">
                  <strong>Escuro</strong>
                  <small>Interface escura para melhor visualização</small>
                </span>
              </label>
              <label className="radio-group">
                <input
                  type="radio"
                  name="theme"
                  value="auto"
                  checked={settings.theme === "auto"}
                  onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                />
                <span className="radio-label">
                  <strong>Automático</strong>
                  <small>Segue a preferência do sistema</small>
                </span>
              </label>
            </div>

            <div className="settings-divider" />

            <h3 className="section-title">Idioma</h3>
            <label>
              <select
                value={settings.language}
                onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
              >
                <option>Português</option>
                <option>Inglês</option>
                <option>Espanhol</option>
              </select>
            </label>

            <div className="settings-divider" />

            <h3 className="section-title">Preferências</h3>
            <label className="checkbox-group">
              <input
                type="checkbox"
                checked={settings.showPlayTime}
                onChange={(e) => setSettings(prev => ({ ...prev, showPlayTime: e.target.checked }))}
              />
              <span>Mostrar tempo de jogo nos cards</span>
            </label>
          </Card>
        </div>
      );
    }

    if (activeSection === "notificacoes") {
      return (
        <div className="settings-section">
          <Card hover={false}>
            <h3 className="section-title">Notificações por Email</h3>

            <label className="checkbox-group">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
              />
              <div>
                <span>Novidades e atualizações</span>
                <small>Receba informações sobre novas funcionalidades</small>
              </div>
            </label>

            <label className="checkbox-group">
              <input
                type="checkbox"
                checked={settings.emailVisits}
                onChange={(e) => setSettings(prev => ({ ...prev, emailVisits: e.target.checked }))}
              />
              <div>
                <span>Visitas na sua coleção</span>
                <small>Notificações quando amigos acessarem sua Ludoteca</small>
              </div>
            </label>

            <label className="checkbox-group">
              <input
                type="checkbox"
                checked={settings.emailMonthly}
                onChange={(e) => setSettings(prev => ({ ...prev, emailMonthly: e.target.checked }))}
              />
              <div>
                <span>Resumo mensal</span>
                <small>Relatório com estatísticas e destaques do mês</small>
              </div>
            </label>
          </Card>

          <Card hover={false}>
            <h3 className="section-title">Preferências de Coleção</h3>

            <label className="checkbox-group">
              <input
                type="checkbox"
                checked={settings.publicNotes}
                onChange={(e) => setSettings(prev => ({ ...prev, publicNotes: e.target.checked }))}
              />
              <div>
                <span>Mostrar notas publicamente</span>
                <small>Suas anotações nos jogos ficarão visíveis para amigos</small>
              </div>
            </label>

            <label>
              <span className="label-title">Complexidade padrão para filtros</span>
              <select
                value={settings.complexity}
                onChange={(e) => setSettings(prev => ({ ...prev, complexity: e.target.value }))}
              >
                <option>Leve</option>
                <option>Medio</option>
                <option>Pesado</option>
                <option>Todos</option>
              </select>
            </label>
          </Card>
        </div>
      );
    }

    return (
      <div className="settings-section">
        <Card hover={false}>
          <h3 className="section-title">Foto de Perfil</h3>

          <div className="photo-upload">
            <div className="avatar-preview-large">
              {uploadedImage || user.avatar ? (
                <img src={uploadedImage || user.avatar} alt={user.name} className="avatar-img" />
              ) : (
                <span className="avatar-initials">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </span>
              )}
            </div>
            <label className="upload-button">
              <Upload size={16} />
              <span>Escolher foto</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: "none" }}
              />
            </label>
            <small>JPG, PNG ou GIF. Máximo 5MB.</small>
          </div>

          <div className="settings-divider" />

          <h3 className="section-title">Visibilidade da Coleção</h3>

          <label className="checkbox-group">
            <input
              type="checkbox"
              checked={settings.publicCollection}
              onChange={(e) => setSettings(prev => ({ ...prev, publicCollection: e.target.checked }))}
            />
            <div>
              <span>Coleção pública</span>
              <small>Amigos podem acessar sua coleção através do link público</small>
            </div>
          </label>

          <div className="settings-divider" />

          <h3 className="section-title">Privacidade</h3>

          <p className="settings-info">
            <Eye size={16} />
            Sua coleção é privada por padrão. Você pode compartilhar um link público com quem quiser.
          </p>
        </Card>
      </div>
    );
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <button
          className="back-button"
          onClick={() => navigate("/home")}
          type="button"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>
        <h1>Configurações</h1>
        <div style={{ width: 40 }} />
      </div>

      <div className="settings-layout">
        {/* Sidebar Desktop */}
        <aside className="settings-sidebar">
          {sections.map((section) => (
            <button
              key={section.key}
              type="button"
              className={`settings-nav-item ${activeSection === section.key ? "active" : ""}`}
              onClick={() => setActiveSection(section.key)}
            >
              {section.label}
            </button>
          ))}
        </aside>

        {/* Tabs Mobile */}
        <div className="settings-mobile-tabs">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
            aria-label="Selecionar seção de configurações"
          >
            {sections.map((section) => (
              <option key={section.key} value={section.key}>
                {section.label}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <main className="settings-content">
          {renderSection()}

          <div className="settings-actions">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isSaving}
              type="button"
            >
              <Save size={16} />
              {isSaving ? "Salvando..." : "Salvar alterações"}
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate("/home")}
              type="button"
            >
              Cancelar
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
