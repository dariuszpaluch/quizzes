import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  ResponsiveContainer,
  BarChart as BarChartRecharts,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts';

export default class BarChart extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, width, height, data, bars, dataKey } = this.props;

    const classes = classnames(className);

    return (
      <ResponsiveContainer width={width} height={height}>
        <BarChartRecharts data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {bars.map(bar => <Bar key={bar.dataKey} {...bar} dataKey={bar.dataKey} fill={bar.fill} />)}
        </BarChartRecharts>
      </ResponsiveContainer>
    );
  }
}
