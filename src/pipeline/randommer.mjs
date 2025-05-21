import axios from 'axios';
import { headers, randommerBase } from '../config.mjs';

export async function getPhone() {
  console.log("📞 Appel à getPhone()");
  try {
    const response = await axios.get(`${randommerBase}/Phone/International?CountryCode=FR`, { headers });
    return response.data;
  } catch (err) {
    console.error("Erreur dans getPhone:", err.response?.data || err.message);
    throw err;
  }
}

export async function getIBAN() {
  console.log("Appel à getIBAN()");
  try {
    const response = await axios.get(`${randommerBase}/Finance/Iban`, { headers });
    return response.data;
  } catch (err) {
    console.error(" Erreur dans getIBAN:", err.response?.data || err.message);
    throw err;
  }
}

export async function getCreditCard() {
  console.log("Appel à getCreditCard()");
  try {
    const response = await axios.get(`${randommerBase}/Finance/CreditCard`, { headers });
    return response.data;
  } catch (err) {
    console.error("Erreur dans getCreditCard:", err.response?.data || err.message);
    throw err;
  }
}

export async function getRandomName() {
  console.log("Appel à getRandomName()");
  try {
    const response = await axios.get(`${randommerBase}/Name?nameType=firstname&quantity=1`, { headers });
    return response.data[0]; // API renvoie un tableau
  } catch (err) {
    console.error("Erreur dans getRandomName:", err.response?.data || err.message);
    throw err;
  }
}

export async function getPassword() {
  console.log("Appel à getPassword()");
  try {
    const response = await axios.post(`${randommerBase}/Text/Password`, {
      length: 12,
      hasDigits: true,
      hasUppercase: true,
      hasSpecial: true
    }, { headers });
    return response.data;
  } catch (err) {
    console.error("Erreur dans getPassword:", err.response?.data || err.message);
    throw err;
  }
}
