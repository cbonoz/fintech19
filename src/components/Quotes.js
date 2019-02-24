import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Modal, Button, ButtonToolbar, FormControl, InputGroup } from 'react-bootstrap'
import { getQuoteColumnHeader, getRecommendation } from '../helper';
import { Type } from 'react-bootstrap-table2-editor';
import classNames from 'classnames'


class Quotes extends Component {

    state = {
        show: false,
        currentQuote: {},
        quoteRecommendation: ''
    }

    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
    }

    selectRow() {
        return {
            mode: 'radio',
            clickToSelect: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                console.log('=== selectRow row ===', row);
                console.log('=== selectRow event ===', e);
            }
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        console.log('show')
        this.setState({ show: true });
    }

    render() {
        const { header, quotes, minValue, maxValue } = this.props
        const { currentQuote, quoteRecommendation, show } = this.state
        let columns = header.map(h => {
            return {
                dataField: h,
                text: getQuoteColumnHeader(h)
            }
        })

        columns.push(
            {
                dataField: 'preapproved',
                text: 'Preapproved',
                editor: {
                    type: Type.CHECKBOX,
                    value: 'Y:N'
                }
            }
        )

        const rowStyle = (row, rowIndex) => {
            return {
                backgroundColor: row.color
            }
        }

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                console.log('clicked', row)
                const quoteRecommendation = getRecommendation(row.maxProfit, minValue, maxValue)
                this.setState({ currentQuote: row, quoteRecommendation, show: true })
            }
        }

        const rowClasses = (row, rowIndex) => {
            return 'quote-data-row';
        }

        return (
            <div>
                <BootstrapTable
                    keyField='SubmissionID'
                    data={quotes}
                    columns={columns}
                    rowStyle={rowStyle}
                    rowEvents={rowEvents}
                    rowClasses={rowClasses}
                />
                <Modal
                    size="lg"
                    show={show}
                    onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Quote ID: {currentQuote['SubmissionID']}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            {
                                Object.keys(currentQuote).map((key, i) => {
                                    if (key === 'color' || key === 'SubmissionID') {
                                        return null
                                    }
                                    return <div key={i}><li><b>{key}: </b>{currentQuote[key]}</li><br /></div>
                                })
                            }
                        </ul>

                        <p>To submit a quote request back to Broker <b>{currentQuote['BrokerID']}</b>, enter the desired quote amount below and hit 'Submit'</p>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Quote Amount" />
                            <InputGroup.Append>
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>

                        {quoteRecommendation && <p className={classNames({
                            'recommentation-text': true,
                            'positive': quoteRecommendation.indexOf('top') !== -1,
                            'negative': quoteRecommendation.indexOf('bottom') !== -1,
                        })}>
                            {quoteRecommendation}
                        </p>}
                        <ButtonToolbar className='quote-bar'>
                        <Button className='quote-button' variant="danger" onClick={this.handleClose}>
                            Decline
                        </Button>
                        <Button className='quote-button' variant="info" onClick={this.handleClose}>
                            Submit
                        </Button>
                        <Button className='quote-button' variant="success" onClick={this.handleClose}>
                            Preapprove
                        </Button>
                        </ButtonToolbar>

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

export default Quotes;