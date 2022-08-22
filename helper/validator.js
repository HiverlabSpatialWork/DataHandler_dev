function body_has (field_name) {
  return !(!field_name || field_name === '');


}

module.exports = {
  body_has,
}