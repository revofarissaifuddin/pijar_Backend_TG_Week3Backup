const express = require("express");// eslint-disable-line no-unused-vars

const handleErrors = (err, req, res,) => {
    return res.status(500).json({status: "error", message: err.message,
    });
};
module.exports = handleErrors;