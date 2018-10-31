module.exports = function (seq) {
  return {
    channel: require('./channel')(seq),
    message: require('./message')(seq),
    friend: require('./friend')(seq),
    user: require('./user')(seq)
  }
}