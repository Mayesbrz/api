import axios from 'axios';

export async function getQuote() {
  const res = await axios.get('https://api.quotable.io/random');
  return {
    content: res.data.content,
    author: res.data.author
  };
}

export async function getJoke() {
  console.log("😂 Appel à getJoke()");
  const res = await axios.get('https://v2.jokeapi.dev/joke/Programming?type=single');
  return {
    type: res.data.category,
    content: res.data.joke
  };
}

export async function getPet() {
  console.log("🐾 Appel à getPet() fallback");
  const pets = ['Neko', 'Biscuit', 'Rex', 'Luna', 'Pixel', 'Gizmo'];
  return pets[Math.floor(Math.random() * pets.length)];
}
