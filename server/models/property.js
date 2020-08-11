const Schema = mongoose.Schema;
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

// Converts all the addresses to lower case so they are searchable
propertySchema.pre('save', function(next){
    this.address = this.address.toLowerCase();
    next();
});

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
        Property.find({address: String(param).toLowerCase()})
        .then(properties => {
            if(properties.length === 0) return resolve();
            if(properties.length === 1 && properties[0] === this) return resolve();
            reject({unique: 'Address must be unique'});
        }).catch(error => reject(error));
    })
}

var Property = mongoose.model('Property', propertySchema);

module.exports = Property;