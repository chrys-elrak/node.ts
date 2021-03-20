import * as dotenv from 'dotenv';
import assert from 'assert';
dotenv.config();

assert(process.env.PORT, "Port is required");
assert(process.env.PRIVATE_KEY, "Private key is required");

const config = {
    host: process.env.HOST,
    hostUrl: process.env.HOST_URL,
    port: process.env.PORT,
     credential: {
        projectId: process.env.PROJECT_ID,
        privateKey: process.env.PRIVATE_KEY,
        clientEmail: process.env.CLIENT_EMAIL,
      }      
}

export default config;