import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { assignColor, assignNormalizedColor } from '../helper';
import { Modal, Button } from 'react-bootstrap'
import ReactChartkick, { BarChart, ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'
import data, { MAX_BROKER, MIN_BROKER } from '../data';

ReactChartkick.addAdapter(Chart)


class Brokers extends Component {


    state = {
        show: false,
        currentBroker: {}
    }

    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
        let { brokers, header } = this.props
        console.log('brokers', brokers)
        console.log(data.MIN_BROKER, data.MAX_BROKER)
    }

    handleClose() {
        console.log('handleClose')
        this.setState({ show: false });
    }

    handleShow() {
        console.log('show')
        this.setState({ show: true });
    }

    render() {
        let { brokers, header } = this.props
        const { currentBroker, show } = this.state
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

            return {
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

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                console.log('clicked', row)
                this.setState({ currentBroker: row, show: true })
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
                    rowEvents={rowEvents}
                />


                <Modal
                    size="lg"
                    show={show}
                    onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Relative Broker Performance</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5><b>Broker ID: </b>{currentBroker['x']}</h5>
                        <div className='chart-section'>
                            <ColumnChart data={[["Minimum", MIN_BROKER], [currentBroker['x'], currentBroker['y']], ["Maximum", MAX_BROKER]]} />
                            {/* <ul>
                                <li>Minimum</li>
                            </ul> */}
                            <br /><br />
                            <p><b>BrokerScore: </b>{currentBroker['score']}</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default Brokers;