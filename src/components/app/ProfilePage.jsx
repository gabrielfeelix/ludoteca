import React, { useMemo, useState } from "react";
import { Link as LinkIcon, Copy, Trash2, Upload, Download, Trophy, Gamepad2 } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { Card } from "../shared/Card";
import { MOCK_PARTIDAS } from "../../data/mockData";
import "./ProfilePage.css";

const sections = [
  { key: "perfil", label: "Meu perfil" },
  { key: "preferencias", label: "Preferências" },
  { key: "link", label: "Link público" },
  { key: "notificacoes", label: "Notificações" },
  { key: "privacidade", label: "Dados e privacidade" }
];

export const ProfilePage = ({ games = [], partidas = MOCK_PARTIDAS }) => {
  const { user, addNotification, updateUserPhoto } = useUser();
  const [activeSection, setActiveSection] = useState("perfil");
  const [publicCollection, setPublicCollection] = useState(user.preferences.publicCollection !== false);
  const [showPlayTime, setShowPlayTime] = useState(user.preferences.showPlayTime !== false);
  const [publicNotes, setPublicNotes] = useState(user.preferences.publicNotes || false);
  const [notifyVisits, setNotifyVisits] = useState(user.notifications.visits || false);
  const [notifyMonthly, setNotifyMonthly] = useState(user.notifications.monthly !== false);
  const [copied, setCopied] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const realStats = useMemo(() => {
    const totalPartidas = partidas.length;
    const vitorias = partidas.filter(p => {
      const vencedor = p.jogadores.find(j => j.id === p.vencedorId);
      return vencedor?.isUsuario;
    }).length;
    const winRate = totalPartidas > 0 ? Math.round((vitorias / totalPartidas) * 100) : 0;
    const tempoTotal = Math.round(partidas.reduce((acc, p) => acc + (p.duracao || 0), 0) / 60);

    return {
      games: games.length,
      matches: totalPartidas,
      hours: tempoTotal,
      winRate,
      vitorias,
      since: user.stats.since
    };
  }, [games, partidas, user.stats.since]);

  const jogosMaisJogados = useMemo(() => {
    const jogosMap = new Map();
    partidas.forEach(p => {
      const count = jogosMap.get(p.jogoId) || 0;
      jogosMap.set(p.jogoId, count + 1);
    });

    const jogosOrdenados = Array.from(jogosMap.entries())
      .map(([id, count]) => {
        const partida = partidas.find(p => p.jogoId === id);
        return {
          id,
          nome: partida?.jogoNome || '',
          imagem: partida?.jogoImagem || '',
          count
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    return jogosOrdenados;
  }, [partidas]);

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

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result;
        if (typeof base64 === "string") {
          setUploadedImage(base64);
          updateUserPhoto(base64);
          addNotification({
            type: "success",
            title: "Foto atualizada",
            message: "Sua foto de perfil foi atualizada com sucesso!"
          });
          setPhotoModalOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
                <button onClick={() => setPhotoModalOpen(true)} className="btn btn-outline" type="button" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Upload size={16} />
                  Alterar foto
                </button>
              </div>
            </div>
          </Card>

          <div className="profile-stats">
            <Card hover={false} className="stat-card">
              <strong>{realStats.games}</strong>
              <span>Jogos na coleção</span>
            </Card>
            <Card hover={false} className="stat-card">
              <strong>{realStats.matches}</strong>
              <span>Partidas registradas</span>
            </Card>
            <Card hover={false} className="stat-card">
              <strong>{realStats.hours}h</strong>
              <span>Tempo total jogado</span>
            </Card>
            <Card hover={false} className="stat-card">
              <strong>{realStats.since}</strong>
              <span>Membro desde</span>
            </Card>
          </div>

          {/* Win Rate Section */}
          <Card hover={false} className="winrate-card">
            <h3 className="section-title-sm">Win Rate</h3>
            <div className="winrate-content">
              <div className="winrate-donut">
                <svg viewBox="0 0 120 120" className="donut-svg">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#E0E0E0" strokeWidth="20" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="var(--cuphead-yellow)"
                    strokeWidth="20"
                    strokeDasharray={`${realStats.winRate * 3.14} ${314 - realStats.winRate * 3.14}`}
                    strokeDashoffset="78.5"
                    transform="rotate(-90 60 60)"
                  />
                  <text x="60" y="60" textAnchor="middle" dominantBaseline="middle" fontSize="24" fontWeight="700" fontFamily="var(--font-display)" fill="var(--cuphead-black)">
                    {realStats.winRate}%
                  </text>
                </svg>
              </div>
              <div className="winrate-stats">
                <div className="winrate-stat-item">
                  <Trophy size={20} color="var(--cuphead-yellow)" />
                  <div>
                    <strong>{realStats.vitorias}</strong>
                    <span>Vitórias</span>
                  </div>
                </div>
                <div className="winrate-stat-item">
                  <Gamepad2 size={20} color="var(--cuphead-black)" />
                  <div>
                    <strong>{realStats.matches - realStats.vitorias}</strong>
                    <span>Derrotas</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Most Played Games */}
          {jogosMaisJogados.length > 0 && (
            <Card hover={false} className="most-played-card">
              <h3 className="section-title-sm">Jogos mais jogados</h3>
              <div className="most-played-list">
                {jogosMaisJogados.map((jogo, index) => {
                  const maxCount = jogosMaisJogados[0].count;
                  const percentage = (jogo.count / maxCount) * 100;
                  return (
                    <div key={jogo.id} className="most-played-item">
                      <div className="most-played-rank">#{index + 1}</div>
                      {jogo.imagem && (
                        <img src={jogo.imagem} alt={jogo.nome} className="most-played-img" />
                      )}
                      <div className="most-played-info">
                        <strong>{jogo.nome}</strong>
                        <div className="most-played-bar-container">
                          <div className="most-played-bar" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                      <span className="most-played-count">{jogo.count}x</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
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

      {photoModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setPhotoModalOpen(false)}
        >
          <div
            className="modal-card photo-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Alterar foto de perfil</h3>

            <div className="photo-preview-container">
              <div className="avatar-preview-large">
                {uploadedImage || profile.avatar ? (
                  <img
                    src={uploadedImage || profile.avatar}
                    alt={profile.name}
                    className="avatar-img"
                  />
                ) : (
                  <span className="avatar-initials">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
              </div>
            </div>

            <label className="upload-button">
              <Upload size={16} />
              <span>Escolher nova foto</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: "none" }}
              />
            </label>
            <small>JPG, PNG ou GIF. Máximo 5MB.</small>

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setPhotoModalOpen(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

