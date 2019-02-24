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

import full_logo from '../assets/full_logo.png'

const DELAY = 0

class Home extends Component {

    state = {
        loading: false,
        quotes: [],
        // quotes: [{ "SubmissionID": 155633, "BrokerID": "BRO_1327", "QuotedPremium": 1309, "Profitability": 1002.69, "Conversion": 0.12, "maxProfit": 115.98, "color": "#eafdea" }, { "SubmissionID": 97764, "BrokerID": "BRO_1477", "QuotedPremium": 7500, "Profitability": 6906, "Conversion": 0.13, "maxProfit": 925.31, "color": "#beebbe" }, { "SubmissionID": 28665, "BrokerID": "BRO_1739", "QuotedPremium": 5004, "Profitability": 5004, "Conversion": 0.24, "maxProfit": 1189.98, "color": "#b0e5b0" }, { "SubmissionID": 315142, "BrokerID": "BRO_1642", "QuotedPremium": 3384, "Profitability": 1500.99, "Conversion": 0.22, "maxProfit": 330.58, "color": "#dff8df" }, { "SubmissionID": 300881, "BrokerID": "BRO_1216", "QuotedPremium": 2500, "Profitability": 2500, "Conversion": 0.14, "maxProfit": 350.99, "color": "#ddf8dd" }, { "SubmissionID": 73613, "BrokerID": "BRO_1406", "QuotedPremium": "", "Profitability": 9366.63, "Conversion": 0.16, "maxProfit": 1536.04, "color": "#9ddd9d" }, { "SubmissionID": 82941, "BrokerID": "BRO_1709", "QuotedPremium": 7184, "Profitability": 3750, "Conversion": 0.24, "maxProfit": 891.77, "color": "#c0ebc0" }, { "SubmissionID": 122237, "BrokerID": "BRO_1417", "QuotedPremium": 926, "Profitability": 311.92, "Conversion": 0.23, "maxProfit": 73.26, "color": "#edfeed" }, { "SubmissionID": 267694, "BrokerID": "BRO_1075", "QuotedPremium": 59637, "Profitability": 31432, "Conversion": 0.14, "maxProfit": 4412.87, "color": "#009b00" }, { "SubmissionID": 273000, "BrokerID": "BRO_1254", "QuotedPremium": 3153, "Profitability": 3144, "Conversion": 0.24, "maxProfit": 747.66, "color": "#c8efc8" }, { "SubmissionID": 127697, "BrokerID": "BRO_1650", "QuotedPremium": 2177, "Profitability": 625.92, "Conversion": 0.15, "maxProfit": 93.56, "color": "#ebfdeb" }, { "SubmissionID": 254033, "BrokerID": "BRO_1073", "QuotedPremium": 6150, "Profitability": 2291.65, "Conversion": 0.26, "maxProfit": 588.74, "color": "#d0f2d0" }, { "SubmissionID": 109912, "BrokerID": "BRO_1010", "QuotedPremium": 34075, "Profitability": 6019, "Conversion": 0.14, "maxProfit": 845.03, "color": "#c3edc3" }, { "SubmissionID": 45625, "BrokerID": "BRO_1350", "QuotedPremium": 5000, "Profitability": 3663.5, "Conversion": 0.22, "maxProfit": 823.58, "color": "#c4edc4" }, { "SubmissionID": 150189, "BrokerID": "BRO_1297", "QuotedPremium": 1690, "Profitability": 173.06, "Conversion": 0.11, "maxProfit": 18.86, "color": "#efffef" }, { "SubmissionID": 203239, "BrokerID": "BRO_1071", "QuotedPremium": 10304, "Profitability": 2105.6, "Conversion": 0.29, "maxProfit": 603, "color": "#d0f2d0" }, { "SubmissionID": 64260, "BrokerID": "BRO_1348", "QuotedPremium": 5932, "Profitability": 949.12, "Conversion": 0.15, "maxProfit": 141.09, "color": "#e9fde9" }, { "SubmissionID": 65773, "BrokerID": "BRO_1667", "QuotedPremium": 3177, "Profitability": 1172.95, "Conversion": 0.25, "maxProfit": 287.86, "color": "#e1f9e1" }, { "SubmissionID": 157851, "BrokerID": "BRO_1480", "QuotedPremium": 1190, "Profitability": 916.78, "Conversion": 0.27, "maxProfit": 247.07, "color": "#e3fae3" }, { "SubmissionID": 177879, "BrokerID": "BRO_1676", "QuotedPremium": 2513, "Profitability": 2513, "Conversion": 0.15, "maxProfit": 385.34, "color": "#dcf7dc" }, { "SubmissionID": 287542, "BrokerID": "BRO_1251", "QuotedPremium": 5632, "Profitability": 5584.13, "Conversion": 0.16, "maxProfit": 873.03, "color": "#c1ecc1" }, { "SubmissionID": 57258, "BrokerID": "BRO_1650", "QuotedPremium": 10850, "Profitability": 10850, "Conversion": 0.25, "maxProfit": 2712.5, "color": "#5dc25d" }, { "SubmissionID": 284359, "BrokerID": "BRO_1882", "QuotedPremium": 3957, "Profitability": 3710.48, "Conversion": 0.15, "maxProfit": 553.28, "color": "#d2f3d2" }, { "SubmissionID": 281489, "BrokerID": "BRO_1278", "QuotedPremium": 891, "Profitability": 273, "Conversion": 0.23, "maxProfit": 64.12, "color": "#edfeed" }, { "SubmissionID": 33727, "BrokerID": "BRO_1678", "QuotedPremium": 1936, "Profitability": -367.84, "Conversion": 0.28, "maxProfit": -102.59, "color": "#ec3333" }, { "SubmissionID": 201541, "BrokerID": "BRO_1217", "QuotedPremium": 4000, "Profitability": 4000, "Conversion": 0.14, "maxProfit": 561.58, "color": "#d2f3d2" }, { "SubmissionID": 117730, "BrokerID": "BRO_1443", "QuotedPremium": 2697, "Profitability": 843.25, "Conversion": 0.25, "maxProfit": 206.95, "color": "#e5fbe5" }, { "SubmissionID": 99132, "BrokerID": "BRO_1061", "QuotedPremium": 2604, "Profitability": 2463.38, "Conversion": 0.37, "maxProfit": 906.94, "color": "#bfebbf" }, { "SubmissionID": 289192, "BrokerID": "BRO_1664", "QuotedPremium": 14016, "Profitability": 12852.67, "Conversion": 0.2, "maxProfit": 2568.48, "color": "#65c665" }, { "SubmissionID": 229898, "BrokerID": "BRO_1144", "QuotedPremium": 1980, "Profitability": 1980, "Conversion": 0.29, "maxProfit": 565.71, "color": "#d2f3d2" }, { "SubmissionID": 152565, "BrokerID": "BRO_1141", "QuotedPremium": 1161, "Profitability": 1161, "Conversion": 0.22, "maxProfit": 257.95, "color": "#e2fae2" }, { "SubmissionID": 228499, "BrokerID": "BRO_1739", "QuotedPremium": 3854, "Profitability": 1063, "Conversion": 0.22, "maxProfit": 236.18, "color": "#e4fae4" }, { "SubmissionID": 200949, "BrokerID": "BRO_1251", "QuotedPremium": 3000, "Profitability": 2668.8, "Conversion": 0.1, "maxProfit": 254.93, "color": "#e3fae3" }, { "SubmissionID": 69935, "BrokerID": "BRO_1676", "QuotedPremium": 7314, "Profitability": 3979.73, "Conversion": 0.22, "maxProfit": 881.29, "color": "#c1ecc1" }, { "SubmissionID": 124666, "BrokerID": "BRO_1353", "QuotedPremium": 4360, "Profitability": 2174, "Conversion": 0.22, "maxProfit": 484.65, "color": "#d6f5d6" }, { "SubmissionID": 254621, "BrokerID": "BRO_1186", "QuotedPremium": 2003, "Profitability": 613.72, "Conversion": 0.23, "maxProfit": 144.15, "color": "#e9fde9" }, { "SubmissionID": 111302, "BrokerID": "BRO_1061", "QuotedPremium": 2254, "Profitability": -604.44, "Conversion": 0.22, "maxProfit": -130.02, "color": "#e60000" }, { "SubmissionID": 315376, "BrokerID": "BRO_1408", "QuotedPremium": 5619, "Profitability": 1721.66, "Conversion": 0.23, "maxProfit": 404.39, "color": "#dbf7db" }, { "SubmissionID": 50311, "BrokerID": "BRO_1712", "QuotedPremium": 1440, "Profitability": 1436, "Conversion": 0.17, "maxProfit": 242.44, "color": "#e3fae3" }, { "SubmissionID": 299579, "BrokerID": "BRO_1106", "QuotedPremium": 7943, "Profitability": 767, "Conversion": 0.21, "maxProfit": 164.64, "color": "#e8fce8" }, { "SubmissionID": 209295, "BrokerID": "BRO_1097", "QuotedPremium": 1301, "Profitability": 480.33, "Conversion": 0.25, "maxProfit": 117.88, "color": "#eafdea" }, { "SubmissionID": 142807, "BrokerID": "BRO_1021", "QuotedPremium": 4000, "Profitability": 4000, "Conversion": 0.14, "maxProfit": 561.58, "color": "#d2f3d2" }, { "SubmissionID": 228205, "BrokerID": "BRO_1024", "QuotedPremium": 1567, "Profitability": 1050.92, "Conversion": 0.26, "maxProfit": 268.46, "color": "#e2fae2" }, { "SubmissionID": 226109, "BrokerID": "BRO_1082", "QuotedPremium": 2327, "Profitability": 680.51, "Conversion": 0.23, "maxProfit": 159.84, "color": "#e8fce8" }, { "SubmissionID": 314552, "BrokerID": "BRO_1678", "QuotedPremium": 1201, "Profitability": 719.51, "Conversion": 0.29, "maxProfit": 206.06, "color": "#e5fbe5" }, { "SubmissionID": 301411, "BrokerID": "BRO_1678", "QuotedPremium": 3500, "Profitability": 3164, "Conversion": 0.11, "maxProfit": 333.31, "color": "#def8de" }, { "SubmissionID": 282951, "BrokerID": "BRO_1887", "QuotedPremium": 5445, "Profitability": 1668.35, "Conversion": 0.23, "maxProfit": 391.86, "color": "#dbf7db" }, { "SubmissionID": 226913, "BrokerID": "BRO_1715", "QuotedPremium": 1679, "Profitability": 514.45, "Conversion": 0.23, "maxProfit": 120.83, "color": "#eafdea" }, { "SubmissionID": 126525, "BrokerID": "BRO_1696", "QuotedPremium": 4000, "Profitability": 2738.4, "Conversion": 0.17, "maxProfit": 459.23, "color": "#d8f5d8" }, { "SubmissionID": 148850, "BrokerID": "BRO_1245", "QuotedPremium": 1307, "Profitability": 783.28, "Conversion": 0.29, "maxProfit": 224.32, "color": "#e4fae4" }],
        header: ["maxProfit", "Profitability", "Conversion", "SubmissionID", "BrokerID", "Product", "Industry", "QuotedPremium"],
        minValue: 0,
        maxValue: 0,
        sortField: ''
    }

    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }

    sortQuotes(field) {
        let { quotes } = this.state
        quotes.sort(function (a, b) {
            return (b[field] - a[field]) || (a.index - b.index)
        })
        this.setState({ quotes, sortField: field })
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
                    const originalHeader = data[0].map(x => x.replace('.x', ''))
                    let quotes = data.slice(1).map((values, i) => {
                        const quote = {}
                        values.map((val, j) => {
                            if (helper.QUOTE_COLUMNS.indexOf(originalHeader[j]) !== -1) {
                                // Filter out approved column headers
                                const num = parseFloat(val)
                                if (!isNaN(num)) {
                                    val = Math.round(num * 100) / 100
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
                        self.setState({ quotes, header, minValue, maxValue, loading: false })
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
        const { header, quotes, loading, sortField, minValue, maxValue } = this.state
        const hasQuotes = quotes.length > 0

        return (

            <div className='home-section'>
                {!loading && !hasQuotes && <div className='centered'>
                    <h3 className='upload-header'>Upload your CSV of Quotes.</h3>
                    <hr />
                    <div className='drop-section'>
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
                    </div>
                </div>}

                {loading && <div className='centered'>
                    <img src={require('../assets/loading.gif')} alt="loading..." />
                </div>
                }

                {!loading && hasQuotes &&
                    <div>
                        <div className="clear back-section">
                            {/* <Button className="back-button" ariant="info" onClick={() => this.clearQuotes()}>&#8592;Go Back</Button> */}
                            <img src={full_logo} alt="Insurlytics logo" className="clear report-image" />
                            <p className='centered white'><b>Active Records: {quotes.length}</b></p>
                        </div>
                        <hr />
                        <div className='tab-section'>

                            <Tabs>
                                <TabList>
                                    <Tab>Overview</Tab>
                                    <Tab>Brokers</Tab>
                                    {/* <Tab>Personal</Tab> */}
                                </TabList>

                                <TabPanel>
                                    {/* TAB 1 */}
                                    {/* <h5>Sorting</h5> */}
                                    <ButtonToolbar className='sort-bar'>
                                        {['Conversion', 'Profitability', 'maxProfit'].map((key, i) => {
                                            const variant = sortField === key ? 'info' : 'light'
                                            return <Button
                                                key={i}
                                                className='sort-button'
                                                onClick={() => this.sortQuotes(key)}
                                                variant={variant}>{key}
                                            </Button>
                                        })}
                                    </ButtonToolbar>


                                    <div>
                                        <Quotes quotes={quotes} header={header} minValue={minValue} maxValue={maxValue} />
                                        {/* <Report quotes={quotes} header={header} /> */}
                                    </div>

                                </TabPanel>
                                <TabPanel>
                                    {/* TAB 2 */}
                                    <div>
                                        <Brokers brokers={data.BROKERS} header={['x', 'y']} />
                                    </div>
                                </TabPanel>
                                {/* <TabPanel> */}
                                    {/* TAB 3 */}
                                    {/* TODO */}
                                    {/* <div>
                                        <Report quotes={quotes} header={header} />
                                    </div>
                                </TabPanel> */}

                            </Tabs>
                        </div>
                    </div>}


            </div>
        );
    }
}

export default Home;