function send (res, status, success, data) {
  if (success)
    return res.status(status).json({ success, data })
  else return res.status(status).json({ success, error: data })
}

module.exports = {
  send
}