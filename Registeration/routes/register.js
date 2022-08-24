const express = require("express");
const route = express.Router();
const logs = require("../../_log/logs");
const reg = require("../../_model/register");
const login = require("../../_model/login");
const { Router } = require("express");
let Request, Response, address, status, message, SDATE, EDATE;

route.post("/Add", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();

    if (req.body.Number != null) {
      var CheckNumber = await login.findOne({ Number: req.body.Number });
      if (CheckNumber == null) {
        if (req.body.Password != null) {
          if (req.body.Role != null) {
            if (req.body.Name != null) {
              const task = new reg({
                Name: req.body.Name,
                Number: req.body.Number,
                Age: req.body.Age,
                Password: req.body.Password,
                Role: req.body.Role,
                Shop: req.body.Shop,
                Address: req.body.Address
              });
              const signin = new login({
                Number: req.body.Number,
                Password: req.body.Password,
                Role: req.body.Role,
                Status: req.body.Status,
              });
              if (task.save() && signin.save()) {
                res.status(200).send("Add Register");
                status = res.statusMessage;
              } else {
                console.log(" not save");
                res.status(400).send("Not Register");
                status = res.message;
              }
            } else {
              res.status(400).send("Name is reqired");
            }
          } else {
            res.status(400).send("Role is reqired");
          }
        } else {
          res.status(400).send("Password is required");
        }
      } else {
        res.status(400).send("ALready Number Registered");
      }
    } else {
      res.status(400).send("Number is required");
    }

    EDATE = Date.now();
  } catch (e) {
    status = res.message;

    message = e;
    res.status(500).json(e.message);
  }
  logs(Request, Response, status, address, message, SDATE, EDATE);
  res.end();
});

route.post("/Login", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();

    if (req.body.Number != null) {
      if (req.body.Password != null) {
        const CheckNumber = await login.findOne({ Number: req.body.Number });
        var CheckStatus = CheckNumber.Status;
        if (CheckNumber.Status) {
          if (CheckNumber == null) {
            res.status(400).send("Number not defined!");
          } else {
            if (CheckNumber.Password == req.body.Password) {
              res.status(200).jsonp({message:"Login Success!",id:CheckNumber._id});
              
            } else {
              res.status(400).send("Password not matched!");
            }
          }
        } else {
          res.status(400).send("InActive Account!");
        }
      } else {
        res.status(400).send("Password is Required!");
      }
    } else {
      res.status(400).send("Number is Required!");
    }

    EDATE = Date.now();
  } catch (e) {
    status = res.statusMessage;

    message = e;
    res.status(500).json(e.message);
  }
  logs(Request, Response, status, address, message, SDATE, EDATE);
  res.end();
});


module.exports = route;
