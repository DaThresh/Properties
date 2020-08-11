const Schema = mongoose.Schema;

var accountSchema = Schema({
    email: {
        type: String,
        validate: [{validator: isEmailReal}, {validator: isEmailUnique}],
    },
    password: String,
    lastLogin: Date,
    role: Number,
}, { timestamps: true });

// Apply default query
accountSchema.pre('find', function(next){ defaultQuery(this, next) });
accountSchema.pre('findOne', function(next){ defaultQuery(this, next) });

function isEmailUnique(param){
    return new Promise((resolve, reject) => {
        Account.find({email: param})
        .then(accounts => {
            if(accounts.length === 0) return resolve();
            if(accounts.length === 1 && accounts[0] === this) return resolve();
            reject({unique: 'Email must be unique'});
        }).catch(error => reject(error));
    })
}

function isEmailReal(param){
    return new Promise((resolve, reject) => {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regex.test(String(param).toLowerCase())) reject({invalid: 'Invalid email address given'});
        else resolve();
    })
}

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;