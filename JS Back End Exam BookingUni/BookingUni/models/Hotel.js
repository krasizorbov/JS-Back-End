module.exports = (mongoose) => {

    const { Schema, model: Model } = mongoose;
    const { String, ObjectId, Number } = Schema.Types;

    const hotelSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        freeRooms: {
            type: Number,
            required: true,
        },
        usersBooked: [
            {
                type: ObjectId,
                ref: "User"
            }
        ],
        count: {
            type: Number,
            required: true
        },
        owner: {
            type: ObjectId, 
            ref: "User"
        }
    });

    return Model('Hotel', hotelSchema);
};