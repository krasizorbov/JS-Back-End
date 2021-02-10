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
            type: Date,
            required: true,
            default: Date.now()
        },
        usersEnrolled: [
            {
                type: ObjectId,
                ref: "User"
            }
        ]
    });

    return Model('Course', courseSchema);
};