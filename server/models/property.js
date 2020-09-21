const Schema = mongoose.Schema;
const defaultQuery = require('./utilities/defaultQuery');
const zipcodes = require('zipcodes');

var propertySchema = Schema({
    address: {
        type: String,
        required: true,
        validate: isAddressUnique,
    },
    zipcode: Number,
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

// Apply default query
propertySchema.pre('find', function(next){ defaultQuery(this, next) });
propertySchema.pre('findOne', function(next){ defaultQuery(this, next) });

propertySchema.virtual('city').get(function(){
    let location = zipcodes.lookup(this.zipcode);
    return location.city ? location.city : ''
})

propertySchema.virtual('state').get(function(){
    let location = zipcodes.lookup(this.zipcode);
    return location.state ? location.state : ''
})

function isAddressUnique(param){
    return new Promise((resolve, reject) => {
        var self = this;
        if(this instanceof mongoose.Query){
            Property.findById(this._conditions._id.toLocaleString())
            .then(property => {
                self = property;
                compareRecords();
            }).catch(error => reject(error));
        } else compareRecords()

        function compareRecords(){
            Property.find({address: { $regex: new RegExp(param, 'i') }})
            .then(properties => {
                if(properties.length === 0) return resolve();
                if(properties.length === 1 && properties[0].id === self.id) return resolve();
                reject(new Error('Address must be unique'));
            }).catch(error => reject(error));
        }
    })
}

var Property = mongoose.model('Property', propertySchema);

module.exports = Property;