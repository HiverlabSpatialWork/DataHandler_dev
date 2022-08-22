'use strict';
const express = require('express');
const router = express.Router();
const dbConnection = require("../helper/sap-connector").dbConnection

router.get("/get-data", async function (req, res) {
    try {
        const data = await dbConnection.exec("SELECT TOP 1000 NAME,DATA FROM DBADMIN.SAMPLE")
        if (data) res.json({ success: 1, data: data })
        else return res.json({ success: 0, data: "Unknown" })
    } catch (e) {
        return res.json({ success: 0, data: e })
    }
});

module.exports = router