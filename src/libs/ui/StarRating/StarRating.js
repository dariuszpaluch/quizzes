import './star_rating.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';
import icons from 'consts/icons';
import IconButton from 'libs/ui/IconButton/IconButton';

export default class StarRating extends Component {
  static propTypes = {
    size: PropTypes.number,
    maxRating: PropTypes.number,
    showLabel: PropTypes.bool,
  };

  static defaultProps = {
    maxRating: 5,
    size: 25,
    showLabel: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      hover: {},
    };
  }

  onMouseEnter = (index, enter) => {
    this.setState((prevState) => ({
      hover: {
        ...prevState.hover,
        [index]: enter,
      }
    }));
  };

  renderStar = (starIndex, selected, hover) => {
    const { onChange, size } = this.props;

    return (

      <IconButton
        className={classnames('star', {
          selected,
          hover
        })}
        key={starIndex}
        icon={icons.STAR}
        iconSize={size}
        onClick={onChange.bind(null, starIndex + 1)}
        onMouseEnter={this.onMouseEnter.bind(null, starIndex, true)}
        onMouseLeave={this.onMouseEnter.bind(null, starIndex, false)}
      />
    )

  };

  render() {
    const { className, rating, maxRating } = this.props;
    const { hover } = this.state;

    const classes = classnames('star-rating', className);

    const stars = [];

    let maxHovered = -1;

    for (let starIndex = 0; starIndex < maxRating; starIndex++) {
      const value = hover[starIndex];
      if (value) maxHovered = starIndex;
    }

    for (let starIndex = 0; starIndex < maxRating; starIndex++) {
      const hovered = starIndex <= maxHovered;
      stars.push(this.renderStar(starIndex, (maxHovered < 0 && starIndex < rating), hovered))
    }

    return (
      <div className={classes}>
        <div>{stars}</div>
      </div>
    );
  }
}