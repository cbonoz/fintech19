import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const rowStyle2 = (row, rowIndex) => {
    const style = {};
    style.backgroundColor = row.color || '#fff'
    style.fontWeight = 'bold';
    style.color = 'black';
  
    return style;
  };
  

class Quote extends Component {
    render() {
        const { quote, header } = this.props
        return (
            <div className='data-row'>
                <BootstrapTable keyField='SubmissionID' data={ [quote] } columns={ header } rowStyle={ rowStyle2 } />
            </div>
        );
    }
}

export default Quote;