import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(() => ({}));

const CustomSlider = withStyles({
  root: {
    color: 'rgb(98, 186, 227)',
  },
})(Slider);

export function SpeedSlider({ handleSliderAudioConfig }) {
  const classes = useStyles();

  return (
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
  );
}

export function PitchSlider({ handleSliderAudioConfig }) {
  const classes = useStyles();

  return (
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
    />
  );
}
export function VolumeSlider({ handleSliderAudioConfig }) {
  const classes = useStyles();

  return (
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
    />
  );
}
