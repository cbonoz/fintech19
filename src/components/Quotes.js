import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Modal, Button, FormControl, InputGroup } from 'react-bootstrap'
import { getQuoteColumnHeader } from '../helper';
import { Type } from 'react-bootstrap-table2-editor';


class Quotes extends Component {

    state = {
        show: false,
        currentQuote: {}
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
        const { header, quotes } = this.props
        const { currentQuote, show } = this.state
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
                this.setState({ currentQuote: row, show: true })
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
                            return <div key={i}><li><b>{key}: </b>{currentQuote[key]}</li><br/></div>
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


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.handleClose}>
                            Decline
                        </Button>
                        <Button variant="success" onClick={this.handleClose}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Quotes;