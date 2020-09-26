const Status = require('./status');
const Schema = mongoose.Schema;
const Query = require('../utilities/query');
const defaultQuery = Query.defaultQuery;
const defaultUpdate = Query.defaultUpdate;
const zipcodes = require('zipcodes');

var propertySchema = Schema({
    address: {
        type: String,
        required: true,
        validate: isAddressUnique,
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    zipcode: String,
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
        default: 'Planning',
        validate: isStatusValid,
    },
    publicVisible: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true, toJSON: { virtuals: true } });

// Apply default query
propertySchema.pre('find', function(next){ defaultQuery(this, next) });
propertySchema.pre('findOne', function(next){ defaultQuery(this, next) });

// Apply defaults for updating
propertySchema.pre('update', function(next){ defaultUpdate(this, next) });
propertySchema.pre('updateOne', function(next){ defaultUpdate(this, next) });
propertySchema.pre('findOneAndUpdate', function(next){ defaultUpdate(this, next) });

propertySchema.virtual('city').get(function(){
    let location = zipcodes.lookup(this.zipcode);
    return location && location.city ? location.city : ''
})

propertySchema.virtual('state').get(function(){
    let location = zipcodes.lookup(this.zipcode);
    return location && location.state ? location.state : ''
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

function isStatusValid(param){
    return new Promise((resolve, reject) => {
        Status.findOne({name: param})
        .then(status => {
            if(!status) reject(new Error('Status not valid'));
            resolve();
        }).catch(error => reject(error));
    })
}

var Property = mongoose.model('Property', propertySchema);

module.exports = Property;