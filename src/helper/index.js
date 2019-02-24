module.exports.QUOTE_COLUMNS = [
    'maxProfit',
    'Profitability',
    'Conversion',
    'SubmissionID',
    'BrokerID',
    'Product.x',
    'Industry.x',
    'QuotedPremium',
]

module.exports.ORIGINAL_COLUMNS = ["SubmissionID", "Date_Received", "Date_Quoted", "Date_Bound", "BrokerID", "BrokerStar", "Product", "Industry", "HandledBy", "Region", "QuotedFlag", "DeclinedFlag", "BoundFlag", "Customer_State", "Broker_Type", "EmployeeCount", "Revenue", "QuotedPremium", "BoundPremium"]


module.exports.assignColor = function(value, minValue, maxValue) {
    if (value == maxValue) {
        return '#90ee90'
    }
    if (value == 0 || minValue == maxValue) return '#fff'

    var g = Math.floor((240 * value / maxValue))
    var r = Math.floor((240 * value / minValue))

    if (value > 0) {
        return '#' + [240 - g, 255 - Math.floor(g * ((255 - 155) / 240.0)), 240 - g].map(x => Math.floor(x).toString(16)).join('')
    } else {
        return '#' + [255 - Math.floor(r * ((255 - 230) / 240.0)), 240 - r, 240 - r].map(x => Math.floor(x).toString(16)).join('')
    }
}