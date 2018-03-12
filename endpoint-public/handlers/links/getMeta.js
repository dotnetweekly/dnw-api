const getMeta = function(req, callback) {
	callback.onSuccess({ date: new Date(Date.now()) });

	return;
};

module.exports = getMeta;
