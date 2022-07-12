const express = require("express");
const route = express.Router();
const logs = require("../../_log/logs");
const reg = require("../../_model/register");
const login = require("../../_model/login");
const Category = require("../../_model/category");
const SubCategory = require("../../_model/Subcategory");
const Product = require("../../_model/Product");
var multer = require("multer");
const path = require("path");
let Request, Response, address, status, message, SDATE, EDATE;

route.post("/ShowaddCategory", async (req, res) => {
    try {
      Request = JSON.stringify(req.body);
      address = req.originalUrl;
      SDATE = Date.now();
  
      var ShowAddCategory = await Category.find({});
      
      if(ShowAddCategory.length > 0){
        res.status(200).send(ShowAddCategory);
        status = res.statusMessage;
      }
      else{
        res.status(200).send('Empty Category');
        status = res.statusMessage;
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

  route.post("/ShowSubCategory", async (req, res) => {
    try {
      Request = JSON.stringify(req.body);
      address = req.originalUrl;
      SDATE = Date.now();
  
      var ShowAddCategory = await SubCategory.find({});
   console.log(ShowAddCategory.length);
      
      if(ShowAddCategory.length > 0){
        res.status(200).send(ShowAddCategory);
        status = res.statusMessage;
      }
      else{
        res.status(200).send('Empty SubCategory');
        status = res.statusMessage;
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
  route.post("/ShowProduct", async (req, res) => {
    try {
      Request = JSON.stringify(req.body);
      address = req.originalUrl;
      SDATE = Date.now();
  
      var ShowAddCategory = await Product.find({});
      
      if(ShowAddCategory.length > 0){
        res.status(200).send(ShowAddCategory);
        status = res.statusMessage;
      }
      else{
        res.status(200).send('Empty Product');
        status = res.statusMessage;
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
  
  route.post("/ShowProduct/:id", async (req, res) => {
    try {
      Request = JSON.stringify(req.body);
      address = req.originalUrl;
      SDATE = Date.now();
  
      
      var ShowAddCategory = await Product.findOne({_id:req.params.id});
      
      if(ShowAddCategory.length > 0){
        res.status(200).send(ShowAddCategory);
        status = res.statusMessage;
      }
      else{
        res.status(200).send('Empty Product');
        status = res.statusMessage;
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
 
  
  route.post("/ShowUser", async (req, res) => {
    try {
      Request = JSON.stringify(req.body);
      address = req.originalUrl;
      SDATE = Date.now();
  
      
      var Showregisteration = await reg.find({});
      
      if(Showregisteration.length > 0){
        res.status(200).send(Showregisteration);
        status = res.statusMessage;
      }
      else{
        res.status(200).send('Empty user');
        status = res.statusMessage;
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

module.exports = route;
