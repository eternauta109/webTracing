const express = require("express");
const router = express.Router();
const dbconfig = require("../config");
const mysql = require("mysql");

const con = mysql.createPool(dbconfig);

router.get("/tracing", (req, res) => {
  console.log("tracing get", req.query);
  res.send(req.query.cinema);
});

router.post("/tracing", (req, res, next) => {
  /* console.log("tracing body", req.body); */
  const reg = req.body.registration;

  /* console.log("registration", reg.fiscale); */

  const sqlquery =
    "INSERT INTO tracing (cinema,codfisc,ticket,agregate,phone,date) VALUES(?,?,?,?,?,?);";

  try {
    con.query(
      sqlquery,
      [
        reg.cinema,
        reg.fiscale,
        reg.ticket,
        reg.nameClient,
        reg.numberPhone,
        reg.date,
      ],
      (err, result, fields) => {
        if (err) next(new ErrorHandler(404,"errore db nel file tracing"));

        /* console.log(result); */
        if (!result) next(new ErrorHandler(404,"errore db nel file tracing"));

        res.status(200).json(result);
        return;
      }
    );
  } catch (error) {
    throw new ErrorHandler(
      404,
      "errore sulla query del tracong: vedi server/tracing.js"
    );
  }
});

module.exports = router;
