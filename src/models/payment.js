module.exports = function (mongoose) {
    let options = {
        collection: 'payment',
        versionKey: false,
    };
    const payment = new mongoose.Schema({ 
        userId:{
            type:mongoose.Schema.Types.ObjectID
        },
        companyId:{
            type:mongoose.Schema.Types.ObjectID
        },
        cardId:{
            type:String
        },
        paymentId:{
            type:String
        },
        companyName:{
            type:String
        },
        cardBrand:{
            type:String
        },
        productName:{
            type:String
        },
        amountPay:{
            type:String
        },
       
    }, options);
    
  
    return payment;
}