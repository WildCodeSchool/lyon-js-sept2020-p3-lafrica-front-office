import React, { useState, useEffect } from 'react';
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

import API from '../../services/API';

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
  const { paper, avatar, form, submit } = useStyles();
  const [stayConnected, setStayConnected] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();

  const initialState = {
    email: '',
    password: '',
  };

  const [userLogin, setUserLogin] = useState(initialState);
  const [userLoginToSubmit, setUserLoginToSubmit] = useState({});

  const handleUserLogin = (e) => {
    setUserLogin((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleRememberMe = () => {
    setStayConnected(!stayConnected);
  };

  const handleRedirect = () => {
    history.push('/users/:user_id/campaigns');
  };

  useEffect(() => {
    setUserLoginToSubmit({
      email: userLogin.email,
      password: userLogin.password,
      stayConnected,
    });
  }, [userLogin, stayConnected]);

  const handleSubmitUserLogin = (e) => {
    e.preventDefault();
    API.post('/auth/login', userLoginToSubmit)
      .then(() =>
        addToast('Loggin success', {
          appearance: 'success',
          autoDismiss: true,
        })
      )
      .then(() => handleRedirect())
      .catch(() =>
        addToast('SignIn failed !', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
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
        <form className={form} noValidate>
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
            value={userLogin.email}
            onChange={(e) => handleUserLogin(e)}
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
            value={userLogin.password}
            onChange={(e) => handleUserLogin(e)}
          />
          <FormControlLabel
            control={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Checkbox
                value="remember"
                color="primary"
                onClick={handleRememberMe}
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
            onClick={handleSubmitUserLogin}
          >
            S'identifier
          </Button>
          <Grid container>
            <Grid item xs>
              {/* eslint-disable-next-line */}
              <Link href="#" variant="body2">
                {' '}
                Mot de passe oublié ?
              </Link>
            </Grid>
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
