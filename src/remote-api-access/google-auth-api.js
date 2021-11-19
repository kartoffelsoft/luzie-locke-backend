const axios = require('axios')

async function read({ token }) {
  const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
  return data
}

module.exports = Object.freeze({
  read
})
