import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

class Quotes extends Component {
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

    rowClasses(row, rowIndex) {
        let classes = null;

        if (rowIndex > 2) {
            classes = 'index-bigger-than-two';
        }

        return classes;
    }

    render() {
        const { header, quotes } = this.props
        const columns = header.map(h => {
            return {
                dataField: h,
                text: h
            }
        })

        return (
            <div>
                <BootstrapTable keyField='SubmissionID' data={quotes} columns={columns} rowClasses={this.rowClasses}/>
            </div>
        );
    }
}

export default Quotes;