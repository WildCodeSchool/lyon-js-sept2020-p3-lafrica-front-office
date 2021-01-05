import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(() => ({}));

const CustomSlider = withStyles({
  root: {
    color: 'rgb(98, 186, 227)',
  },
})(Slider);

export function SpeedSlider({ handleAudioConfig }) {
  const classes = useStyles();

  return (
    <CustomSlider
      className={classes.root}
      valueLabelDisplay="auto"
      aria-label="pretto slider"
      name="speekingRate"
      min={0.25}
      max={4.0}
      step={0.25}
      defaultValue={1}
      onChange={handleAudioConfig('speekingRate')}
    />
  );
}

export function PitchSlider({ handleAudioConfig }) {
  const classes = useStyles();

  return (
    <CustomSlider
      className={classes.root}
      valueLabelDisplay="auto"
      aria-label="pretto slider"
      name="pitch"
      min={-20}
      max={20}
      step={1}
      defaultValue={0}
      onChange={handleAudioConfig('pitch')}
    />
  );
}
