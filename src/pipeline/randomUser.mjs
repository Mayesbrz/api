import axios from 'axios';

export async function getUser() {
  console.log("Appel à RandomUser");
  const res = await axios.get('https://randomuser.me/api/');
  const user = res.data.results[0];
  return {
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    gender: user.gender,
    location: `${user.location.city}, ${user.location.country}`,
    picture: user.picture.large
  };
}
