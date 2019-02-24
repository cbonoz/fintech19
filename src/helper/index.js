module.exports.QUOTE_COLUMNS = [
    'maxProfit',
    'Profitability',
    'Conversion',
    'SubmissionID',
    'BrokerID',
    'Product',
    'Industry',
    'QuotedPremium',
]

module.exports.getQuoteColumnHeader = (h) => {
    if (!h) {
        return h
    }
    if (h === 'maxProfit' || h === 'Profitability' || h === 'QuotedPremium') {
        h = `${h} ($)`
    } else if (h === 'Conversion') {
        h = `${h} (%)`
    }

    return h.replace('Premium', '')
}

module.exports.ORIGINAL_COLUMNS = ["SubmissionID", "Date_Received", "Date_Quoted", "Date_Bound", "BrokerID", "BrokerStar", "Product", "Industry", "HandledBy", "Region", "QuotedFlag", "DeclinedFlag", "BoundFlag", "Customer_State", "Broker_Type", "EmployeeCount", "Revenue", "QuotedPremium", "BoundPremium"]

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

module.exports.assignColor = function(value, minValue, maxValue) {
    if (value == 0 || minValue == maxValue) {
        return '#fff'
    }

    var g = Math.floor(240 * value / maxValue)
    var r = Math.floor(240 * value / minValue)

    if (value > 0) {
        return rgbToHex(240 - g, 255 - Math.floor(g * ((255 - 155) / 240.0)), 240 - g)
    } else {
        return rgbToHex(255 - Math.floor(r * ((255 - 230) / 240.0)), 240 - r, 240 - r)
    }
}