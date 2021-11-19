function makeIssueRefreshToken({ tokenMaker }) {
  return async function issueRefreshToken({ id, subId } = {}) {
    if(!id || !subId) {
      throw new Error('Missing mandatory parameters: id, subId');
    }

    return tokenMaker.make({ id, subId, expiresIn: '14d' })
  }
}

module.exports = makeIssueRefreshToken
