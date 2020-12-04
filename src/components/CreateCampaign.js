import { InputLabel, NativeSelect, Slider, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { GrCloudDownload } from "react-icons/gr";
import { FaMicrophone, FaPlusCircle } from "react-icons/fa";
import { IoIosPlayCircle } from "react-icons/io";
import { ImFolderDownload } from "react-icons/im";
import { AiOutlineImport, AiOutlineExport } from "react-icons/ai";
import "./CreateCampaign.scss";
import textToSpeechIcon from "../images/text_to_speech.png";

const CreateCampaign = () => {
  return (
    <div className="create-campaign-body">
      <div className="title-page">
        <img src={textToSpeechIcon} alt="push vocal icon"></img>
        <h2 className="title-page-title">PUSH VOCAL</h2>
        <p> : élargir votre audience en envoyant des messages vocaux </p>
      </div>

      <div className="vocal-campaign-body">
        <h3 className="vocal-campaign-title">Campagne de diffusion</h3>
        <div className="vocal-campaign-frame">
          <div className="vocal-campaign-grid">
            <p>Nom de campagne</p>
            {/* <InputLabel htmlFor='select'></InputLabel> */}
            <NativeSelect className="vocal-campaign-name" id="select">
              <option value="10">Mon nom de campagne</option>
              <option value="20">Une autre campagne</option>
            </NativeSelect>
            <p>Date d'envoi</p>
            <form className="vocal-campaign-date" noValidate>
              <TextField
                id="datetime-local"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className="textField"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </div>
        </div>
      </div>

      <div className="vocalization-body">
        <h3 className="vocalization-title">
          Saisissez votre message à vocaliser (160 caractères maximum)
        </h3>
        <div className="vocalization-frame">
          <div className="text-download">
            <GrCloudDownload className="download-icon" />
            <p>Importer un message</p>
          </div>
          <textarea
            className="text-to-vocalize"
            placeholder="Ecrivez votre message à vocaliser ici..."
          ></textarea>
          <p className="warning-message">
            Message d'alerte en cas de dépassement de caractères
          </p>
        </div>
      </div>

      <div className="option-vocalization-body">
        <h3 className="option-vocalization-title">Options de vocalisation</h3>
        <div className="option-vocalization-frame">
          <div className="option-vocalization-grid">
            <p>Language</p>
            <div className="option-vocalization-language">
              <InputLabel htmlFor="select"></InputLabel>
              <NativeSelect id="select">
                <option value="10">Français</option>
                <option value="20">Autre</option>
              </NativeSelect>
            </div>
            <p>Vitesse de la voix</p>
            <Slider
              defaultValue={50}
              // getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-small-steps"
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
            <p>Type de voix</p>
            <div className="option-vocalization-type">
              <InputLabel htmlFor="select"></InputLabel>
              <NativeSelect id="select">
                <option value="10">Homme</option>
                <option value="20">Femme</option>
              </NativeSelect>
            </div>
            <p>Hauteur de la voix</p>
            <Slider
              defaultValue={50}
              // getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-small-steps"
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
            <p>Réalisme de la voix</p>
            <div className="option-vocalization-realism">
              <InputLabel htmlFor="select"></InputLabel>
              <NativeSelect id="select">
                <option value="10">Standard</option>
                <option value="20">Réaliste</option>
              </NativeSelect>
            </div>
          </div>
        </div>
        <div className="vocalization-action">
          <div className="vocalization-action-vocalize">
            <FaMicrophone className="vocalization-action-icon" />
            <p>Vocaliser votre message</p>
          </div>
          <div className="vocalization-action-test">
            <IoIosPlayCircle className="vocalization-action-icon" />
            <p>Ecouter votre message</p>
          </div>
          <div className="vocalization-action-download">
            <ImFolderDownload className="vocalization-action-icon" />
            <p>Télécharger le fichier audio</p>
          </div>
        </div>
      </div>

      <div className="broadcast-list-body">
        <h3 className="broadcast-list-title">Liste de diffusion</h3>
        <div className="broadcast-list-frame">
          <div className="broadcast-list-grid">
            <div className="broadcast-list-import">
              <AiOutlineImport className="broadcast-list-icon" />
              <p>Importer une liste de diffusion</p>
            </div>
            <div className="broadcast-list-export">
              <AiOutlineExport className="broadcast-list-icon" />
              <p>Importer une liste de diffusion</p>
            </div>
            <div className="broadcast-list-download">
              <FaPlusCircle className="broadcast-list-icon" />
              <p>Télécharger le fichier audio</p>
            </div>
          </div>
          <table className="broadcast-list-array">
            <tbody>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Téléphone</th>
                <th>Mail</th>
              </tr>
              <tr>
                <td>DUCRET</td>
                <td>Jean</td>
                <td>06.06.06.06.06</td>
                <td>mail@mail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
