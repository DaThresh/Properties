const Schema = mongoose.Schema;
const Query = require('./utilities/query');
const defaultQuery = Query.defaultQuery;
const defaultUpdate = Query.defaultUpdate;

var accountSchema = Schema({
    email: {
        type: String,
        required: true,
        validate: [{validator: isEmailReal}, {validator: isEmailUnique}],
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: String,
    lastLogin: Date,
    role: Number,
}, { timestamps: true, toJSON: { virtuals: true } });

// Apply default query
accountSchema.pre('find', function(next){ defaultQuery(this, next) });
accountSchema.pre('findOne', function(next){ defaultQuery(this, next) });

// Apply defaults for updating
accountSchema.pre('update', function(next){ defaultUpdate(this, next) });
accountSchema.pre('updateOne', function(next){ defaultUpdate(this, next) });
accountSchema.pre('fineOneAndUpdate', function(next){ defaultUpdate(this, next) });

accountSchema.virtual('fullName').get(function(){
    return this.lastName ? this.firstName + ' ' + this.lastName : this.firstName;
});

function isEmailUnique(param){
    return new Promise((resolve, reject) => {
        var self = this;
        if(this instanceof mongoose.Query){
            Account.findById(this._conditions._id.toLocaleString())
            .then(account => {
                self = account;
                compareRecords();
            }).catch(error => reject(error));
        } else compareRecords()

        function compareRecords(){
            Account.find({email: { $regex: new RegExp(param, 'i') }})
            .then(accounts => {
                if(accounts.length === 0) return resolve();
                if(accounts.length === 1 && accounts[0].id === self.id) return resolve();
                reject(new Error('Email must be unique'));
            }).catch(error => reject(error));
        }
    })
}

function isEmailReal(param){
    return new Promise((resolve, reject) => {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regex.test(String(param))) reject(new Error('Invalid email address given'));
        else resolve();
    })
}

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;