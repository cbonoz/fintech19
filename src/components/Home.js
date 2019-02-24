import React, { Component } from 'react';
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import Quotes from './Quotes'
import Report from './Report'
import csv from 'csv'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import helper, { assignColor } from './../helper'
import data, { DATA_MAP } from './../data'
import "react-tabs/style/react-tabs.css";
import { Button, ButtonToolbar } from 'react-bootstrap';
import Brokers from './Brokers';

const DELAY = 0

class Home extends Component {

    state = {
        loading: false,
        quotes: [],
        header: []
    }

    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }

    sortQuotes(field) {
        let { quotes } = this.state
        quotes.sort(function (a, b) {
            return b[field] - a[field]
        })

        this.setState({ quotes })
    }


    scoreQuote(quote) {
        return { ...quote, ...DATA_MAP[quote['SubmissionID']] }
    }

    onDrop(acceptedFiles, rejectedFiles) {
        const self = this
        self.setState({ loading: true })
        acceptedFiles.map(file => {
            const reader = new FileReader();
            reader.onload = () => {
                csv.parse(reader.result, (err, data) => {
                    console.log(data)
                    const header = helper.QUOTE_COLUMNS
                    const originalHeader = data[0]
                    let quotes = data.slice(1).map((values, i) => {
                        const quote = {}
                        values.map((val, j) => {
                            if (helper.QUOTE_COLUMNS.indexOf(originalHeader[j]) !== -1) {
                                // Filter out approved column headers
                                if (typeof(val) === 'number') {
                                    val = Math.round(val * 100) / 100
                                }
                                quote[originalHeader[j]] = val
                            }
                        })
                        return this.scoreQuote(quote)
                    })
                    let maxValue = 0
                    let minValue = 0
                    quotes.map(q => {
                        const cur = q['maxProfit']
                        if (cur > maxValue) {
                            maxValue = cur
                        }

                        if (cur < minValue) {
                            minValue = cur
                        }
                    })
                    quotes = quotes.map(q => {
                        q.color = assignColor(q.maxProfit, minValue, maxValue)
                        return q
                    })

                    console.log(header, quotes)
                    setTimeout(() => {
                        self.setState({ quotes, header, loading: false })
                    }, DELAY)
                });
            };
            reader.readAsBinaryString(file)
        })
    }

    clearQuotes() {
        this.setState({ quotes: [], header: [] })
    }

    render() {
        const { header, quotes, loading } = this.state
        const hasQuotes = quotes.length > 0

        return (

            <div className='home-section'>
                {!loading && !hasQuotes && <div className='centered'>
                    <h3 className='upload-header'>Upload your CSV of Quotes.</h3>
                    <hr />
                    <Dropzone onDrop={this.onDrop}>
                        {({ getRootProps, getInputProps, isDragActive }) => {
                            return (
                                <div {...getRootProps()} className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}>
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                            <p>Drop CSV here...</p> :
                                            <Button>Try dropping a file here, or click to select file to upload.</Button>
                                    }
                                </div>
                            )
                        }}
                    </Dropzone>
                </div>}

                {loading && <div className='centered'>
                    <img src={require('../assets/loading.gif')} alt="loading..." />
                </div>
                }

                {!loading && hasQuotes &&
                    <div>
                        <div className="clear back-section">
                            <Button className="back-button" ariant="info" onClick={() => this.clearQuotes()}>&#8592;Go Back</Button>
                        </div>
                        <h5>Sorting</h5>
                        <ButtonToolbar>
                            <Button className='sort-button' onClick={() => this.sortQuotes('Conversion')} variant="light">Conversion</Button>
                            <Button className='sort-button' onClick={() => this.sortQuotes('Profitability')} variant="light">Profitability</Button>
                            <Button className='sort-button' onClick={() => this.sortQuotes('maxProfit')} variant="success">Score</Button>
                        </ButtonToolbar>

                        <hr/>
                        <div>

                            <Tabs>
                                <TabList>
                                    <Tab>Overview</Tab>
                                    <Tab>Brokers</Tab>
                                    <Tab>Personal</Tab>
                                </TabList>

                                <TabPanel>
                                    <div>
                                        <Quotes quotes={quotes} header={header} />
                                        <Report quotes={quotes} header={header} />
                                    </div>

                                    <p className='centered'><b>Quotes: {quotes.length}</b></p>
                                </TabPanel>
                                <TabPanel>
                                    <div>
                                        <Brokers brokers={data.BROKERS} header={['x', 'y']}/>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    {/* TODO */}
                                </TabPanel>

                            </Tabs>
                        </div>
                    </div>}


            </div>
        );
    }
}

export default Home;