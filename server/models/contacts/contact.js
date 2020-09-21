const Schema = mongoose.Schema;
const defaultQuery = require('../utilities/defaultQuery');

var contactSchema = Schema({
    firstName: {
        type: String,
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
}, { timestamps: true });

// Apply default query
contactSchema.pre('find', function(next){ defaultQuery(this, next) });
contactSchema.pre('findOne', function(next){ defaultQuery(this, next) });

contactSchema.virtual('fullName').get(function(){
    return this.lastName ? this.firstName + ' ' + this.lastName : this.firstName;
});

function isEmailReal(param){
    return new Promise((resolve, reject) => {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regex.test(String(param))) reject(new Error('Invalid email address given'));
        else resolve();
    })
}

var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;