import bridge from './react-d3';
import sizeMe from 'react-sizeme';
import D3Donut from './donut';

export const Donut = sizeMe({ monitorHeight: true })(bridge(D3Donut));
