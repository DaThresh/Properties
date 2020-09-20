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
    email: String,
    business: {
        type: Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
    },
}, { timestamps: true });

// Converts are string fields to lowercase so they are searchable
contactSchema.pre('save', function(next){
    if(this.firstName) this.firstName = this.firstName.toLowerCase();
    if(this.lastName) this.lastName = this.lastName.toLowerCase();
    if(this.title) this.title = this.title.toLowerCase();
    if(this.email) this.email = this.email.toLowerCase();
    next();
});

// Apply default query
contactSchema.pre('find', function(next){ defaultQuery(this, next) });
contactSchema.pre('findOne', function(next){ defaultQuery(this, next) });

contactSchema.virtual('fullName').get(function(){
    return this.lastName ? this.firstName + ' ' + this.lastName : this.firstName;
});

var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;