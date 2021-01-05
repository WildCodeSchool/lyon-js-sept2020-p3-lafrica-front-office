import {
  InputLabel,
  NativeSelect,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import React, { useState } from 'react';
import { GrCloudDownload } from 'react-icons/gr';
import { FaMicrophone, FaPlusCircle } from 'react-icons/fa';
import { IoIosPlayCircle } from 'react-icons/io';
import { FiPhoneIncoming } from 'react-icons/fi';
import { ImFolderDownload } from 'react-icons/im';
import { AiOutlineImport, AiOutlineExport } from 'react-icons/ai';
import './CreateCampaign.scss';
import API from '../../services/API';
import textToSpeechIcon from '../../images/text_to_speech.png';
import CustomizedSlider from './subcomponents/CustomizedSlider';

const CreateCampaign = (props) => {
  const [messageToVocalize, setMessageToVocalize] = useState('');
  const [audioFilePath, setAudioFilePath] = useState('');
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberTestCheck, setPhoneNumberTestCheck] = useState(false);
  const [vocalisationFileName, setVocalisationFileName] = useState('');

  const { match } = props;

  const handleChange = (e) => {
    setMessageToVocalize(e.target.value);
  };
  const sendToGTTS = () => {
    API.post(`/users/${match.params.user_id}/campaigns/TTS`, {
      message: messageToVocalize,
    })
      .then((res) => {
        setVocalisationFileName(res.data);
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
      <audio id="audioPlayer" src={audioFilePath}>
        <track default kind="captions" srcLang="fr" />
      </audio>
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleCancelPhoneNumber = () => {
    setPhoneNumber('Entrer un numéro');
  };

  const sendVocalMessage = async () => {
    if (phoneNumber === '') {
      setPhoneNumberTestCheck(false);
    } else {
      setPhoneNumberTestCheck(true);
      // loaderON
      // setPhoneNumber('Message envoyé');

      await API.post('/voice/sendVocalMessage/test', {
        phoneNumber,
        vocalisationFileName,
      });
      // LoaderOFF
    }
  };

  const play = () => {
    const audio = document.getElementById('audioPlayer');
    audio.play();
  };

  // const dlVocal = () => {
  //   const audioDl = document.getElementById('audioPlayer');
  //   audioDl.download();
  // };

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
            value={messageToVocalize}
            onChange={handleChange}
          />
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
              <InputLabel htmlFor="select" />
              <NativeSelect id="select">
                <option value="10">Français</option>
                <option value="20">Autre</option>
              </NativeSelect>
            </div>
            <p>Vitesse de la voix</p>
            <CustomizedSlider />
            <p>Type de voix</p>
            <div className="option-vocalization-type">
              <InputLabel htmlFor="select" />
              <NativeSelect id="select">
                <option value="10">Homme</option>
                <option value="20">Femme</option>
              </NativeSelect>
            </div>
            <p>Hauteur de la voix</p>
            <CustomizedSlider />
            <p>Réalisme de la voix</p>
            <div className="option-vocalization-realism">
              <InputLabel htmlFor="select" />
              <NativeSelect id="select">
                <option value="10">Standard</option>
                <option value="20">Réaliste</option>
              </NativeSelect>
            </div>
          </div>
        </div>
        <div className="vocalization-action">
          <div className="vocalization-action-vocalize">
            <FaMicrophone
              className="vocalization-action-icon"
              onClick={sendToGTTS}
            />
            <p>Vocaliser votre message</p>
          </div>
          <div className="vocalization-action-test">
            <IoIosPlayCircle
              onClick={play}
              className="vocalization-action-icon"
            />
            <p>Ecouter votre message</p>
            {playAudioTest()}
          </div>
          <div className="vocalization-action-download">
            <a href={audioFilePath} download={vocalisationFileName}>
              <ImFolderDownload className="vocalization-action-icon" />
            </a>

            <p>Télécharger le fichier audio</p>
          </div>
          <div />
          <div className="vocalization-action-trySend">
            <FiPhoneIncoming
              className="vocalization-action-icon"
              onClick={handleClickOpen}
            />
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Entrer un numéro</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Pour tester la vocalisation de votre message vers un numéro
                  mobile, merci d'inscrire ci-dessous un numéro de téléphone
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="tel"
                  label="Numéro de téléphone"
                  type="tel"
                  fullWidth
                  onChange={handleChangePhoneNumber}
                />
                <small>
                  Exemple: <strong>33</strong>603190988 pour la France
                </small>
              </DialogContent>
              <DialogActions>
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    handleCancelPhoneNumber();
                  }}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sendVocalMessage();
                    handleClose();
                  }}
                  className={
                    phoneNumberTestCheck
                      ? 'vocalization-action-dialog-ok'
                      : 'vocalization-action-dialog-error'
                  }
                >
                  Envoyer
                </button>
              </DialogActions>
            </Dialog>

            <p>Tester un envoi</p>
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
