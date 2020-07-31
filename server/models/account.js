const Schema = mongoose.Schema;

var accountSchema = Schema({
    email: String,
    password: String,
    lastLogin: Date,
    role: Number,
}, { timestamps: true });

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;