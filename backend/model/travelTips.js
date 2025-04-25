import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const travelTipSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    },
    necessaryItems: [{
        type: String
    }],
    typeOfWear: {
        type: String
    },
    tags: [{
        type: String
    }],
    category: {
        type: String
    },
    nativeLanguage: {
        type: String
    },
    locationObj: {
        type: String
    },
    localCuisine: {
        type: String
    },
    locationName: {
        type: String
    },
    culturalInsights: {
        type: String
    },
    nearestCommute: {
        type: String
    },
    travelChallenges: {
        type: String
    },
    solutions: {
        type: String
    },
    languageCommunication: {
        type: String
    }
});

const TravelTip = model('TravelTip', travelTipSchema);

export default TravelTip;
