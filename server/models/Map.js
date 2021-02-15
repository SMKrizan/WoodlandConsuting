//  project name, description, city, state, latitude, longtitude, category, date
const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({

    project: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    city: {
        type: String,
        trim: true
    },
    state: {
        type: String
    },
    date: {
        type: String
    },
    latitude: {
        type: Number
    },
    longtitude: {
        type: Number
    },
    category: {
        type: String
    },
    mapMarkers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
});

const Map = mongoose.model('Map', projectSchema);

module.exports = Map;