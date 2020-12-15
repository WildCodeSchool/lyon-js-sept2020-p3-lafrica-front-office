import React, { useState } from 'react';
import './login.css';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import API from '../../services/API';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '50px',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    padding: '13px',
    border: '1px solid  #bdc3c7',
    borderRadius: '5px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#5ebbea',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    '&:hover': {
      backgroundColor: '#096490',
      color: 'white',
    },
    margin: theme.spacing(3, 0, 2),
    background: '#5ebbea',
  },
}));

const SignUp = () => {
  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirmation: '',
  };

  const [userData, setUserData] = useState(initialState);
  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    phone_number: false,
    email: false,
    password: false,
    password_confirmation: false,
  });

  const handleUserData = (e) => {
    setUserData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  const handleUserErrors = (e) => {
    if (e.target.value.length === 0) {
      setErrors((prevErrors) => {
        return { ...prevErrors, [e.target.name]: true };
      });
    } else if (e.target.name === 'phone_number') {
      // Besoin de vérifier la compatibilité des numéros africains
      const regex = /^(\+|00)[0-9]?()[0-9](\s|\S)(\d[0-9]{8,12})$/;
      const isPhoneNumberValid = regex.test(e.target.value);
      if (!isPhoneNumberValid) {
        setErrors((prevErrors) => {
          return { ...prevErrors, [e.target.name]: true };
        });
      } else {
        setErrors((prevErrors) => {
          return { ...prevErrors, [e.target.name]: false };
        });
      }
    } else if (e.target.name === 'email') {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const isEmailValid = regex.test(e.target.value);

      if (!isEmailValid) {
        setErrors((prevErrors) => {
          return { ...prevErrors, [e.target.name]: true };
        });
      } else {
        setErrors((prevErrors) => {
          return { ...prevErrors, [e.target.name]: false };
        });
      }
    } else if (
      (e.target.name === 'password' ||
        e.target.name === 'password_confirmation') &&
      e.target.value.length < 5
    ) {
      setErrors((prevErrors) => {
        return { ...prevErrors, [e.target.name]: true };
      });
    } else if (
      e.target.name === 'password_confirmation' &&
      e.target.value !== userData.password
    ) {
      setErrors((prevErrors) => {
        return { ...prevErrors, [e.target.name]: true };
      });
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, [e.target.name]: false };
      });
    }
  };

  const submitUserData = (e) => {
    e.preventDefault();
    API.post('/users/signUp', userData)
      .then(() => setUserData(initialState))
      .catch(console.error);
  };

  const classes = useStyles();

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          S'enregistrer
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Prénom"
                autoFocus
                error={errors.firstname}
                helperText={errors.firstname && 'Un prénom est obligatoire'}
                value={userData.firstname}
                onChange={(e) => handleUserData(e)}
                onBlur={(e) => handleUserErrors(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Nom"
                name="lastname"
                autoComplete="lname"
                value={userData.lastname}
                helperText={errors.lastname && 'Un nom est obligatoire'}
                error={errors.lastname}
                onChange={(e) => handleUserData(e)}
                onBlur={(e) => handleUserErrors(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone_number"
                label="Telephone"
                name="phone_number"
                autoComplete="lname"
                value={userData.phone_number}
                helperText={
                  errors.phone_number && 'Un numéro valide est obligatoire'
                }
                error={errors.phone_number}
                onChange={(e) => handleUserData(e)}
                onBlur={(e) => handleUserErrors(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Adresse e-mail"
                name="email"
                autoComplete="email"
                value={userData.email}
                error={errors.email}
                helperText={errors.email && 'Adresse email invalide'}
                onChange={(e) => handleUserData(e)}
                onBlur={(e) => handleUserErrors(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userData.password}
                error={errors.password}
                helperText={
                  errors.password &&
                  "Votre mot de passe doit être d'au moins 5 caractères"
                }
                onChange={(e) => handleUserData(e)}
                onBlur={(e) => handleUserErrors(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_confirmation"
                label="Confirmation du mot de passe"
                type="password"
                id="password_confirmation"
                autoComplete="current-password"
                value={userData.password_confirmation}
                error={errors.password_confirmation}
                helperText={
                  errors.password_confirmation &&
                  'Le mot de passe et la confirmation ne sont pas identiques'
                }
                onChange={(e) => handleUserData(e)}
                onBlur={(e) => handleUserErrors(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Si vous souhaitez recevoir nos offres commerciales, merci de cocher cette case "
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitUserData}
          >
            S'enregistrer
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signIn" variant="body2">
                Vous avez déja un compte ? Connectez-vous !
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
