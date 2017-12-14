module.exports = {
  requiredStringValidator: [
    function(val) {
      var testVal = val.trim();
      return testVal.length > 0;
    }
  ]
};
