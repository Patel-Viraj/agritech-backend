module.exports = function (mongoose) {
    let options = {
        collection: 'addProductFarmer',
        versionKey: false,
    };
    const addProductFarmer = new mongoose.Schema({ 
        userId:{
            type:mongoose.Schema.Types.ObjectID
        },
        farmerName:{
            type:String
        },
        mobile:{
            type:String
        },
        productName:{
            type:String
        },
        price:{
            type:String
        },
        pricePerWeight:{
            type:String
        },
        Quality:{
            type:String
        },
        Quantity:{
            type:String
        },
        quantityWeight:{
            type:String
        }

        
    }, options);
    
  
    return addProductFarmer;
}