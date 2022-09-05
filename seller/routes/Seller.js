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
const  fs  = require("fs");
let Request, Response, address, status, message, SDATE, EDATE;
const base64 = require('node-base64-image');
const WinProduct = require("../../_model/WinProduct");

app.use(express.static(path.join(__dirname, "../public/upload")));

var Storage = multer.diskStorage({
  destination: "../public/upload",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var FileLocation = {
  root: path.join(__dirname,"/upload/")
};
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

route.post("/AddSubCategoryByName", upload, async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();
    var imgName = req.file.filename;
    var GetCategoryId
if(req.body.CategoryName != null){
    const GetCategory = await Category.findOne({CategoryName:req.body.CategoryName});
    console.log(GetCategory._id);
    GetCategoryId = GetCategory._id
}
else{
  res.status(400).send("CategoryName is Required");
  status = res.statusMessage;
         
} 

      if (req.body.SubcategoryName != null) {
        if (imgName != null) {
          const SubcategoryTask = new SubCategory({
            CategoryId: GetCategoryId,
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


route.post("/ShowSubCategory/:id", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();

    var ShowAddCategory = await SubCategory.find({CategoryId:req.params.id});
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

    var ShowProduct = await Product.findOne({ _id: req.params.id });

    if (ShowProduct) {
      // console.log(ShowProduct.ProductImage);
      // console.log(FileLocation+ShowProduct.ProductImage);
      // res.sendFile(__dirname+"/upload/"+ShowProduct.ProductImage);
      // res.sendFile(ShowProduct.ProductImage,FileLocation,(err)=>{
      //   if(err){
      //     console.log(err,FileLocation)
      //   }
      //   else{
      //     console.log('ok')
      //   }
      // })
      res.status(200).send(ShowProduct);
      status = res.statusMessage;
    }
    else {
      res.status(400).send('Empty Product');
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


route.post("/ShowProductV2/:id", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();
    var ShowProduct = await Product.findOne({ _id: req.params.id });

    if (ShowProduct) {
      // res.sendFile(__dirname+"/upload/"+ShowProduct.ProductImage);
      
      // var GetImage = path.join(__dirname+"/upload/"+ShowProduct.ProductImage);

       fs.readFile(path.join(__dirname+"/upload/"+ShowProduct.ProductImage) ,(err,data)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log(data);
        var ImageToBuffer = new Buffer(data).toString('base64');
        console.log(ImageToBuffer)
      // fs.writeFile(ShowProduct.ProductImage,ImageToBuffer,(err,data)=>{
      //   if(err){
      //     console.log(err)
          
      //   }
      //   else{
      //    console.log(data)   
      //   }
      // })
        // res.send(data);
      }
     })
    //  res.sendFile(ShowProduct.ProductImage,FileLocation,(err)=>{
      //   if(err){
      //     console.log(err,FileLocation)
      //   }
      //   else{
      //     console.log('ok')
      //   }
      // })
      // res.status(200).send(ShowProduct);
      status = res.statusMessage;
    }
    else {
      res.status(400).send('Empty Product');
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
                var HighestBidPrice = Math.max(...MaxBidPrice);
                // var MaxPrice = Math.max(BidProduct.BidPrice)
                if (BidPrice > HighestBidPrice) {
                  const Bidtask = new Bid({
                    ProductId: ProductId,
                    UserId: UserId,
                    BidPrice: BidPrice,
                  });
                  if (Bidtask.save()) {
                    res.status(200).jsonp({message:"Add Bid",content:Bidtask});
                    status = res.statusMessage;
                  } else {
                    res.status(400).jsonp({message:"Not Add Bid"});
                    status = res.message;
                  }
                }
                else {
                  res.status(400).jsonp({message:"Bid Price greater then  Current Bid Price !"});
                }
              }
              else {
                const Bidtask = new Bid({
                  ProductId: ProductId,
                  UserId: UserId,
                  BidPrice: BidPrice,
                });
                if (Bidtask.save()) {
                  res.status(200).jsonp({message:"Add Bid",content:Bidtask});
                  status = res.statusMessage;
                } else {
                  res.status(400).jsonp({message:"Not Add Bid"});
                  status = res.message;
                }

              }


            } else {

              res.status(400).send("Bid Price greater then  Product Price !");
            }
          }
          else{
            
          res.status(400).send("Product not found !");
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
      res.status(400).send('Empty Bid');
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



route.post("/ShowUserBid/:id", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();


    var ShowBid = await Bid.find({ UserId: req.params.id });

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


route.post("/ShowBidAndProductDetail/:id", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();

    var GetData  = [];
    var ShowBid = await Bid.find({ UserId: req.params.id });
    // GetData.push(ShowBid);
    var P_ID;
    var P_Data = [];
    if (ShowBid) {
      for(var i= 0 ;i < ShowBid.length;i++){
        // console.log(ShowBid[i].ProductId)
        P_ID = ShowBid[i].ProductId;
        if(P_ID){
          var GetProductData = await Product.find({_id:P_ID});
          GetData.push(GetProductData);
            // console.log(P_Data);
        }
        else{
          res.status(400).send('Empty Product');
        }
      }

      var GetBidProductData = [];
      for(var i= 0 ;i < ShowBid.length;i++){
        var GetProductDtata = GetData[i]
          // console.log(GetProductData[0])
        var f_Data = {
          "Bid_Id":ShowBid[i]._id,
          "Bid_UserId":ShowBid[i].UserId,
          "Bid_ProductId":ShowBid[i].ProductId,
          "Bid_BidPrice":ShowBid[i].BidPrice,
          "Product_Id":GetProductDtata[0]._id,
          "Product_CategoryId":GetProductDtata[0].CategoryId,
          "Product_SubcategoryId":GetProductDtata[0].SubcategoryId,
          "Product_ProductName":GetProductDtata[0].ProductName,
          "Product_ProductImage":GetProductDtata[0].ProductImage,
          "Product_ProductTitle":GetProductDtata[0].ProductTitle,
          "Product_ProductDesc":GetProductDtata[0].ProductDesc,
          "Product_ProductPrice":GetProductDtata[0].ProductPrice,
          "Product_Quantity":GetProductDtata[0].Quantity,
          "Product_CarretQuantity":GetProductDtata[0].CarretQuantity,
          "Product_Time":GetProductDtata[0].Time,
        }
        GetBidProductData.push(f_Data);
      }
      // console.log(ShowBid[2].BidPrice);
      // console.log(GetData[i]);
      
      var f_Data1 = {
        
        "Bid_Id":'',
        "Bid_UserId":'',
        "Bid_ProductId":'',
        "Product_Id":'',
        "Product_CategoryId":'',
        "Product_SubcategoryId":'',
        "Product_ProductName":'',
        "Product_ProductImage":'',
        "Product_ProductTitle":'',
        "Product_ProductDesc":'',
        "Product_ProductPrice":'',
        "Product_Quantity":'',
        "Product_CarretQuantity":'',
        "Product_Time":'',
      
      }
      // var result = ShowBid.map( (item,i) => item.concat(GetData[i]));
      // var res1 = ShowBid.map((o, i) => o.concat(GetData[i]));
      var array3 = ShowBid;
      
      res.status(200).jsonp({Bid:GetBidProductData});
      status = res.statusMessage;
    }
    else {
      res.status(400).send('Empty Bid');
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


route.post("/EOD", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();

    var ShowProduct = await Product.find({});

    if(ShowProduct.length > 0){
      for(var i = 0 ; i < ShowProduct.length;i++){
        // console.log(ShowProduct[i].Time);
        let productTime = ShowProduct[i].Time;
        let newTime = productTime - 1;
        let productId = ShowProduct[i]._id;
        if(productTime > 1 ){
            
        var UpdateTime  =  Product.findByIdAndUpdate(productId,{
          Time:newTime,
        })
        if(UpdateTime.exec()){
          // res.status(200).jsonp({msg:"Update Time"});
          status = res.statusMessage;
        }
        else{
          // res.status(500).jsonp({msg:"Update Time"});
          status = res.statusMessage;
        }
        }
        else{
          const ProductTask = new WinProduct({
            ProductId:ShowProduct[i]._id,
            CategoryId: ShowProduct[i].CategoryId,
            SubcategoryId: ShowProduct[i].SubcategoryId,
            ProductName: ShowProduct[i].ProductName,
            ProductImage: ShowProduct[i].ProductImage,
            ProductTitle: ShowProduct[i].ProductTitle,
            ProductDesc: ShowProduct[i].ProductDesc,
            ProductPrice: ShowProduct[i].ProductPrice,
            Quantity: ShowProduct[i].Quantity,
            CarretQuantity: ShowProduct[i].CarretQuantity,
            Time: ShowProduct[i].Time,
          });
          ProductTask.save();
          var DeleteProduct = await Product.findByIdAndDelete(ShowProduct[i]._id);
   
        }
      }
    }

    
          // res.status(200).jsonp({msg:"Update Time"});
    // if (DeleteProduct == null || DeleteProduct == undefined) {

    //   res.status(500).send('Not Delete');
    //   status = res.statusMessage;
    // }
    // else {
    //   res.status(200).send('Success Deleted');
    //   status = res.statusMessage;
    // }
    EDATE = Date.now();
  } catch (e) {
    status = res.message;

    message = e;
    res.status(500).json(e.message);
  }
  logs(Request, Response, status, address, message, SDATE, EDATE);
  res.end();
});


route.post("/WinBid", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();

    var ShowProduct = await WinProduct.find({});
    var ShowBid = await Bid.find({});
    var HighBidPrice = 0 ;
    var ShowBidPrice ;          
    var ShowBidProductId;       
    var ShowBidProductIdHighPrice;
    
    var ShowUserId;       
    var ShowUserIdHighPrice;
    var showHighPriceData = false;
    var showResult = [];
    for(var i = 0;i<ShowProduct.length;i++)
    {
        var ProductId = ShowProduct[i].ProductId;
        var ProductName = ShowProduct[i].ProductName;
        var ProductImage = ShowProduct[i].ProductImage;
        var ProductPrice = ShowProduct[i].ProductPrice;

        for(var j = 0 ;j< ShowBid.length;j++){
          ShowBidProductId = ShowBid[j].ProductId;
          if(ProductId == ShowBidProductId){
             ShowBidPrice = ShowBid[j].BidPrice;
             ShowUserId= ShowBid[j].UserId;
              if(parseInt(HighBidPrice) < parseInt(ShowBidPrice)){
                HighBidPrice = ShowBidPrice;
                ShowBidProductIdHighPrice = ShowBidProductId;
                ShowUserIdHighPrice = ShowUserId;
                showHighPriceData = true;
              }  
             

          }
          
        }
        if(showHighPriceData){
         const show_Date = {
          "productid":ShowBidProductIdHighPrice,
          "HighBidPrice":HighBidPrice,
          "userId":ShowUserIdHighPrice,
          "ProductName":ProductName,
          "ProductImage":ProductImage,
          "ProductPrice":ProductPrice,
         }

          showResult.push(show_Date);
          // console.log(ShowBidProductIdHighPrice,HighBidPrice,ShowUserIdHighPrice)
          showHighPriceData = false;
          HighBidPrice = 0;
        }
        
    }

    res.status(200).jsonp({"content":showResult})
    
    EDATE = Date.now();
  } catch (e) {
    status = res.message;

    message = e;
    res.status(500).json(e.message);
  }
  logs(Request, Response, status, address, message, SDATE, EDATE);
  res.end();
});


// Get User Detail
route.post("/GetUserDetail/:id", async (req, res) => {
  try {
    Request = JSON.stringify(req.body);
    address = req.originalUrl;
    SDATE = Date.now();

    var ShowProduct = await reg.findById({_id:req.params.id});
    if(ShowProduct){
      let GetData = {
        'Name':ShowProduct.Name,
        'Shop':ShowProduct.Shop,
        'Number':ShowProduct.Number,
        'Age':ShowProduct.Age
      } 
      res.status(200).jsonp({'content':GetData});
      status = res.statusMessage;
    }
    else{
      
      res.status(400).send('Not Found');
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
