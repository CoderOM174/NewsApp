const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        
    },
    description:{
        type: String,
    },
    imgUrl:{
        type: String,
    },
    newsUrl:{
        type: String,
    },
    author:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    source:{
        type: String
    }
   
  });

  const News = mongoose.model('news', NewsSchema);
  module.exports=News;