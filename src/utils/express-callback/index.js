function makeExpressCallback(controller) {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      uid: req.uid,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    }

    controller(httpRequest)
      .then(httpResponse => {
        console.log(httpResponse)
        res.status(httpResponse.statusCode).json(httpResponse.body)
      })
      .catch(e => {
        res.status(500).json({ 
          success: false,
          message: 'An unknown error occurred.',
          data: null
        })
      })
  }
}

module.exports = {
  makeExpressCallback
}
