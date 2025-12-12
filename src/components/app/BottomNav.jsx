import React from "react";
import "./BottomNav.css";

export const BottomNav = ({ activeTab, onChangeTab, tabs }) => {
  return (
    <div className="bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={activeTab === tab.key ? "active" : ""}
          onClick={() => onChangeTab(tab.key)}
          type="button"
        >
          <tab.icon size={18} />
          {tab.label}
        </button>
      ))}
    </div>
  );
};

