const Schema = mongoose.Schema;
const Query = require('../utilities/query');
const defaultQuery = Query.defaultQuery;
const defaultUpdate = Query.defaultUpdate;

var organizationSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
        required: true,
    },
    role: {
        type: Number,
        default: 1,
        required: true,
    },
    images: {
        profilePicture: String,
    }
}, { timestamps: true, toJSON: { virtuals: true }, minimize: false });

// Apply default query
organizationSchema.pre('find', function(next){ defaultQuery(this, next) });
organizationSchema.pre('findOne', function(next){ defaultQuery(this, next) });

// Apply defaults for updating
organizationSchema.pre('update', function(next){ defaultUpdate(this, next) });
organizationSchema.pre('updateOne', function(next){ defaultUpdate(this, next) });
organizationSchema.pre('findOneAndUpdate', function(next){ defaultUpdate(this, next) });

organizationSchema.statics.insertDefaults = function(){
    return new Promise((resolve, reject) => {
        Organization.countDocuments()
        .then(count => {
            if(count !== 0) return Organization.findOne({role: 10})
            return Organization.create([{name: 'Admin', active: true, role: 10}])
        })
        .then(organization => resolve(organization.id))
        .catch(error => reject(error));
    })
}

organizationSchema.virtual('accounts', {
    ref: 'Account',
    localField: '_id',
    foreignField: 'organization',
});
organizationSchema.virtual('properties', {
    ref: 'Property',
    localField: '_id',
    foreignField: 'organization',
});
organizationSchema.virtual('contacts', {
    ref: 'Contact',
    localField: '_id',
    foreignField: 'organization',
});
organizationSchema.virtual('businesses', {
    ref: 'Business',
    localField: '_id',
    foreignField: 'organization',
});
organizationSchema.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'organization',
});

var Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;