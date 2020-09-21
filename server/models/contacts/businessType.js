const Schema = mongoose.Schema;
const Query = require('../utilities/query');
const defaultQuery = Query.defaultQuery;

// All lowercase for searchability
const defaults = ['Legal', 'Home building', 'Tax', 'Other'];

var businessTypeSchema = Schema({
    name: {
        type: String,
        required: true,
    }
}, { collection: 'businessTypes' });

// Apply default query
businessTypeSchema.pre('find', function(next){ defaultQuery(this, next) });
businessTypeSchema.pre('findOne', function(next){ defaultQuery(this, next) });

businessTypeSchema.statics.insertDefaults = function(){
    return new Promise((resolve, reject) => {
        BusinessType.countDocuments()
        .then(count => {
            if(count !== 0) return;
            let objects = defaults.map(name => { return {name} });
            return BusinessType.insertMany(objects)
        })
        .then(() => resolve())
        .catch(error => reject(error));
    })
}

var BusinessType = mongoose.model('BusinessType', businessTypeSchema);

module.exports = BusinessType;