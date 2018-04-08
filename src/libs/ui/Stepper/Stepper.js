import './stepper.scss';

import React from 'react';
import PropTypes from 'prop-types'

import MobileStepper from 'material-ui/MobileStepper';
import Button from 'libs/ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';


import classnames from 'classnames';
import icons from 'consts/icons';
import Icon from 'libs/ui/Icon/Icon';
import Typography from 'libs/ui/Typography/Typography';

const propTypes = {
  className: PropTypes.string,
  steps: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  disabledNext: PropTypes.bool,
  disabledPrev: PropTypes.bool,
  activeStep: PropTypes.number.isRequired,
  prevLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  stepLabel: PropTypes.string,
};

const defaultProps = {
  className: null,
  disabledNext: false,
  disabledPrev: false,
  prevLabel: 'Prev',
  nextLabel: 'Next',
  stepLabel: '',
};

const Stepper = ({
                   className,
                   steps,
                   onNext,
                   onPrev,
                   disabledNext,
                   disabledPrev,
                   activeStep,
                   prevLabel,
                   nextLabel,
                   stepLabel
}) => {

  const classes = classnames('stepper', className);

  return (
    <div className={classes}>
      <MobileStepper
        key="stepper"
        variant="progress"
        steps={steps}
        position="static"
        activeStep={activeStep}
        className={classes}
        backButton={
          <Button
            className="prev-button"
            size="small"
            variant='flat'
            onClick={onPrev}
            disabled={disabledPrev}
          ><Icon className="prev-icon" icon={icons.ARROW_LEFT} size={25}/>{prevLabel}</Button>
        }
        nextButton={
          <Button
            className="next-button"
            size="small"
            variant='flat'
            onClick={onNext}
            disabled={disabledNext}
          >{nextLabel}<Icon icon={icons.ARROW_RIGHT} size={25}/></Button>
        }
      />
      <Typography className="stepper-label">{stepLabel || `Step ${activeStep + 1} of ${steps}`}</Typography>
    </div>
  )
};

Stepper.propTypes = propTypes;
Stepper.defaultProps = defaultProps;

export default Stepper;

