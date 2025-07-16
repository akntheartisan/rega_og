const mongoose = require("mongoose");


const ListItem = new mongoose.Schema({
    model:{
        type:String
    },
    color:{
      type:String
    },
    subModelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
})

const BucketList = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userregister",
  },
  list: {
    type: [ListItem],
  },
},{timestamps:true});


module.exports = mongoose.model("BucketList", BucketList);