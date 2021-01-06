import { InputLabel, NativeSelect, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { GrCloudDownload } from 'react-icons/gr';
import { FaMicrophone, FaPlusCircle } from 'react-icons/fa';
import { IoIosPlayCircle } from 'react-icons/io';
import { ImFolderDownload } from 'react-icons/im';
import { AiOutlineImport, AiOutlineExport } from 'react-icons/ai';
import './CreateCampaign.scss';
import API from '../../services/API';
import textToSpeechIcon from '../../images/text_to_speech.png';
import {
  SpeedSlider,
  PitchSlider,
  VolumeSlider,
} from './subcomponents/CustomizedSlider';

const CreateCampaign = (props) => {
  const [messageToVocalize, setMessageToVocalize] = useState('');
  const [audioFilePath, setAudioFilePath] = useState('');
  const [textToUpload, setTextToUpload] = useState('');
  const [fileNameTextToUpload, setFileNameTextToUpload] = useState('');
  const [audioConfig, setAudioConfig] = useState({});

  const { match } = props;

  const handleChange = (e) => {
    setMessageToVocalize(e.target.value);
  };

  const submitTextToUpload = () => {
    const formData = new FormData();
    formData.append('uploaded_text', textToUpload);
    API.post(`/users/${match.params.user_id}/campaigns/uploadtext`, formData)
      .then((res) => {
        setMessageToVocalize(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (textToUpload) {
      submitTextToUpload();
    }
  }, [textToUpload]);

  const handleSliderAudioConfig = (name) => (e, value) => {
    setAudioConfig((prevConfig) => {
      return { ...prevConfig, [name]: value };
    });
  };
  const handleSelectAudioConfig = (e) => {
    setAudioConfig((prevConfig) => {
      return { ...prevConfig, [e.target.name]: e.target.value };
    });
  };

  const sendToGTTS = () => {
    API.post(`/users/${match.params.user_id}/campaigns/TTS`, {
      message: messageToVocalize,
      audioConfig,
    })
      .then((res) => {
        setAudioFilePath(
          `${process.env.REACT_APP_API_BASE_URL}/users/${match.params.user_id}/campaigns/audio?audio=${res.data}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const playAudioTest = () => {
    return (
      <audio controls src={audioFilePath}>
        <track default kind="captions" srcLang="fr" />
      </audio>
    );
  };

  const handleFileUpload = (e) => {
    setTextToUpload(e.target.files[0]);
    if (e.target.files[0]) {
      setFileNameTextToUpload(e.target.files[0].name);
    } else {
      setFileNameTextToUpload('');
    }
  };

  return (
    <div className="create-campaign-body">
      <div className="title-page">
        <img src={textToSpeechIcon} alt="push vocal icon" />
        <h2 className="title-page-title">PUSH VOCAL</h2>
        <p> : élargir votre audience en envoyant des messages vocaux </p>
      </div>

      <div className="vocal-campaign-body">
        <h3 className="vocal-campaign-title">Campagne de diffusion</h3>
        <div className="vocal-campaign-frame">
          <div className="vocal-campaign-grid">
            <p>Nom de campagne</p>
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
          <form>
            <div className="text-download">
              <label htmlFor="textToUpload">
                <div className="flexForm">
                  <GrCloudDownload className="download-icon" />
                  <p
                    className={
                      !fileNameTextToUpload
                        ? 'fileNotYetUploaded'
                        : 'fileUploaded'
                    }
                  >
                    {!fileNameTextToUpload
                      ? 'Importer un message'
                      : fileNameTextToUpload}
                    <br />
                    <em className={!fileNameTextToUpload ? '' : 'hidden'}>
                      (format accepté : .txt)
                    </em>
                  </p>
                </div>
                <input
                  id="textToUpload"
                  type="file"
                  accept=".txt"
                  hidden
                  onChange={(e) => {
                    handleFileUpload(e);
                  }}
                />
              </label>
            </div>
            <textarea
              className="text-to-vocalize"
              placeholder="Ecrivez votre message à vocaliser ici..."
              value={messageToVocalize}
              onChange={handleChange}
            />
          </form>
          <p className="warning-message">
            Message d'alerte en cas de dépassement de caractères
          </p>
        </div>
      </div>

      <div className="option-vocalization-body">
        <h3 className="option-vocalization-title">Options de vocalisation</h3>
        <div className="option-vocalization-frame">
          <div className="option-vocalization-grid">
            <p>Type de voix</p>
            <div className="option-vocalization-type">
              <InputLabel htmlFor="select" />
              <NativeSelect
                id="select"
                name="voiceGender"
                onChange={(e) => handleSelectAudioConfig(e)}
              >
                <option value="A">Femme 1</option>
                <option value="B">Homme 1</option>
                <option value="C">Femme 2</option>
                <option value="D">Homme 2</option>
                <option value="E">Femme 3</option>
              </NativeSelect>
            </div>
            <p>Vitesse de la voix</p>

            <SpeedSlider handleSliderAudioConfig={handleSliderAudioConfig} />
            <p>Réalisme de la voix</p>
            <div className="option-vocalization-realism">
              <InputLabel htmlFor="select" />
              <NativeSelect
                id="select"
                name="voiceType"
                onChange={(e) => handleSelectAudioConfig(e)}
              >
                <option value="Standard">Standard</option>
                <option value="WaveNet">Réaliste</option>
              </NativeSelect>
            </div>

            <p>Hauteur de la voix</p>
            <PitchSlider handleSliderAudioConfig={handleSliderAudioConfig} />

            <p>Format du fichier audio</p>
            <div className="option-vocalization-realism">
              <InputLabel htmlFor="select" />
              <NativeSelect
                id="select"
                name="audioEncoding"
                onChange={(e) => handleSelectAudioConfig(e)}
              >
                <option value="MP3">mp3</option>
                <option value="LINEAR16">wav</option>
              </NativeSelect>
            </div>

            <p>Volume de la voix</p>
            <VolumeSlider handleSliderAudioConfig={handleSliderAudioConfig} />
          </div>
        </div>

        {audioConfig.voiceType === 'WaveNet' && (
          <p className="alert-message">
            Une voix réaliste engendre un surcoût de facturation.
          </p>
        )}

        <div className="vocalization-action">
          <div className="vocalization-action-vocalize">
            <FaMicrophone
              className="vocalization-action-icon"
              onClick={sendToGTTS}
            />
            <p>Vocaliser votre message</p>
          </div>
          <div className="vocalization-action-test">
            <IoIosPlayCircle className="vocalization-action-icon" />
            <p>Ecouter votre message</p>
            {playAudioTest()}
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

      {/* permet d'envoyer tous les éléments du formulaire à a BDD */}
      <button type="button" onClick={sendToGTTS}>
        Vocaliser
      </button>
    </div>
  );
};

export default CreateCampaign;
