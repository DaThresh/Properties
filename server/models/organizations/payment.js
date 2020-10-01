const Schema = mongoose.Schema;
const Query = require('../utilities/query');
const defaultQuery = Query.defaultQuery;
const defaultUpdate = Query.defaultUpdate;

var paymentSchema = Schema({
    organization: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        default: 0.00,
    },
    coupon: String,
}, { timestamps: true, toJSON: { virtuals: true } });

// Apply default query
paymentSchema.pre('find', function(next){ defaultQuery(this, next) });
paymentSchema.pre('findOne', function(next){ defaultQuery(this, next) });

// Apply defaults for updating
paymentSchema.pre('update', function(next){ defaultUpdate(this, next) });
paymentSchema.pre('updateOne', function(next){ defaultUpdate(this, next) });
paymentSchema.pre('fineOneAndUpdate', function(next){ defaultUpdate(this, next) });

var Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;