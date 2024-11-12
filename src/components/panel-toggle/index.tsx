import React from "react";

type PanelToggleProps = {
  activeTab: string;
  handleTabChange: (tabId: string) => void;
};
export const PanelToggle = ({ activeTab, handleTabChange }: PanelToggleProps) => {
  const tabs = [
    { id: "email-tab", label: "Email" },
    { id: "sso-tab", label: "SSO" },
  ];

  return (
    <ul className="nav nav-tabs tabs-container mb-4" role="tablist">
      {tabs.map((tab) => (
        <li className="nav-item flex-grow-1" role="presentation" key={tab.id}>
          <button className={`nav-link ${activeTab === tab.id ? "active" : ""} w-100`} onClick={() => handleTabChange(tab.id)} type="button">
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
};
