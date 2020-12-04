import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({}));

const CustomSlider = withStyles({
  root: {
    color: 'rgb(98, 186, 227)',
  },
})(Slider);

export default function CustomizedSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.margin} />
      <CustomSlider
        valueLabelDisplay='auto'
        aria-label='pretto slider'
        defaultValue={20}
      />
    </div>
  );
}
