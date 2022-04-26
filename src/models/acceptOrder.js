module.exports = function (mongoose) {
    let options = {
        collection: 'acceptOrder',
        versionKey: false,
    };
    const acceptOrder = new mongoose.Schema({ 
        userId:{
            type:mongoose.Schema.Types.ObjectID
        },
        companyId:{
            type:mongoose.Schema.Types.ObjectID
        },
        companyName:{
            type:String
        },
        farmerSelectStatus:{
            type:String
        },
        productName:{
            type:String
        },
        note:{
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
    
  
    return acceptOrder;
}