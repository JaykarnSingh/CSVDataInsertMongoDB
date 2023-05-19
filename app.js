const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

const jsonData = [];

fs.createReadStream('./csvLoginData.csv')
  .pipe(csv())
  .on('data', (data) => {
    jsonData.push(data);
  })
  .on('end', () => {
    console.log('CSV file read successfully');
    // Connect to MongoDB Atlas and insert the data
    connectAndInsertData(jsonData);
  });

  async function connectAndInsertData(jsonData) {
    const uri = 'mongodb+srv://prashantsisodia08:prashant@cluster0.tz8imch.mongodb.net/ps';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      console.log('Connected to MongoDB Atlas');
  
      const collection = client.db('ps').collection('userlogins');
      
      // Insert the data into MongoDB Atlas
      const result = await collection.insertMany(jsonData);
      console.log(`${result.insertedCount} documents inserted successfully`);
    } catch (error) {
      console.error('Error inserting data into MongoDB Atlas:', error);
    } finally {
      // Close the MongoDB connection
      client.close();
    }
  }
  