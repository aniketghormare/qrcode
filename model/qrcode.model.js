const mongoose = require("mongoose");

const QrcodeSchema = mongoose.Schema({
  name: String,
  email: String,
  number: Number,
});


const QrcodeModel=mongoose.model("qrcode",QrcodeSchema)


module.exports={
    QrcodeModel
}
