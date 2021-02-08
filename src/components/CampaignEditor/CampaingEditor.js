import {
  InputLabel,
  NativeSelect,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from '@material-ui/core';

import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { GrCloudDownload, GrSend } from 'react-icons/gr';
import { FaMicrophone } from 'react-icons/fa';
import { IoIosPlayCircle } from 'react-icons/io';
import { FiPhoneIncoming } from 'react-icons/fi';
import { ImFolderDownload } from 'react-icons/im';
import { VscQuestion } from 'react-icons/vsc';
import {
  AiOutlineImport,
  AiOutlineExport,
  AiOutlineWarning,
} from 'react-icons/ai';
import { MdPermContactCalendar } from 'react-icons/md';
import { useToasts } from 'react-toast-notifications';
import './CampaignEditor.scss';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RiFileEditLine } from 'react-icons/ri';
import API from '../../services/API';
import {
  SpeedSlider,
  PitchSlider,
  VolumeSlider,
} from '../create campaign/subcomponents/CustomizedSlider';
import { UserContext } from '../../context/UserContext';
import ContactsView from '../create campaign/subcomponents/ContactsView';

const CampaignEditor = (props) => {
  const dateNow = new Date();
  const [campaignName, setCampaignName] = useState('');
  const [campaignDate, setCampaignDate] = useState(dateNow);
  const [messageToVocalize, setMessageToVocalize] = useState('');
  const [lastVocalizedMessage, setLastVocalizedMessage] = useState('');
  const [audioFilePath, setAudioFilePath] = useState('');
  const [downloadAudioFilePath, setDownloadAudioFilePath] = useState('');
  const [textToUpload, setTextToUpload] = useState('');
  const [fileNameTextToUpload, setFileNameTextToUpload] = useState('');
  const [contactsUpload, setContactsUpload] = useState('');
  const [fileNameContactsUpload, setFileNameContactsUpload] = useState('');
  const [audioConfig, setAudioConfig] = useState({});
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberTestCheck, setPhoneNumberTestCheck] = useState(false);
  const [vocalisationFileName, setVocalisationFileName] = useState('');
  const [contactsList, setContactsList] = useState([]);
  const [sendingLoader, setSendingLoader] = useState(false);
  const { match } = props;
  const [audioDuration, setAudioDuration] = useState();
  const [messageCounter, setMessageCounter] = useState(1);
  const [show, setShow] = useState(false);
  const [toggleContactsUpload, setToggleContactsUpload] = useState(false);

  const [
    receivedFormatDifferentFromTxtAndDocx,
    setReceivedFormatDifferentFromTxtAndDocx,
  ] = useState(false);
  const [
    receivedFormatDifferentFromXlsxAndCsv,
    setReceivedFormatDifferentFromXlsxAndCsv,
  ] = useState(false);

  const { userDetails } = useContext(UserContext);

  const { addToast } = useToasts();
  const history = useHistory();

  const handleChange = (e) => {
    setMessageToVocalize(e.target.value);
  };

  const submitTextToUpload = () => {
    const formData = new FormData();
    formData.append('uploaded_text', textToUpload);
    API.post(`/users/${userDetails.id}/campaigns/uploadtext`, formData)
      .then((res) => {
        if (receivedFormatDifferentFromTxtAndDocx) {
          setReceivedFormatDifferentFromTxtAndDocx(
            !receivedFormatDifferentFromTxtAndDocx
          );
        }
        setMessageToVocalize(res.data);
      })
      .catch(() => {
        if (!receivedFormatDifferentFromTxtAndDocx) {
          setReceivedFormatDifferentFromTxtAndDocx(
            !receivedFormatDifferentFromTxtAndDocx
          );
        }
      });
  };

  const submitContactsUpload = () => {
    const formData = new FormData();
    formData.append('uploaded_contacts', contactsUpload);
    API.post(
      `/users/${userDetails.id}/campaigns/${match.params.campaign_id}/contacts/upload`,
      formData
    )
      .then(() => {
        setToggleContactsUpload(!toggleContactsUpload);

        if (receivedFormatDifferentFromXlsxAndCsv) {
          setReceivedFormatDifferentFromXlsxAndCsv(
            !receivedFormatDifferentFromXlsxAndCsv
          );
        }
      })
      .catch(() => {
        if (!receivedFormatDifferentFromXlsxAndCsv) {
          setReceivedFormatDifferentFromXlsxAndCsv(
            !receivedFormatDifferentFromXlsxAndCsv
          );
        }
      });
  };

  const playAudioTest = () => {
    // ES lint should be disabled for Safari compatibility
    // eslint-disable-next-line jsx-a11y/media-has-caption
    return <audio id="audioPlayer" src={audioFilePath} />;
  };

  const videoFilePath = `${process.env.REACT_APP_API_BASE_URL}/users/${userDetails.id}/campaigns/video`;

  const playVideo = () => {
    return (
      // ES lint should be disabled for Safari compatibility
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video controls className="video">
        <source src={videoFilePath} type="video/mp4" />
        <p>
          Votre navigateur ne prend pas en charge les vidéos HTML5. Voici
          <a href="myVideo.mp4">un lien pour télécharger la vidéo</a>.
        </p>
      </video>
    );
  };

  useEffect(async () => {
    await API.get(
      `/users/${userDetails.id}/campaigns/${match.params.campaign_id}`
    ).then((res) => {
      if (res.data) {
        if (res.data.name !== null) {
          setCampaignName(res.data.name);
        } else {
          setCampaignName('');
        }
        if (res.data.date !== null) {
          const newDate = res.data.date.slice(0, -1);
          setCampaignDate(newDate);
        } else {
          setCampaignDate('');
        }
        if (res.data.text_message !== null) {
          setMessageToVocalize(res.data.text_message);
          setLastVocalizedMessage(res.data.text_message);
        } else {
          setMessageToVocalize('');
        }
        if (res.data.vocal_message_file_url !== null) {
          setVocalisationFileName(res.data.vocal_message_file_url);
        } else {
          setVocalisationFileName('');
        }
        setAudioFilePath(
          `${process.env.REACT_APP_API_BASE_URL}/users/${userDetails.id}/campaigns/audio?audio=${res.data.vocal_message_file_url}`
        );
        setDownloadAudioFilePath(
          `${process.env.REACT_APP_API_BASE_URL}/users/${userDetails.id}/campaigns/downloadaudio?audio=${res.data.vocal_message_file_url}`
        );
      }
    });
  }, []);

  useEffect(() => {
    if (textToUpload) {
      submitTextToUpload();
    }
  }, [textToUpload]);

  useEffect(() => {
    if (contactsUpload) {
      submitContactsUpload();
    }
  }, [contactsUpload]);

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
    API.post(`/users/${userDetails.id}/campaigns/TTS`, {
      message: messageToVocalize,
      audioConfig,
    }).then((res) => {
      setVocalisationFileName(res.data);
      setLastVocalizedMessage(messageToVocalize);
      setAudioFilePath(
        `${process.env.REACT_APP_API_BASE_URL}/users/${userDetails.id}/campaigns/audio?audio=${res.data}`
      );
      setDownloadAudioFilePath(
        `${process.env.REACT_APP_API_BASE_URL}/users/${userDetails.id}/campaigns/downloadaudio?audio=${res.data}`
      );
    });
  };

  const handleFileUpload = (e) => {
    setTextToUpload(e.target.files[0]);
    if (e.target.files[0]) {
      setFileNameTextToUpload(e.target.files[0].name);
    } else {
      setFileNameTextToUpload('');
      setReceivedFormatDifferentFromTxtAndDocx(false);
    }
  };

  const handleContactUpload = (e) => {
    setContactsUpload(e.target.files[0]);
    if (e.target.files[0]) {
      setFileNameContactsUpload(e.target.files[0].name);
    } else {
      setFileNameContactsUpload('');
      setReceivedFormatDifferentFromXlsxAndCsv(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e);
  };

  const handleCancelPhoneNumber = () => {
    setPhoneNumber('');
  };

  const sendVocalMessage = async () => {
    if (phoneNumber === '') {
      setPhoneNumberTestCheck(false);
    } else {
      setPhoneNumberTestCheck(true);

      await API.post('/voice/test', {
        phoneNumber,
        vocalisationFileName,
      });
    }
  };

  const audio = document.getElementById('audioPlayer');

  const play = () => {
    setAudioDuration();
    audio.play();

    audio.addEventListener('timeupdate', () => {
      if (!Number.isNaN(audio.duration) && audio.duration !== Infinity) {
        const duration = Math.round(audio.duration * 100) / 100;
        setAudioDuration(`${duration} s`);
      }
    });
  };

  const sendCampaign = async () => {
    setSendingLoader(true);
    setTimeout(() => {
      setSendingLoader(false);
    }, 3000);

    const campaignData = {
      user_id: userDetails.id,
      campaign_name: campaignName,
      campaign_text: messageToVocalize,
      campaign_vocal: vocalisationFileName,
      campaign_date: campaignDate,
    };
    await API.put(
      `/users/${userDetails.id}/campaigns/${match.params.campaign_id}`,
      campaignData
    ).then(() => {
      addToast('Vos modifications ont été enregistrées !', {
        appearance: 'success',
        autoDismiss: true,
      });
      history.push('/');
    });
  };

  const getMessageCounter = (message) => {
    if (message.length === 160) {
      setMessageCounter(1);
    } else {
      const length = Math.floor(message.length / 160) + 1;
      setMessageCounter(length);
    }
  };

  useEffect(() => {
    if (messageToVocalize) {
      getMessageCounter(messageToVocalize);
    }
  }, [messageToVocalize]);

  const handleCloseVideoModal = () => setShow(false);
  const handleShowVideoModal = () => setShow(true);

  return (
    <div>
      <div
        className="help-container"
        onClick={handleShowVideoModal}
        role="button"
        tabIndex={0}
        onKeyPress={() => {}}
      >
        <VscQuestion className="help-btn" />
        <p className="help-text">Besoin d'aide ?</p>
      </div>
      <div className="create-campaign-body">
        <div className="title-page-edit">
          <RiFileEditLine className="edit-logo-no-border" />
          <div className="title-page-div-edit">
            <h2 className="title-page-title-edit">Modifiez votre campagne</h2>
            <p> {campaignName} </p>
          </div>
        </div>

        <Dialog
          open={show}
          fullScreen
          onClose={handleCloseVideoModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Viéo tutoriel</DialogTitle>
          <DialogContent>
            <DialogContentText className="textVideoModal">
              Besoin d'aide ? Voici une courte vidéo pour vous aider à vous
              familiariser à notre service !
            </DialogContentText>
            {playVideo()}
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              onClick={() => {
                handleCloseVideoModal();
              }}
            >
              Retour
            </button>
          </DialogActions>
        </Dialog>

        <div className="vocal-campaign-body">
          <h3 className="vocal-campaign-title">Campagne de diffusion</h3>
          <div className="vocal-campaign-frame">
            <div className="vocal-campaign-grid">
              <p>Nom de campagne</p>
              <input
                type="text"
                className="vocal-campaign-name"
                placeholder="Votre nom de campagne"
                value={campaignName}
                onChange={(e) => {
                  setCampaignName(e.target.value);
                }}
              />
              <p>Date d'envoi</p>
              <form className="vocal-campaign-date" noValidate>
                <TextField
                  id="datetime-local"
                  type="datetime-local"
                  value={campaignDate}
                  className="textField"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setCampaignDate(e.target.value);
                  }}
                />
              </form>
            </div>
          </div>
        </div>

        <div className="vocalization-body">
          <h3 className="vocalization-title">
            Modifiez votre message à vocaliser
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
                        (formats acceptés : .txt, .docx)
                      </em>
                      {receivedFormatDifferentFromTxtAndDocx && (
                        <p className="receivedWrongFormat">
                          <AiOutlineWarning className="warning-icon" />
                          formats acceptés : .txt, .docx
                        </p>
                      )}
                    </p>
                  </div>

                  <input
                    id="textToUpload"
                    type="file"
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
            <p
              className={
                messageToVocalize && messageToVocalize.length > 160
                  ? 'warning-message-active'
                  : 'warning-message'
              }
            >
              {messageToVocalize && messageToVocalize.length}/160 caractères.{' '}
              {messageCounter > 1 &&
                `Ce message vous sera facturé l'équivalent de ${messageCounter} messages.`}
            </p>
          </div>
        </div>

        <div className="option-vocalization-body">
          <h3 className="option-vocalization-title">Options de vocalisation</h3>
          <div className="option-vocalization-frame">
            <grid-container className="option-vocalization-grid">
              <grid-item>
                <p className="option-vocalization-text">Type de voix</p>
              </grid-item>
              <grid-item className="option-vocalization-type">
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
              </grid-item>
              <grid-item>
                <p className="option-vocalization-text">Vitesse de la voix</p>
              </grid-item>
              <grid-item>
                <SpeedSlider
                  className="slider-speed"
                  handleSliderAudioConfig={handleSliderAudioConfig}
                />
              </grid-item>
              <grid-item>
                <p className="option-vocalization-text">Réalisme de la voix</p>
              </grid-item>
              <grid-item className="option-vocalization-realism">
                <InputLabel htmlFor="select" />
                <NativeSelect
                  id="select"
                  name="voiceType"
                  onChange={(e) => handleSelectAudioConfig(e)}
                >
                  <option value="Standard">Standard</option>
                  <option value="WaveNet">Réaliste</option>
                </NativeSelect>
              </grid-item>

              <grid-item>
                <p className="option-vocalization-text">Hauteur de la voix</p>
              </grid-item>
              <grid-item>
                <PitchSlider
                  handleSliderAudioConfig={handleSliderAudioConfig}
                />
              </grid-item>

              <grid-item>
                <p className="option-vocalization-text">
                  Format du fichier audio
                </p>
              </grid-item>
              <grid-item className="option-vocalization-realism">
                <InputLabel htmlFor="select" />
                <NativeSelect
                  id="select"
                  name="audioEncoding"
                  onChange={(e) => handleSelectAudioConfig(e)}
                >
                  <option value="MP3">mp3</option>
                  <option value="LINEAR16">wav</option>
                </NativeSelect>
              </grid-item>
              <grid-item>
                <p className="option-vocalization-text">Volume de la voix</p>
              </grid-item>
              <VolumeSlider handleSliderAudioConfig={handleSliderAudioConfig} />
            </grid-container>

            {audioConfig.voiceType === 'WaveNet' && (
              <p className="alert-message">
                Une voix réaliste engendre un surcoût de facturation.
              </p>
            )}

            <div className="vocalization-action">
              <div className="vocalization-action-vocalize">
                {lastVocalizedMessage !== messageToVocalize &&
                messageToVocalize ? (
                  <FaMicrophone
                    className="vocalization-action-icon"
                    onClick={sendToGTTS}
                  />
                ) : (
                  <FaMicrophone className="vocalization-action-icon-grey" />
                )}

                <p
                  className={
                    lastVocalizedMessage !== messageToVocalize &&
                    messageToVocalize
                      ? 'blue'
                      : null
                  }
                >
                  Vocaliser votre message
                </p>
              </div>
              <div className="vocalization-action-test">
                {lastVocalizedMessage === messageToVocalize &&
                messageToVocalize ? (
                  <IoIosPlayCircle
                    onClick={play}
                    className="vocalization-action-icon"
                  />
                ) : (
                  <IoIosPlayCircle className="vocalization-action-icon-grey" />
                )}
                <p
                  className={
                    lastVocalizedMessage === messageToVocalize &&
                    messageToVocalize
                      ? 'blue'
                      : null
                  }
                >
                  Ecouter votre message
                </p>
                {playAudioTest()}
                <p className="audio-duration">
                  {audio && `Durée : ${audioDuration || 'calcul...'}`}
                </p>
              </div>
              <div className="vocalization-action-download">
                {lastVocalizedMessage === messageToVocalize &&
                messageToVocalize ? (
                  <div>
                    <a href={downloadAudioFilePath}>
                      <ImFolderDownload className="vocalization-action-icon" />
                    </a>
                  </div>
                ) : (
                  <a href={downloadAudioFilePath}>
                    <ImFolderDownload className="vocalization-action-icon-grey" />
                  </a>
                )}

                <p
                  className={
                    lastVocalizedMessage === messageToVocalize &&
                    messageToVocalize
                      ? 'blue'
                      : null
                  }
                >
                  Télécharger le fichier audio
                </p>
              </div>
              <div className="vocalization-action-trySend">
                {lastVocalizedMessage === messageToVocalize &&
                messageToVocalize ? (
                  <FiPhoneIncoming
                    className="vocalization-action-icon"
                    onClick={handleClickOpen}
                  />
                ) : (
                  <FiPhoneIncoming className="vocalization-action-icon-grey" />
                )}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Entrer un numéro
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Pour tester la vocalisation de votre message vers un
                      numéro mobile, merci d'inscrire ci-dessous un numéro de
                      téléphone
                    </DialogContentText>
                    <PhoneInput
                      country="fr"
                      value={phoneNumber}
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

                <p
                  className={
                    lastVocalizedMessage === messageToVocalize &&
                    messageToVocalize
                      ? 'blue'
                      : null
                  }
                >
                  Tester un envoi
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="broadcast-list-body">
          <h3 className="broadcast-list-title">Liste de diffusion</h3>
          <div className="broadcast-list-frame">
            <div className="broadcast-list-title">
              <MdPermContactCalendar className="broadcast-icon" />
              <h2>Gérer votre liste de diffusion</h2>
              <h3>Ajoutez, modifiez ou supprimez un contact</h3>
            </div>

            <div className="broadcast-list-grid">
              <div className="broadcast-list-import">
                <label htmlFor="contactsUpload" className="contacts-upload">
                  <AiOutlineImport className="broadcast-list-icon" />
                  <p
                    className={
                      !fileNameContactsUpload
                        ? 'fileNotYetUploaded'
                        : 'fileUploaded'
                    }
                  >
                    {!fileNameContactsUpload
                      ? 'Importer une liste de diffusion'
                      : fileNameContactsUpload}
                    <br />
                    <em className={!fileNameContactsUpload ? '' : 'hidden'}>
                      (formats acceptés : .xlsx, .csv)
                    </em>
                    {receivedFormatDifferentFromXlsxAndCsv && (
                      <p className="receivedWrongFormat">
                        <AiOutlineWarning className="warning-icon" />
                        Le fichier doit être au format .xlsx ou .csv et
                        respecter une structure identique à celle fournie dans
                        le fichier template
                      </p>
                    )}
                  </p>

                  <input
                    id="contactsUpload"
                    type="file"
                    hidden
                    onChange={(e) => {
                      handleContactUpload(e);
                    }}
                  />
                </label>
              </div>
              <a
                target="_blank"
                rel="noreferrer"
                href={`${process.env.REACT_APP_API_BASE_URL}/users/${userDetails.id}/campaigns/${match.params.campaign_id}/contacts/exportContacts`}
                className="broadcast-list-export"
              >
                <AiOutlineExport className="broadcast-list-icon" />
                <p className="fileNotYetUploaded">
                  Exporter une liste de diffusion
                </p>
              </a>
            </div>
            <a
              href={`${process.env.REACT_APP_API_BASE_URL}/template`}
              className="template"
            >
              Modèle téléchargeable
            </a>
            <p className="alert-phone-number">
              Pensez à vérifier les indicateurs téléphoniques de vos contacts
            </p>
            <ContactsView
              className="broadcast-list-array"
              contactsList={contactsList}
              setContactsList={setContactsList}
              campaignId={match.params.campaign_id}
              setToggleContactsUpload={setToggleContactsUpload}
              toggleContactsUpload={toggleContactsUpload}
              route="editcampaign"
            />
          </div>
        </div>

        <button className="sendCampaign" type="button" onClick={sendCampaign}>
          <div
            className={
              sendingLoader
                ? 'sendCampaign-loader-on'
                : 'sendCampaign-loader-off'
            }
          >
            <CircularProgress />
          </div>
          <GrSend className="sendCampaignIcon" />
          <h3>Sauvegarder vos modifications</h3>
        </button>
      </div>
    </div>
  );
};

export default CampaignEditor;
