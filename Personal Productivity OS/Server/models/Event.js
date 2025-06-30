const mongoose = require("mongoose");

const CalendarEventSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
        source: { type: String, enum: ["google", "apple",], required: [true, "Event source is required"], },
        title: { type: String, required: [true, "Event title is required"], trim: true, },
        start: {
            type: String, required: [true, "Event start time is required"],
        },
        end: {
            type: String, required: [true, "Event end time is required"],
        },
        externalId: {
            type: String,
            required: [true, "Eternal event ID is required"],
        },
        
    }, { timestamps: true, }
);

module.exports = mongoose.model("CalendarEvent", CalendarEventSchema);