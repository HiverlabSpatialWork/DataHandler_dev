"use strict";
var hana = require("@sap/hana-client");

var connOptions = {
    serverNode: "e0befe38-0342-413c-9a7f-f4dc186a0181.hana.trial-us10.hanacloud.ondemand.com:443",
    encrypt: "true",
    uid: "DBADMIN",
    pwd: "R7*4NtUqhrYy6.3",
};

var dbConnection = hana.createConnection();

dbConnection.connect(connOptions, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to SAP")
    }
});

module.exports = {
    dbConnection
}