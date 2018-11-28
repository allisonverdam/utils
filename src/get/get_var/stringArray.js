const { STRING_ARRAY } = require('../../constants')
const string = require('./string')
const getU32 = require('../get_u32')

/**
 * Decode realArray
 * @param genericDecoder
 * @param buf
 * @param flag
 * @returns {Object}
 */
async function decode (genericDecoder, buf, flag) {
  const nbEntries = await getU32(buf, 0)

  // start at 4 cause of nbEntries
  let data = {
    array: [],
    buffer: buf.slice(4),
    pos: 4
  }

  for (let index = 0; index < nbEntries; index++) {
    const decodedValue = await string.decode(genericDecoder, data.buffer)
    data.array.push(decodedValue.value)
    data.buffer = data.buffer.slice(decodedValue.length)
    data.pos += decodedValue.length
  }

  return {
    value: data.array,
    length: data.pos
  }
}

module.exports = {
  decode,
  type: STRING_ARRAY
}