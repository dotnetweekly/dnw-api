const errorHelper = {
  formatErrors(err) {
    const errorsArr = [];

    if (!err || !err.errors) {
      return errorsArr;
    }

    for (var errorKey in err.errors) {
      const error = err.errors[errorKey];
      errorsArr.push({
        field: errorKey,
        error: error.properties
          ? error.properties.message.replace("{VALUE}", errorKey)
          : ""
      });
    }

    return errorsArr;
  }
};

module.exports = errorHelper;
