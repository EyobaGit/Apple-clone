// //connecting MySQL with Database
const mysql = require("mysql2");
const express = require("express");
const body_parser = require("body-parser");
const cors=require("cors")

var app = express();

//for classified users
const corsOption={
  origin:[
    "http://localhost:3001",
    // "http://www.evangadi.com",
    // "http://www.apple.com",
  ],
};
app.use(cors(corsOption));

app.use(cors());
// app.use(express.json)
// Use  body parser as middle ware
app.use(body_parser.urlencoded({ extended: true }));

//***creating connection b/n Mysql and database
var mysqlConnection = mysql.createConnection({
  // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock", //path to mysql sock in MAMP
  user: "eyob",
  password: "eyob",
  host: "localhost",
  database: "mydb",
});

mysqlConnection.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected");
});

// Install: Create the tables necessary
// app.get("/iphones", (req, res) => {
//   let message = "Tables Created";
//   // products table
//   let createProducts = `CREATE TABLE if not exists Products(
//         product_id int auto_increment,
//         product_url varchar(255) not null,
//         product_name varchar(255) not null,
//         PRIMARY KEY (product_id)
//     )`;

//   // product Description table
//   let createProductDescription = `CREATE TABLE if not exists ProductDescription(
//       description_id int auto_increment,
//       product_id int(11) not null,
//       product_brief_description varchar(255) not null,
//       product_description varchar(255) not null,
//       product_img varchar(255) not null,
//       product_link varchar(255) not null,

//       PRIMARY KEY (description_id),
//       FOREIGN KEY (product_id) REFERENCES Products(product_id)
//     )`;

//   // product price table
//   let createProductPrice = `CREATE TABLE if not exists ProductPrice(
//     price_id int auto_increment,
//     product_id int(11) not null,
//     starting_price varchar(255) not null,
//     price_range varchar(255) not null,

//     PRIMARY KEY (price_id),
//     FOREIGN KEY (product_id) REFERENCES Products(product_id)
//   )`;

//   let createOrders = `CREATE TABLE if not exists Orders(
//     order_id int auto_increment,
//     product_id int(11) not null,
//     user_id int(11) not null,
//     PRIMARY KEY (order_id),
//     FOREIGN KEY (product_id) REFERENCES Products(product_id)
//   )`;

//   mysqlConnection.query(createProducts, (err, results, fields) => {
//     if (err) console.log(err);
//   });

//   mysqlConnection.query(createProductDescription, (err) => {
//     if (err) console.log(err);
//   });
//   mysqlConnection.query(createProductPrice, (err, results) => {
//     if (err) console.log(err);
//   });
//   mysqlConnection.query(createOrders, (err, results) => {
//     if (err) console.log(err);
//   });
//   res.end(message);
// });




// Insert a new iPhone
// app.post("/addiphones", (req, res) => {
//   let {
//     product_name,
//     product_url,
//     product_brief_description,
//     product_description,
//     product_img,
//     product_link,
//     starting_price,
//     price_range,
//   } = req.body;

//   let insertProduct =
//     "INSERT INTO products (product_url, product_name) VALUES (?, ?)";
//   mysqlConnection.query(
//     insertProduct,
//     [product_url, product_name],
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send("Error inserting product");
//       }

//       let productId = results.insertId;

//       let insertProductDescription =
//         "INSERT INTO ProductDescription (product_id, product_brief_description, product_description, product_img, product_link) VALUES (?, ?, ?, ?, ?)";
//       mysqlConnection.query(
//         insertProductDescription,
//         [
//           productId,
//           product_brief_description,
//           product_description,
//           product_img,
//           product_link,
//         ],
//         (err) => {
//           if (err) {
//             console.error(err);
//             return res.status(500).send("Error inserting product description");
//           }

//           let insertProductPrice =
//             "INSERT INTO ProductPrice (product_id, starting_price, price_range) VALUES (?, ?, ?)";
//           mysqlConnection.query(
//             insertProductPrice,
//             [productId, starting_price, price_range],
//             (err) => {
//               if (err) {
//                 console.error(err);
//                 return res.status(500).send("Error inserting product price");
//               }

//               res.send("Product added successfully");
//             }
//           );
//         }
//       );
//     }
//   );
// });
//Get all iphone's
app.get("/iphones", async(req, res) => {
  mysqlConnection.query(
    "SELECT * FROM products INNER JOIN ProductDescription INNER JOIN ProductPrice ON products.product_id = ProductDescription.product_id AND products.product_id = ProductPrice.product_id",
    (err, rows) => {
      let iphones = {products : [] };
      iphones.products = rows;
      var stringIphones = JSON.stringify(iphones);
      if (!err) res.json({ products: rows });
      else console.log(err);
    }
  );
});

app.listen(5001, () => console.log("listening to 5001"));
