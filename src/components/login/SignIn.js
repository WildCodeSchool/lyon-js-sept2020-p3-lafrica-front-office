import React, { useContext } from 'react';
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
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import API from '../../services/API';
import { UserContext } from '../../context/UserContext';

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(1),
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

const SignIn = () => {
  const { setUserDetails } = useContext(UserContext);
  const { paper, avatar, form, submit } = useStyles();
  const { addToast } = useToasts();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({ mode: 'onBlur' });

  const handleRedirect = (userId) => {
    history.push(`/users/${userId}/campaigns`);
  };

  const handleSubmitUserLogin = async (data) => {
    try {
      const res = await API.post('/auth/login', data);
      await setUserDetails({
        firstname: res.data.firstname,
        lastname: res.data.lastname,
      });
      handleRedirect(res.data.id);

      addToast('Connexion réussie !', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch {
      addToast('Identifiants invalides !', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={paper}>
        <Avatar className={avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          S'identifier
        </Typography>
        <form
          className={form}
          noValidate
          onSubmit={handleSubmit(handleSubmitUserLogin)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register({
              required: true,
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Veuillez saisir un email valide',
              },
            })}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({
              required: true,
              minLength: {
                value: 6,
                message: 'Le mot de passe doit contenir au moins 6 caractères',
              },
            })}
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
          />
          <FormControlLabel
            control={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Checkbox
                color="primary"
                name="stayConnected"
                inputRef={register}
              />
            }
            label="Se rappeler de moi"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submit}
          >
            S'identifier
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signUp" variant="body2">
                Pas de compte ? Inscrivez-vous !
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default SignIn;
