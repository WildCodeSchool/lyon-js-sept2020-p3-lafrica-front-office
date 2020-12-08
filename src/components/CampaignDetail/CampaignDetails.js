import React from "react";
import "./CampaignDetails.scss";
import { FaMicrophone } from "react-icons/fa";
import { BiExport } from "react-icons/bi";
import { RiFileEditLine } from "react-icons/ri";

const CampaignDetail = () => {
  return (
    <>
      <div className="campaign-main-container">
        <div className="campaign-intro">
          <FaMicrophone className="micro-logo" />
          <div>
            <h2>Campagne</h2>
            <h3>Nom de la campagne</h3>
          </div>
        </div>

        <div className="campaign-information">
          <table className="campaign-table">
            <tbody>
              <tr>
                <td>Date d'envoi :</td>
                <td>02/01/2021</td>
              </tr>
              <tr>
                <td>Liste de diffusion :</td>
                <td>Liste n°1</td>
              </tr>
              <tr>
                <td>Statut: </td>
                <td>En cours</td>
              </tr>
            </tbody>
          </table>
          <div className="edit-campaign">
            <RiFileEditLine className="edit-logo" />
            Modifier ma campagne
          </div>
        </div>
        <div className="statistiques">
          <div className="export-statistiques">
            <BiExport className="export-logo" />
            <p>Exporter mes statistiques</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignDetail;
