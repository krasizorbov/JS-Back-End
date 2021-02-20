const moment = require('moment');

module.exports = (mongoose) => {

    const { Schema, model: Model } = mongoose;
    const { String, ObjectId, Number } = Schema.Types;

    const courseSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 50
        },
        imageUrl: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        createdAt: {
            type: String,
            required: true,
            default: formatDate
        },
        usersEnrolled: [
            {
                type: ObjectId,
                ref: "User"
            }
        ],
        count: {
            type: Number,
            required: true
        },
        creator: {
            type: ObjectId, 
            ref: "User"
        }
    });

    function formatDate() {
        let newDate = moment(new Date()).format("ddd MMM YYYY, h:mm:ss").slice(0,25);
        return newDate;
    }

    return Model('Course', courseSchema);
};