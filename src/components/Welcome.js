import React, { Component } from 'react';
import ReactRotatingText from 'react-rotating-text'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import full_logo from './../assets/full_logo.png'

const ROTATOR_WORDS = [
    'Brokers',
    'Opportunities',
    'Quote Submissions',
    'Customers',
]

class Welcome extends Component {
    render() {
        return (
            <div className="home-content">
                <div className="center home-hero">
                    <img src={full_logo} alt="Insurlytics logo" className="clear banner-image" />
                    <br />
                    <span className="header-font clear">
                        {/* Data Powered Underwriting */}
                        {/* Insurlytics. <br/><br/> */}
                    </span>

                    <span className="header-font clear">
                        Filter the most promising Insurance
                        <br /><span className="rotating-text">
                            <ReactRotatingText
                                items={ROTATOR_WORDS}
                                typingInterval={100}
                                color={'#fff'}/>
                        </span>
                    </span>
                    <div className='centered'>
                        <Link to="/upload"><Button className="login-button btn-success">Get Started</Button></Link>
                    </div>
                </div>

            </div>);
    }
}

export default Welcome;