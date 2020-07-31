const Schema = mongoose.Schema;

var propertySchema = Schema({
    address: String,
    salePrice: Number,
    anticipatedSalePriceLow: Number,
    anticipatedSalePriceHigh: Number,
    anticipatedTotalCost: Number,
    squareFootage: Number,
    lotWidth: Number,
    lotDepth: Number,
    purchaseDate: Date,
    listedDate: Date,
    saleDate: Date,
    financeSubmissionDate: Date,
    financeApproveDate: Date,
    bedrooms: Number,
    bathrooms: Number,
    status: {
        type: String,
        default: 'planning',
    },
    publicVisible: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

var Property = mongoose.model('Property', propertySchema);

module.exports = Property;