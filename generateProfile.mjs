import dotenv from 'dotenv';
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; 

import { getUser } from './src/pipeline/randomUser.mjs';
import {
  getPhone,
  getIBAN,
  getCreditCard,
  getRandomName,
  getPassword
} from './src/pipeline/randommer.mjs';
import { getQuote, getJoke, getPet } from './src/pipeline/fun.mjs';
import { saveToJSON } from './src/pipeline/saveToFile.mjs';

async function generateProfile() {
  try {
    const user = await getUser();
    console.log("user", user);

    const phone = await getPhone();
    console.log("phone", phone);

    const iban = await getIBAN();
    console.log("iban", iban);

    const creditCard = await getCreditCard();
    console.log("creditCard", creditCard);

    const name = await getRandomName();
    console.log("name", name);

    const password = await getPassword();
    console.log("password", password);

    const pet = await getPet();
    console.log("pet", pet);

    const quote = await getQuote();
    console.log("quote", quote);

    const joke = await getJoke();
    console.log("joke", joke);

    const profile = {
      user,
      phone,
      iban,
      creditCard,
      random_name: name,
      password,
      pet,
      quote,
      joke
    };



    saveToJSON(profile);
  } catch (err) {
    console.error("\u274C Erreur :", err.response?.data || err.message);
  }
}

generateProfile();
