const Schema = mongoose.Schema;
const defaultQuery = require('../utilities/defaultQuery');

var businessSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
}, { timestamps: true });

businessSchema.pre('save', function(next){
    this.name = this.name.toLowerCase();
    next();
});

// Apply default query
businessSchema.pre('find', function(next){ defaultQuery(this, next) });
businessSchema.pre('findOne', function(next){ defaultQuery(this, next) });

var Business = mongoose.model('Business', businessSchema);

module.exports = Business;