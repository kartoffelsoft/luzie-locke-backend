function makeIssueAccessToken({ tokenMaker }) {
  return async function issueAccessToken({ id, subId } = {}) {
    if(!id || !subId) {
      throw new Error('Missing mandatory parameters: id, subId');
    }

    return tokenMaker.make({ id, subId, expiresIn: '354d' })
  }
}

module.exports = makeIssueAccessToken