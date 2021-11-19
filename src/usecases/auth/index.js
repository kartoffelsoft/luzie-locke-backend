const makeAuthGoogle = require('./auth-google.js')
const makeIssueAccessToken = require('./issue-access-token.js')
const makeIssueRefreshToken = require('./issue-refresh-token.js')
const { googleAuthApi } = require('../../remote-api-access')
const { usersDatabase } = require('../../database-access')
const { makeUser } = require('../../database-model')
const tokenMaker = require('../../utils/token-maker')

const authGoogle = makeAuthGoogle({ googleAuthApi, usersDatabase, makeUser })
const issueAccessToken = makeIssueAccessToken({ tokenMaker })
const issueRefreshToken = makeIssueRefreshToken({ tokenMaker })

module.exports = {
  authGoogle,
  issueAccessToken,
  issueRefreshToken
}
