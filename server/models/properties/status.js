const Schema = mongoose.Schema;
const Query = require('../utilities/query');
const defaultQuery = Query.defaultQuery;

// Name of status, color corresponding with Bulma color
const defaults = [
    {name: 'Planning', value: 1, color: 'warning'},
    {name: 'Design', value: 2, color: 'info'},
    {name: 'Building', value: 3, color: 'primary'},
    {name: 'On Market', value: 4, color: 'success'},
    {name: 'Sold', value: 5, color: 'danger'}
];

var statusSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
}, { collection: 'statuses', toJSON: { virtuals: true } });

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