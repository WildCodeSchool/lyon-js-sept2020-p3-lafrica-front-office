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

const ForgetPassword = () => {
  const classes = useStyles();

  const { addToast } = useToasts();

  const schema = Joi.object({
    email: Joi.string()
      .required()
      .pattern(
        new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ),
  });

  const { errors, register, handleSubmit } = useForm({
    resolver: joiResolver(schema),
    mode: 'onBlur',
  });

  const submitUserData = async (data) => {
    console.log(data);
    try {
      await API.post(`/auth/forgot`, data);
      addToast(
        'Un email permettant de réinitialiser votre mot de passe vous a été envoyé',
        {
          appearance: 'success',
          autoDismiss: false,
        }
      );
    } catch {
      addToast("Cette adresse email n'est pas enregistrée.", {
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
          Mot de passe oublié
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
                id="email"
                label="Adresse e-mail"
                name="email"
                autoComplete="email"
                inputRef={register}
                error={!!errors.email}
                helperText={errors.email && 'Adresse email invalide'}
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
            Réinitialiser le mot de passe
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ForgetPassword;
