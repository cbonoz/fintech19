import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { assignColor, assignNormalizedColor } from '../helper';
import data from '../data';


class Brokers extends Component {

    componentDidMount() {
        let { brokers, header } = this.props
        console.log('brokers', brokers)
        console.log(data.MIN_BROKER, data.MAX_BROKER)
    }

    render() {
        let { brokers, header } = this.props
        brokers = brokers.map(b => {
            b.color = assignNormalizedColor(b.score)
            return b
        })
        const columns = header.map(h => {
            let text
            if (h === 'x') {
                text = 'Broker ID'
            } else if (h === 'y') {
                text = 'Performance Coefficient'
            } else if (h === 'score') {
                text = 'Broker Score'
            }

            return{
                dataField: h,
                sort: true,
                text
            }
        })

        const rowStyle = (row, rowIndex) => {
            return {
                backgroundColor: row.color
            }
        }

        return (
            <div className='data-row'>
            <p className="data-table-description">
                This table shows the relative performance of brokers being attached to profit-generating submissions that were successfully bound. 
                A higher score indicates the broker is associated with a higher number of profitable policy transactions, while a lower number indicates the broker is underperforming or more associated with lower profitability quotes.
            </p>

                <BootstrapTable
                    keyField='x'
                    data={brokers}
                    columns={columns}
                    rowStyle={rowStyle}
                />

            </div>
        );
    }
}

export default Brokers;