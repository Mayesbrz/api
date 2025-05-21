import dotenv from 'dotenv';
dotenv.config();



export const headers = {
  'X-Api-Key': process.env.RANDOMMER_API_KEY
};

export const randommerBase = 'https://randommer.io/api';
