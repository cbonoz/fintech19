import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { assignColor } from '../helper';
import { MIN_BROKER, MAX_BROKER } from '../data';

const rowStyle2 = (row, rowIndex) => {
    const style = {};
    style.backgroundColor = row.color || '#fff'
    style.fontWeight = 'bold';
    style.color = 'black';
  
    return style;
  };

class Brokers extends Component {
    render() {
        let { brokers, header } = this.props
        brokers = brokers.map(b => {
            b.color = assignColor(b.y, MIN_BROKER, MAX_BROKER)
            return b
        })
        const columns = header.map(h => {
            let text
            if (h === 'x') {
                text = 'Broker ID'
            } else if (h === 'y') {
                text = 'Coefficient'
            }

            return {
                dataField: h,
                text
            }
        })
        return (
            <div className='data-row'>
                <BootstrapTable keyField='x' data={ brokers } columns={ columns } rowStyle={ rowStyle2 } />
            </div>
        );
    }
}

export default Brokers;