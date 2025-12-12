import React, { useState } from "react";
import { Menu, Bell, User as UserIcon, X, ChevronDown, Settings, LogOut, MessageCircle } from "lucide-react";
import { useUser } from "../../context/UserContext";
import "./AppHeader.css";

const LogoMark = ({ size = 34 }) => (
  <div className="app-logo">
    <img src="/assets/logo.svg" alt="Ludoteca" width={size} height={size} />
    <span>Ludoteca</span>
  </div>
);

export const AppHeader = ({ activeTab, onChangeTab, tabs, onOpenHelp, onOpenProfile, onOpenSettings }) => {
  const { user, notifications, unreadCount, markAsRead, markAllAsRead } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const getInitials = () => user.name.split(" ").map(n => n[0]).join("").toUpperCase();

  const toggleNotifications = () => {
    setNotificationsOpen((prev) => !prev);
    setProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
    setNotificationsOpen(false);
  };

  return (
    <>
      <header className="app-header">
        <div className="ludo-container header-inner">
          {/* Logo */}
          <LogoMark />

          {/* Tabs Desktop */}
          <nav className="header-nav">
            <div className="tab-group">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`tab-pill ${activeTab === tab.key ? "active" : ""}`}
                  onClick={() => onChangeTab(tab.key)}
                  type="button"
                  title={tab.label}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Actions Right */}
          <div className="header-actions">
            {/* Notifications */}
            <div className="action-item dropdown-root">
              <button
                className="icon-button"
                type="button"
                onClick={toggleNotifications}
                aria-label="Notificações"
                title={unreadCount > 0 ? `${unreadCount} notificação(ões)` : "Notificações"}
              >
                <Bell size={20} />
                {unreadCount > 0 && <span className="badge">{unreadCount > 9 ? "9+" : unreadCount}</span>}
              </button>
              {notificationsOpen && (
                <div className="dropdown-menu notifications-menu">
                  <div className="notifications-header">
                    <h4>Notificações</h4>
                    {unreadCount > 0 && (
                      <button
                        className="text-button"
                        type="button"
                        onClick={markAllAsRead}
                      >
                        Marcar como lidas
                      </button>
                    )}
                  </div>
                  <div className="notifications-list">
                    {notifications.length === 0 ? (
                      <div className="empty-state">
                        <p>Nenhuma notificação</p>
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          className={`notification-item ${notification.read ? "read" : "unread"}`}
                          onClick={() => {
                            if (!notification.read) markAsRead(notification.id);
                          }}
                        >
                          <div className="notification-content">
                            <p className="notification-title">{notification.title}</p>
                            <p className="notification-message">{notification.message}</p>
                            <span className="notification-time">
                              {getTimeAgo(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {notifications.length > 5 && (
                    <button
                      className="notifications-footer"
                      type="button"
                      onClick={() => {
                        onOpenSettings();
                        setNotificationsOpen(false);
                      }}
                    >
                      Ver todas as notificações
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="action-item dropdown-root profile-menu-root">
              <button
                className="profile-button"
                type="button"
                onClick={toggleProfileMenu}
              >
                <div className="avatar-small">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="avatar-img" />
                  ) : (
                    <span className="avatar-initials">{getInitials()}</span>
                  )}
                </div>
                <div className="profile-info">
                  <span className="profile-name">{user.name.split(" ")[0]}</span>
                  <ChevronDown size={16} />
                </div>
              </button>
              {profileMenuOpen && (
                <div className="dropdown-menu profile-menu">
                  <div className="profile-menu-header">
                    <div className="avatar-medium">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="avatar-img" />
                      ) : (
                        <span className="avatar-initials">{getInitials()}</span>
                      )}
                    </div>
                    <div>
                      <p className="profile-name-full">{user.name}</p>
                      <p className="profile-email-small">{user.email}</p>
                    </div>
                  </div>
                  <div className="menu-divider" />
                  <button
                    type="button"
                    className="menu-item"
                    onClick={() => {
                      onOpenProfile();
                      setProfileMenuOpen(false);
                    }}
                  >
                    <UserIcon size={18} />
                    <span>Meu perfil</span>
                  </button>
                  <button
                    type="button"
                    className="menu-item"
                    onClick={() => {
                      onOpenSettings();
                      setProfileMenuOpen(false);
                    }}
                  >
                    <Settings size={18} />
                    <span>Configurações</span>
                  </button>
                  <button
                    type="button"
                    className="menu-item"
                    onClick={() => {
                      onOpenHelp();
                      setProfileMenuOpen(false);
                    }}
                  >
                    <MessageCircle size={18} />
                    <span>Ajuda e suporte</span>
                  </button>
                  <div className="menu-divider" />
                  <button
                    type="button"
                    className="menu-item danger"
                    onClick={() => {
                      window.location.href = "/login";
                    }}
                  >
                    <LogOut size={18} />
                    <span>Sair</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Abrir menu"
              type="button"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="app-mobile-menu" role="dialog" aria-label="Menu principal" aria-modal="true">
          <div className="app-mobile-menu-header">
            <LogoMark size={28} />
            <button
              className="btn btn-ghost mobile-close"
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Fechar menu"
            >
              <X />
            </button>
          </div>
          <div className="app-mobile-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`tab-pill ${activeTab === tab.key ? "active" : ""}`}
                type="button"
                onClick={() => {
                  onChangeTab(tab.key);
                  setMobileMenuOpen(false);
                }}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="app-mobile-actions">
            <button
              className="mobile-action btn btn-outline"
              type="button"
              onClick={() => {
                onOpenHelp();
                setMobileMenuOpen(false);
              }}
            >
              <MessageCircle size={18} />
              <span>Ajuda</span>
            </button>
            <button
              className="mobile-action btn btn-outline"
              type="button"
              onClick={() => {
                onOpenSettings();
                setMobileMenuOpen(false);
              }}
            >
              <Settings size={18} />
              <span>Configurações</span>
            </button>
          </div>
          <div className="app-mobile-profile">
            <div className="profile-chip mobile">
              <div className="avatar-medium">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="avatar-img" />
                ) : (
                  <span className="avatar-initials">{getInitials()}</span>
                )}
              </div>
              <div>
                <strong>{user.name}</strong>
                <small>{user.email}</small>
              </div>
            </div>
          </div>
        </div>
      )}
      {mobileMenuOpen && (
        <div
          className="app-mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

// Helper function para tempo relativo
function getTimeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "agora";
  if (minutes < 60) return `${minutes}m atrás`;
  if (hours < 24) return `${hours}h atrás`;
  if (days < 7) return `${days}d atrás`;
  return new Date(date).toLocaleDateString("pt-BR");
}
