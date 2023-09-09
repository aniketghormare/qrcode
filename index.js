const express = require("express");
const ejs = require("ejs");
const path = require("path");
const qrcode = require("qrcode");
const app = express();
const {connect}=require("./db_connect/qrcode.connect.js")
const {QrcodeModel}=require("./model/qrcode.model.js")
require("dotenv").config()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scan", (req, res) => {
  const name = req.body.input_text;
  const email = req.body.input_email;
  const number = req.body.input_number;

  const info = {
    name,
    email,
    number,
  };

  qrcode.toDataURL(JSON.stringify(info), async(err, src) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    const data=new QrcodeModel(info)

    await data.save()

    res.render("scan", {
      src,
    });
  });
});

app.listen(process.env.PORT, async() => {
    try{
        await connect
        console.log(`Server is running at port ${process.env.PORT}`);
    }catch(err){
        console.log(err);
    }
 
});
