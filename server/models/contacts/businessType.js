const Schema = mongoose.Schema;
const defaultQuery = require('../utilities/defaultQuery');

// All lowercase for searchability
const defaults = ['legal', 'home building', 'tax', 'other'];

var businessTypeSchema = Schema({
    name: {
        type: String,
        required: true,
    }
}, { collection: 'businessTypes' });

businessTypeSchema.pre('save', function(next){
    this.name = this.name.toLowerCase();
    next();
});

// Apply default query
businessTypeSchema.pre('find', function(next){ defaultQuery(this, next) });
businessTypeSchema.pre('findOne', function(next){ defaultQuery(this, next) });

businessTypeSchema.statics.insertDefaults = function(){
    return new Promise((resolve, reject) => {
        BusinessType.countDocuments()
        .then(count => {
            if(count !== 0) return;
            let objects = defaults.map(name => { return {name} });
            BusinessType.insertMany(objects)
        })
        .then(() => resolve())
        .catch(error => reject(error));
    })
}

var BusinessType = mongoose.model('BusinessType', businessTypeSchema);

module.exports = BusinessType;