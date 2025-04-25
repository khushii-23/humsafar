const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = 'mongodb://localhost:27017/';

// Database and collection names
const dbName = 'travelSage_v1';
const collectionName = 'traveltips';

async function updateLocationName() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Define the filter to find documents with locationObj field
        const filter = {
            locationObj: { $exists: true }
        };

        // Retrieve the documents to update
        const documents = await collection.find(filter).toArray();

        for (const doc of documents) {
            const locationObj = JSON.parse(doc.locationObj);

            if (locationObj.name) {
                const locationName = locationObj.name;

                await collection.updateOne(
                    { _id: doc._id },
                    { $set: { locationName } }
                );

                console.log(`Updated document with _id: ${doc._id}, set locationName to: ${locationName}`);
            }
        }
    } catch (error) {
        console.error('Error updating documents: ', error);
    } finally {
        await client.close();
    }
}

// Execute the function
updateLocationName();
