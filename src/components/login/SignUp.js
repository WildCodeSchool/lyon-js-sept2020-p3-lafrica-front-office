import React from 'react';
import './login.css';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';

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
  const classes = useStyles();

  const { addToast } = useToasts();

  const schema = Joi.object({
    firstname: Joi.string().max(50).required(),
    lastname: Joi.string().max(50).required(),
    phone_number: Joi.string().pattern(
      new RegExp(/^(\+|00)[0-9]?()[0-9](\s|\S)(\d[0-9]{0,})$/)
    ),
    email: Joi.string()
      .required()
      .pattern(
        new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ),
    password: Joi.string()
      .required()
      .pattern(
        new RegExp(/^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)
      ),
    password_confirmation: Joi.ref('password'),
  }).with('password', 'password_confirmation');

  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
    mode: 'onBlur',
  });

  const history = useHistory();

  const handleRedirect = () => {
    history.push('/signIn');
  };

  const submitUserData = async (data) => {
    try {
      await API.post('/users/signUp', data);
      addToast('Bienvenue sur LAfricamobile !', {
        appearance: 'success',
        autoDismiss: true,
      });
      handleRedirect();
    } catch {
      addToast("L'inscription a echouée !", {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

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
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(submitUserData)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="Prénom"
                autoFocus
                inputRef={register}
                error={!!errors.firstname}
                helperText={errors.firstname && 'Un prénom est obligatoire'}
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
                inputRef={register}
                helperText={errors.lastname && 'Un nom est obligatoire'}
                error={!!errors.lastname}
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
                inputRef={register}
                error={!!errors.phone_number}
                helperText={
                  errors.phone_number && 'Un numéro valide est obligatoire'
                }
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
                inputRef={register}
                error={!!errors.email}
                helperText={errors.email && 'Adresse email invalide'}
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
                inputRef={register}
                error={!!errors.password}
                helperText={
                  errors.password &&
                  "Votre mot de passe doit être d'au moins 6 caractères et doit contenir un chiffre, un caractère majuscule, un caractère minuscule et un caractère spécial"
                }
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
                inputRef={register}
                error={!!errors.password_confirmation}
                helperText={
                  errors.password_confirmation &&
                  'Le mot de passe et la confirmation ne sont pas identiques'
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
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
