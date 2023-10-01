 In Node.js with TypeScript using the official MongoDB driver (mongodb), you can use the following example to store and retrieve files with custom options in GridFS:

Install the MongoDB Node.js driver:

in bash:
npm install mongodb
Create a TypeScript file (e.g., gridfs-example.ts):

in typescript file:
import { MongoClient, GridFSBucket, GridFSBucketWriteStream, GridFSBucketReadStream } from 'mongodb';
import * as fs from 'fs';

const url = 'mongodb://localhost:27017';
const dbName = 'your_database_name';
const filename = 'your_filename.txt';

// Establish a connection to the MongoDB server
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();

        const db = client.db(dbName);

        // Create a GridFSBucket
        const bucket = new GridFSBucket(db);

        // Set your custom options in metadata
        const customOptions = {
            key1: 'value1',
            key2: 'value2',
            // Add your own options here
        };

        // Store a file with custom options
        const uploadStream: GridFSBucketWriteStream = bucket.openUploadStream(filename, {
            metadata: customOptions,
        });

        const fileContent = fs.readFileSync('path_to_your_file');
        uploadStream.end(fileContent);

        console.log(`File "${filename}" uploaded with custom options.`);

        // Retrieve the file with custom options
        const downloadStream: GridFSBucketReadStream = bucket.openDownloadStreamByName(filename);
        let data = '';

        downloadStream.on('data', (chunk) => {
            data += chunk.toString();
        });

        downloadStream.on('end', () => {
            console.log(`File content: ${data}`);

            // Access custom options from metadata
            const optionsFromMetadata = downloadStream.file.metadata;
            console.log('Custom options from metadata:', optionsFromMetadata);
        });
    } finally {
        await client.close();
    }
}

run();
Make sure to replace 'your_database_name' with your actual database name and provide the correct file path in fileContent.

Run the TypeScript file:

in bash:
tsc gridfs-example.ts
node gridfs-example.js

This example connects to a MongoDB server, creates a GridFS bucket, stores a file with custom options, and then retrieves the file, along with the custom options from metadata. Adjust the code according to your specific needs and modify the custom options as necessary.