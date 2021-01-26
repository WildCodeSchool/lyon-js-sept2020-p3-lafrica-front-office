import React from 'react';
import './login.css';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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

const ResetPassword = (props) => {
  const classes = useStyles();
  const { match } = props;

  const { addToast } = useToasts();

  const schema = Joi.object({
    password: Joi.string()
      .required()
      .pattern(
        new RegExp(/^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)
      ),
    password_confirmation: Joi.ref('password'),
  }).with('password', 'password_confirmation');

  const { errors, register, handleSubmit } = useForm({
    resolver: joiResolver(schema),
    mode: 'onBlur',
  });

  const history = useHistory();

  const handleRedirect = () => {
    history.push('/signIn');
  };

  const submitUserData = async (data) => {
    try {
      await API.post(`/auth/reset/${match.params.token}`, data);
      addToast('Mot de passe réinitialisé avec succès!', {
        appearance: 'success',
        autoDismiss: true,
      });
      handleRedirect();
    } catch {
      addToast('La réinitialisation du mot de passe a échoué', {
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
          Réinitialisation du mot de passe
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(submitUserData)}
        >
          <Grid container spacing={2}>
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
            Enregistrer le nouveau mot de passe{' '}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;
