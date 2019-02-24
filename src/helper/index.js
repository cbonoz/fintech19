// import { zScore } from 'simple-statistics'

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

module.exports.getRecommendation = (value, minValue, maxValue) => {
    const span = maxValue - minValue
    const diff = value - minValue
    console.log('recommendation', value, minValue, maxValue)
    if (diff <= .10 * span) {
        return 'Not recommended. This quote is in the bottom 10% of quotes we have seen recently, we recommend declining this quote request for now.'
    } else if (diff >= .90 * span) {
        return 'Wow! This quote is in the top 10% of quotes we have seen recently, we recommend pre-approving this particular quote and sending it immediately back to the broker.'
    }

    return 'The quote may be profitable, determine whether or not to accept this quote and click the appropriate option below'
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

module.exports.assignNormalizedColor = function(n) {
    // const n = zScore(value, mean, sd)
    const R = Math.floor((255 * (100 - n)) / 100 )
    const G = Math.floor((255 * n) / 100)
    const B = 0

    return rgbToHex(R, G, B)
}