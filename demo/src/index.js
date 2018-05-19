import React from 'react'
import {render} from 'react-dom'

import { Donut } from '../../src'

class Demo extends React.Component {
  state = {
    data: [
      { label: 'Tie', value: 12, color: '#3b5998' },
      { label: 'John', value: 7, color: '#00aced' },
      { label: 'Computer', value: 19, color: '#dd4b39' },
    ],
    selectedSector: null,
  };

  handleSectorSelection = sector => this.setState({ selectedSector: sector });

  render = () => {
    return (
      <div>
        <div style={{display: 'flex', height: '30vh'}}>
          <Donut
            donutCoeff={.75}
            data={this.state.data}
            onSelectSector={this.handleSectorSelection}
            selectedSector={this.state.selectedSector}
          />
        </div>
        <div style={{display: 'flex', height: '30vh'}}>
          {
            [null, .2, .4].map(donutCoeff => (
              <Donut
                key={donutCoeff}
                donutCoeff={donutCoeff}
                data={this.state.data}
                selectedSector={this.state.selectedSector}
              />
            ))
          }
        </div>
        <div style={{display: 'flex', height: '30vh'}}>
          {
            [.6, .8, .95].map(donutCoeff => (
              <Donut
                key={donutCoeff}
                donutCoeff={donutCoeff}
                data={this.state.data}
                selectedSector={this.state.selectedSector}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
