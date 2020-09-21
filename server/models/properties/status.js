const Schema = mongoose.Schema;
const Query = require('../utilities/query');
const defaultQuery = Query.defaultQuery;

// Name of status, color corresponding with Bulma color
const defaults = [
    {name: 'Planning', color: 'warning'},
    {name: 'Design', color: 'info'},
    {name: 'Building', color: 'primary'},
    {name: 'On Market', color: 'success'},
    {name: 'Sold', color: 'danger'}
];

var statusSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
}, { collection: 'statuses' });

// Apply default query
statusSchema.pre('find', function(next){ defaultQuery(this, next) });
statusSchema.pre('findOne', function(next){ defaultQuery(this, next) });

statusSchema.statics.insertDefaults = function(){
    return new Promise((resolve, reject) => {
        Status.countDocuments()
        .then(count => {
            if(count !== 0) return;
            return Status.insertMany(defaults);
        })
        .then(() => resolve())
        .catch(error => reject(error));
    })
}

var Status = mongoose.model('Status', statusSchema);

module.exports = Status;