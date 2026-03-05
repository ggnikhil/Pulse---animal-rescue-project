const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({
    animal_category: {
        type: String,
        enum: ["mammals", "reptiles", "birds", "amphibians"],
        required: [true, "animal category is required"]
    },
    animal_type: {
        type: String,
        required: [true, "animal type is required"]
    },
    injury_type: {
        type: String,
        enum: ["hit by vehicle", "bleeding", "stuck", "sick", "unconscious", "trapped"],
        required: [true, "injury type is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    photo: {
        type: String,
        required: [true, "photo is required"]
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "resolved"],
        default: "pending"
    },
    informer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "informer",
        required: [true, "informer id is required"]
    },
    informer_lat: {
        type: Number,
        required: [true, "lat is required"]
    },
    informer_lon: {
        type: Number,
        required: [true, "lon is required"]
    },
    location_name: {
        type: String
    },
    scout_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "scout",
        default: null
    }
}, {
    timestamps: true
})

const reportModel = mongoose.model("report", reportSchema)

module.exports = reportModel