import React from "react";
import "./CampaignsView.css";
import { FaMicrophone } from "react-icons/fa";
import { GoMegaphone } from "react-icons/go";
import { BiEdit, BiSearchAlt2 } from "react-icons/bi";

const campaignsList = [
  {
    id: 1,
    name: "Campagne 1",
    sendingDate: "02/05/2022",
    status: "en cours",
  },
  {
    id: 2,
    name: "Campagne 2",
    sendingDate: "06/05/2024",
    status: "en attente",
  },
  {
    id: 3,
    name: "Campagne 3",
    sendingDate: "19/01/2019",
    status: "terminée",
  },
];

const CampaignsView = () => {
  return (
    <div className="compaigns-view-container">
      <article className="campaings-editor-view-container">
        <div className="campaigns-editor-view">
          <div className="title">
            <FaMicrophone className="microphone-icon" />
            <h2>NOS SOLUTIONS DE VOCALISATION</h2>
          </div>
          <div className="btn-container">
            <div className="megaphone">
              <GoMegaphone className="btn-icon" />

              <h3>Créer une campagne</h3>
            </div>
            <div className="edit">
              <BiEdit className="btn-icon" />
              <h3>Editer / ré-utiliser une campagne </h3>
            </div>
          </div>
        </div>
      </article>
      <article className="campaigns-list-container">
        <div className="campaigns-list">
          <div className="filter-container">
            <p>Voir pour système de filtre et de tri</p>
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th className="stylized-th">Nom</th>
                <th className="stylized-th">Date d'envoi</th>
                <th className="stylized-th">Statut</th>
              </tr>
            </thead>
            <tbody>
              {campaignsList.map((campaign) => {
                return (
                  <tr key={campaign.id}>
                    <td>
                      <BiSearchAlt2 className="search-icon" />
                    </td>
                    <td className="stylized-td">{campaign.name}</td>
                    <td className="stylized-td">{campaign.sendingDate}</td>
                    <td className="stylized-td">
                      <span className="status finished-status"></span>
                      {campaign.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
};

export default CampaignsView;
