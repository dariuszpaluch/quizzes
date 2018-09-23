import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';

import { PieChart as PieChartRechart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';

export default class PieChart extends Component {
  static propTypes = {
  };
  
  static defaultProps = {
  };

  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  render() {
    const { className, width, height, data } = this.props;
  
    const classes = classnames(className);
    
    return(
      <ResponsiveContainer width={width} height={height}>
        <PieChartRechart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius="55%"
            outerRadius="80%"
            labelLine
            label
          >
            {data.map(entry => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />

        </PieChartRechart>
      </ResponsiveContainer>
    );
  }
}
