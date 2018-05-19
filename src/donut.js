import d3 from 'd3';

export default class Donut {
  constructor(el, props={}) {
    this.svg = d3.select(el).append('svg');
    this.g = this.svg.append('svg:g');
    this.update(el, props);
  }

  update(el, props={}) {
    const { width, height } = props.size;
    const color = d3.scale.category20c();
    const pie = d3.layout.pie().value(d => d.value).sort(null);
    const radius = Math.min(width, height) / 2.2;
    const arc = d3.svg.arc().innerRadius(radius * props.donutCoeff).outerRadius(radius);
    const arclight = d3.svg.arc().innerRadius(radius * props.donutCoeff).outerRadius(radius * 1.1);
    const awfulComparator = d => d.data.label === (props.selectedSector && props.selectedSector.label);
    const transitions = (el, way) => {
      switch(way) {
        case 0: // light
          el.transition().attr('d', arclight);
          break;
        case 1: // dark
          el.transition().duration(500).ease('elastic').attr('d', arc);
          break;
      }
    };

    const eventObj = {
      mouseover: function(d, i) {
        if (awfulComparator(d)) return;
        transitions(d3.select(this), 0);
      },
      mouseout: function(d, i) {
        if (awfulComparator(d)) return;
        transitions(d3.select(this), 1);
      },
      click: function(d, i) {
        props.onSelectSector && props.onSelectSector(awfulComparator(d) ? null : d.data)
      },
    };

    this.svg.attr('width', width).attr('height', height)
    this.g.attr('transform', `translate(${width / 2},${height / 2})`);

    // join
    const paths = this.g.datum(props.data).selectAll('path').data(pie);

    // enter
    paths.enter().append('svg:path').style('stroke', '#FFFFFF');

    // update
    paths
      .attr('d', d => awfulComparator(d) ? arclight(d) : arc(d))
      .attr('fill', (d, i) => d.data && d.data.color || color(i))
      .on(eventObj);

    // exit
    paths.exit().remove();
  }
}
