import cuid from 'cuid'

export default Object.freeze({
  make: cuid,
  isValid: cuid.isCuid
})
