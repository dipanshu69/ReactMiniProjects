const mongoose = require("mongoose");
const Schema = mongoose.Schema

const AdSchema = new Schema({
    company:{
        type:String,
        required:true
    },
    primaryText:{
        type:String,
        required:true
    },
    headline:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    imageUrl:{
        type:String,
        required:true
    },
    CTA:{
        type:String,
        required:true
    },
    companyId:{
        type:String,
        required:true,
    },
});

const CompanyAd = mongoose.model("CompanyAd", AdSchema);

module.exports = CompanyAd;