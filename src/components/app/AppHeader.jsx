import React, { useState } from "react";
import { Menu, Bell } from "lucide-react";
import "./AppHeader.css";

const LogoMark = ({ size = 34 }) => (
  <div className="app-logo">
    <img src="/assets/logo.svg" alt="Ludoteca" width={size} height={size} />
    <span>Ludoteca</span>
  </div>
);

export const AppHeader = ({ activeTab, onChangeTab, tabs, onOpenHelp }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="app-header">
        <div className="ludo-container header-inner">
          <LogoMark />

          <div className="header-middle">
            <div className="tab-group">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`tab-pill ${activeTab === tab.key ? "active" : ""}`}
                  onClick={() => onChangeTab(tab.key)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              className="btn btn-ghost app-menu-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Abrir menu"
              type="button"
            >
              <Menu />
            </button>
          </div>

          <div className="header-actions">
            <button
              className="btn btn-outline"
              type="button"
              onClick={onOpenHelp}
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Bell size={16} /> Ajuda
            </button>
            <div className="profile-chip">
              <div>
                <strong>Gabriel Silva</strong>
                <small>gabriel@ludoteca.app</small>
              </div>
              <div className="avatar-mini">GS</div>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="app-mobile-menu">
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
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>
      {mobileMenuOpen && (
        <div
          className="app-mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

