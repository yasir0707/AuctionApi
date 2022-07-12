const express = require("express");
const app = express();
const route = express.Router();
const logs = require("../../_log/logs");
const reg = require("../../_model/register");
const Category = require("../../_model/category");
const SubCategory = require("../../_model/Subcategory");
const Product = require("../../_model/Product");
var multer = require("multer");
const path = require("path");
const Bid = require("../../_model/Bid");
let Request, Response, address, status, message, SDATE, EDATE;

app.use(express.static(path.join(__dirname, "../public/upload")));

var Storage = multer.diskStorage({
  destination: "../public/upload",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: Storage,
}).single("file");

route.post("/AddCategory", upload, (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();

    var imgName = req.file.filename;
    if (req.body.CategoryName != null) {
      if (imgName != null) {
        const CategoryTask = new Category({
          CategoryName: req.body.CategoryName,
          CategoryImage: imgName,
        });
        if (CategoryTask.save()) {
          res.status(200).send("Add Category");
          status = res.statusMessage;
        } else {
          res.status(400).send("Not Cateory");
          status = res.message;
        }
      } else {
        res.status(400).send("Image Not found");
      }
    } else {
      res.status(400).send("CategoryName is reqired");
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

route.post("/SubCategory", upload, (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();
    var imgName = req.file.filename;
    if (req.body.CategoryId != null) {
      if (req.body.SubcategoryName != null) {
        if (imgName != null) {
          const SubcategoryTask = new SubCategory({
            CategoryId: req.body.CategoryId,
            SubcategoryName: req.body.SubcategoryName,
            SubcategoryImage: imgName,
          });
          if (SubcategoryTask.save()) {
            res.status(200).send("Add SubCategory");
            status = res.statusMessage;
          } else {
            res.status(400).send("Not SubCateory");
            status = res.message;
          }
        } else {
          res.status(400).send("Image Not found");
        }
      } else {
        res.status(400).send("SubCategoryName is reqired!");
      }
    } else {
      res.status(400).send("CategoryId is reqired!");
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

route.post("/Product", upload, (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();

    var imgName = req.file.filename;
    if (req.body.CategoryId != null) {
      if (req.body.SubcategoryId != null) {
        if (req.body.ProductName != null) {
          if (imgName != null) {
            if (req.body.ProductTitle != null) {
              if (req.body.ProductDesc != null) {
                if (req.body.ProductPrice != null) {
                  if (req.body.Quantity != null) {
                    if (req.body.CarretQuantity != null) {
                      if (req.body.Time != null) {
                        const ProductTask = new Product({
                          CategoryId: req.body.CategoryId,
                          SubcategoryId: req.body.SubcategoryId,
                          ProductName: req.body.ProductName,
                          ProductImage: imgName,
                          ProductTitle: req.body.ProductTitle,
                          ProductDesc: req.body.ProductDesc,
                          ProductPrice: req.body.ProductPrice,
                          Quantity: req.body.Quantity,
                          CarretQuantity: req.body.CarretQuantity,
                          Time: req.body.Time,
                        });
                        if (ProductTask.save()) {
                          res.status(200).send(ProductTask);
                          status = res.statusMessage;
                        } else {
                          res.status(400).send("Not Product");
                          status = res.message;
                        }
                      } else {
                        res.status(400).send("Time is reqired!");
                      }
                    } else {
                      res.status(400).send("CarretQantity is reqired!");
                    }
                  } else {
                    res.status(400).send("Quantity is reqired!");
                  }
                } else {
                  res.status(400).send("Product Price is reqired!");
                }
              } else {
                res.status(400).send("Product Description is reqired!");
              }
            } else {
              res.status(400).send("Product Title is reqired!");
            }
          } else {
            res.status(400).send("Product Image is reqired!");
          }
        } else {
          res.status(400).send("Product Name is reqired!");
        }
      } else {
        res.status(400).send("SubCategoryId is reqired!");
      }
    } else {
      res.status(400).send("CategoryId is reqired!");
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

//show
route.post("/ShowaddCategory", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();

    var ShowAddCategory = await Category.find({});

    if (ShowAddCategory.length > 0) {
      res.status(200).send(ShowAddCategory);
      status = res.statusMessage;
    }
    else {
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

    if (ShowAddCategory.length > 0) {
      res.status(200).send(ShowAddCategory);
      status = res.statusMessage;
    }
    else {
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

    if (ShowAddCategory.length > 0) {
      res.status(200).send(ShowAddCategory);
      status = res.statusMessage;
    }
    else {
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


    var ShowAddCategory = await Product.findOne({ _id: req.params.id });

    if (ShowAddCategory.length > 0) {
      res.status(200).send(ShowAddCategory);
      status = res.statusMessage;
    }
    else {
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


//Delete

route.post("/deleteCategory", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();

    var CategoryId = req.body.CategoryId;
    var DeleteCategory = await Category.findByIdAndDelete(CategoryId);
    // console.log(DeleteCategory.exec());
    // // res.send(200).send('ok')

    if (DeleteCategory == null || DeleteCategory == undefined) {
      res.status(500).send('Not delete');
      status = res.statusMessage;

    }
    else {
      res.status(200).send('Success Deleted');
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

route.post("/deleteSubCategory", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();

    var SubCategoryId = req.body.SubCategoryId;
    var DeleteSubCategory = await SubCategory.findByIdAndDelete(SubCategoryId);

    if (DeleteSubCategory == null || DeleteSubCategory == undefined) {

      res.status(500).send('Not Delete');
      status = res.statusMessage;
    }
    else {
      res.status(200).send('Success Deleted');
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

route.post("/deleteProduct", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();

    var ProductId = req.body.ProductId;
    var DeleteProduct = await Product.findByIdAndDelete(ProductId);

    if (DeleteProduct == null || DeleteProduct == undefined) {

      res.status(500).send('Not Delete');
      status = res.statusMessage;
    }
    else {
      res.status(200).send('Success Deleted');
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



route.post("/AddBid", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();

    var UserId = req.body.UserId;
    var ProductId = req.body.ProductId;
    var BidPrice = req.body.BidPrice;

    if (UserId != null && UserId) {
      if (ProductId != null && ProductId) {
        if (BidPrice != null && BidPrice) {
          var product = await Product.findOne({ _id: ProductId });
          if (product != null) {
            if (parseInt(product.ProductPrice) < parseInt(BidPrice)) {
              var BidProduct = await Bid.find({ ProductId: ProductId });
              if (BidProduct != null && BidProduct.length > 0) {
                var MaxBidPrice = []; 
                for (var i = 0; i < BidProduct.length; i++) {
                  var BidProductPrice = BidProduct[i].BidPrice;
                  var BidProductPriceInt = parseInt(BidProductPrice)
                  MaxBidPrice.push(BidProductPriceInt);
                }
                console.log(MaxBidPrice);
                var HighestBidPrice = Math.max(...MaxBidPrice);
                // var MaxPrice = Math.max(BidProduct.BidPrice)
                if (BidPrice > HighestBidPrice) {
                  const Bidtask = new Bid({
                    ProductId: ProductId,
                    UserId: UserId,
                    BidPrice: BidPrice,
                  });
                  if (Bidtask.save()) {
                    res.status(200).send(Bidtask);
                    status = res.statusMessage;
                  } else {
                    res.status(400).send("Not Add Bid");
                    status = res.message;
                  }
                }
                else {
                  res.status(400).send("Bid Price greater then  Current Bid Price !");
                }
              }
              else {
                const Bidtask = new Bid({
                  ProductId: ProductId,
                  UserId: UserId,
                  BidPrice: BidPrice,
                });
                if (Bidtask.save()) {
                  res.status(200).send(Bidtask);
                  status = res.statusMessage;
                } else {
                  res.status(400).send("Not Add Bid");
                  status = res.message;
                }

              }


            } else {

              res.status(400).send("Bid Price greater then  Product Price !");
            }
          }
        }
        else {

          res.status(400).send("Bid Price cannot be null !");
        }
      }
      else {
        res.status(400).send("User is reqired!");
      }
    }
    else {
      res.status(400).send("User is reqired!");

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


route.post("/ShowBid", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();


    var ShowBid = await Bid.find({});

    if (ShowBid.length > 0) {
      res.status(200).send(ShowBid);
      status = res.statusMessage;
    }
    else {
      res.status(200).send('Empty Bid');
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



route.post("/ShowProductBid/:id", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();


    var ShowBid = await Bid.find({ ProductId: req.params.id });

    if (ShowBid) {
      res.status(200).send(ShowBid);
      status = res.statusMessage;
    }
    else {
      res.status(200).send('Empty Bid');
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



route.post("/ShowBid/:id", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();


    var ShowBid = await Bid.findOne({ _id: req.params.id });

    if (ShowBid) {
      res.status(200).send(ShowBid);
      status = res.statusMessage;
    }
    else {
      res.status(200).send('Empty Bid');
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
