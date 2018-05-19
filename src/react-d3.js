import React from 'react';

export default D3Chart => class ReactChart extends React.Component {
  constructor(props) {
    super(props);
    this.chart = null;
  }

  componentDidMount() {
    this.chart = new D3Chart(this.refs.chart, this.props);
  }

  componentDidUpdate() {
    this.chart && this.chart.update && this.chart.update(this.refs.chart, this.props);
  }

  componentWillUnmount() {
    this.chart && this.chart.destroy && this.chart.destroy(this.refs.chart);
  }

  render() {
    return <div ref="chart" style={{height: '100%'}}></div>;
  }
};
