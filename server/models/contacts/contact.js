const Schema = mongoose.Schema;
const Query = require('../utilities/query');
const defaultQuery = Query.defaultQuery;
const defaultUpdate = Query.defaultUpdate;

var contactSchema = Schema({
    firstName: {
        type: String,
        required: true,
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    lastName: String,
    phoneNumber: Number,
    title: String,
    email: {
        type: String,
        validate: isEmailReal,
    },
    business: {
        type: Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
    },
}, { timestamps: true, toJSON: { virtuals: true } });

// Apply default query
contactSchema.pre('find', function(next){ defaultQuery(this, next) });
contactSchema.pre('findOne', function(next){ defaultQuery(this, next) });

// Apply defaults for updating
contactSchema.pre('update', function(next){ defaultUpdate(this, next) });
contactSchema.pre('updateOne', function(next){ defaultUpdate(this, next) });
contactSchema.pre('findOneAndUpdate', function(next){ defaultUpdate(this, next) });

contactSchema.pre('find', findMiddleware);
contactSchema.pre('findOne', findMiddleware);
function findMiddleware(next){
    this.populate('business');
    next();
}

contactSchema.virtual('fullName').get(function(){
    return this.lastName ? this.firstName + ' ' + this.lastName : this.firstName;
});

function isEmailReal(param){
    return new Promise((resolve, reject) => {
        if(param === '') return resolve();
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regex.test(String(param))) reject(new Error('Invalid email address given'));
        else resolve();
    })
}

var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;