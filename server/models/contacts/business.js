const Schema = mongoose.Schema;
const Query = require('../utilities/query');
const defaultQuery = Query.defaultQuery;
const defaultUpdate = Query.defaultUpdate;

var businessSchema = Schema({
    name: {
        type: String,
        required: true,
        validate: isNameUnique,
    },
    type: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Apply default query
businessSchema.pre('find', function(next){ defaultQuery(this, next) });
businessSchema.pre('findOne', function(next){ defaultQuery(this, next) });

// Apply defaults for updating
businessSchema.pre('update', function(next){ defaultUpdate(this, next) });
businessSchema.pre('updateOne', function(next){ defaultUpdate(this, next) });
businessSchema.pre('findOneAndUpdate', function(next){ defaultUpdate(this, next) });

function isNameUnique(param){
    return new Promise((resolve, reject) => {
        var self = this;
        if(this instanceof mongoose.Query){
            Business.findById(this._conditions._id.toLocaleString())
            .then(business => {
                self = business;
                compareRecords();
            }).catch(error => reject(error));
        } else compareRecords()

        function compareRecords(){
            Business.find({name: { $regex: new RegExp(param, 'i') }})
            .then(businesses => {
                if(businesses.length === 0) resolve();
                if(businesses.length === 1 && businesses[0].id === self.id) resolve();
                reject(new Error('Name must be unique'));
            }).catch(error => reject(error));
        }
    });
}

var Business = mongoose.model('Business', businessSchema);

module.exports = Business;