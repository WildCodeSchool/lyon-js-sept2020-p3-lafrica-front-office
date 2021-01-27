import React from 'react';
import {
  withStyles,
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(() => ({}));

const themeSlider = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const style = (theme) => ({
  root: {
    color: 'rgb(98, 186, 227)',
    // eslint-disable-next-line no-useless-computed-key
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
  },
});

const CustomSlider = withStyles(style)(Slider);

export function SpeedSlider({ handleSliderAudioConfig }) {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={themeSlider}>
      <CustomSlider
        className={classes.root}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        name="speakingRate"
        min={0.25}
        max={4.0}
        step={0.25}
        defaultValue={1.0}
        onChange={handleSliderAudioConfig('speakingRate')}
      />
    </MuiThemeProvider>
  );
}

export function PitchSlider({ handleSliderAudioConfig }) {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={themeSlider}>
      <CustomSlider
        className={classes.root}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        name="pitch"
        min={-20.0}
        max={20.0}
        step={1}
        defaultValue={0}
        onChange={handleSliderAudioConfig('pitch')}
      />{' '}
    </MuiThemeProvider>
  );
}
export function VolumeSlider({ handleSliderAudioConfig }) {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={themeSlider}>
      <CustomSlider
        className={classes.root}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        name="volumeGainDb"
        min={-3.0}
        max={3.0}
        step={1}
        defaultValue={0}
        onChange={handleSliderAudioConfig('volumeGainDb')}
      />{' '}
    </MuiThemeProvider>
  );
}
