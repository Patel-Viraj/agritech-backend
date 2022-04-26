const error = require("../messages/error");
const msgs = require("../messages/success");

exports.addProduct = (req,res)=>{
        const companyType = new db.models.addProductFarmer(req.body);
        companyType.save().then((data,err)=>{
            if(err){console.log(err);return res.status(500).send({status: false,message:err.message});}
            return res.status(201).send({status:true,message:msgs.dataInsertedSuccessfully});
        });
}

exports.acceptOffer = (req,res)=>{
    console.log(req.body);
    const accept = new db.models.acceptOrder(req.body);
    accept.save().then((data,err)=>{
        if(err){console.log(err);return res.status(500).send({status: false,message:err.message});}
        return res.status(201).send({status:true,message:msgs.dataInsertedSuccessfully});
    });
}

exports.getUserProduct = (req,res)=>{
    db.models.addProductFarmer.find({userId:req.params._id},(err,data)=>{
        if(err){return res.status(500).send({status: false,message:err.message});}
        if(!data){return res.status(204).send({status:false,message:error.notFound});}
        return res.status(200).send({status: true,data:data});
    });
}

exports.getAcceptOrderFarmer = (req,res)=>{
    db.models.acceptOrder.find({userId:req.params._id},(err,data)=>{
        if(err){return res.status(500).send({status: false,message:err.message});}
        if(!data){return res.status(204).send({status:false,message:error.notFound});}
        return res.status(200).send({status: true,data:data});
    });
}
exports.getAcceptOrderCompany = (req,res)=>{
    db.models.acceptOrder.find({companyId:req.params._id},(err,data)=>{
        if(err){return res.status(500).send({status: false,message:err.message});}
        if(!data){return res.status(204).send({status:false,message:error.notFound});}
        return res.status(200).send({status: true,data:data});
    });
}

exports.farmerAcceptOrRejectOffer= function (req, res) {
    db.models.acceptOrder.updateOne({_id:req.params._id},{$set:{
        "farmerSelectStatus": req.body.farmerSelectStatus,
        "note":req.body.note,
      }},(err,data)=>{
          console.log(data);
               if(err){return res.status(500).send({status:false,message:err.message});}
               return res.status(200).send({status:true,message:msgs.success});
           });
  }


exports.getAllProduct = (req,res)=>{
    db.models.addProductFarmer.find((err,data)=>{
        if(err){return res.status(500).send({status: false,message:err.message});}
        if(!data){return res.status(204).send({status:false,message:error.notFound});}
        return res.status(200).send({status: true,data:data});
    });
}

exports.deleteAddProduct = (req,res)=>{
    db.models.addProductFarmer.deleteOne({_id:req.params._id},(err,data)=>{
        if(err){return res.status(500).send({status:false,message:err.message});}
        return res.status(200).send({status: true,message:msgs.dataDeletedSuccessfully})
    });
}















// exports.deleteSpeciality = (req,res)=>{
//     db.models.speciality.deleteOne({_id:req.params._id},(err,data)=>{
//         if(err){return res.status(500).send({status:false,message:err.message});}
//         return res.status(200).send({status: true,message:msgs.dataDeletedSuccessfully})
//     });
// }

// exports.deleteAddProduct = (req,res)=>{
//     db.models.company_type.deleteOne({_id:req.params._id},(err,data)=>{
//         if(err){return res.status(500).send({status:false,message:err.message});}
//         return res.status(200).send({status: true,message:msgs.dataDeletedSuccessfully})
//     });
// }

// exports.deleteIndustryType = (req,res)=>{
//     db.models.industry_type.deleteOne({_id:req.params._id},(err,data)=>{
//         if(err){return res.status(500).send({status:false,message:err.message});}
//         return res.status(201).send({status: true,message:msgs.dataDeletedSuccessfully})
//     });
// }



// exports.getAllSpecialities = (req,res)=>{
//     db.models.speciality.find((err,data)=>{
//         if(err){return res.status(500).send({status: false,message:err.message});}
//         if(!data){return res.status(204).send({status:false,message:error.notFound});}
//         return res.status(200).send({status: true,data:data});
//     });
// }

// exports.getAllIndustryTypes = (req,res)=>{
//     db.models.industry_type.find((err,data)=>{
//         if(err){return res.status(500).send({status: false,message:err.message});}
//         if(!data){return res.status(204).send({status:false,message:error.notFound});}
//         return res.status(200).send({status: true,data:data});
//     });
// }

// exports.getAllCountry = (req,res)=>{
//     db.models.country.find((err,data)=>{
//         if(err){return res.status(500).send({status: false,message:err.message});}
//         return res.status(200).send({status:true,message: msgs.success,data: data});
//     });
// }


// exports.getAllCities = (req,res)=>{
//     db.models.cities.find((err,data)=>{
//         if(err){return res.status(500).send({status: false,message:err.message});}
//         return res.status(200).send({status:true,message: msgs.success,data: data});
//     });
// }


// exports.getCompanyDetail = (req,res)=>{
//     db.models.companyDetails.findOne({companyname:req.params.companyname},(err,data)=>{
//         if(err){return res.status(500).send({status:false,message:err.message});}
//         return res.status(200).send({status: true,message:"get data", data:data})
//     });
// }

// exports.getCompanySize = (req,res)=>{
//     db.models.company_size.find((err,data)=>{
//         if(err){return res.status(500).send({status: false,message:err.message});}
//         return res.status(200).send({status:true,message: msgs.success,data: data});
//     });
// }

// exports.setDefaultCompanyType = (req,res)=>{
//     db.models.company_type.updateOne({default:true},{$set:{default:false}},(err,data)=>{
//         if(err){return res.status(500).send({status:false,message:err.message});}
//     });

//     db.models.company_type.updateOne({_id:req.params.id},{$set:{default:true}},(err,data)=>{

//         if(err){return res.status(500).send({status:false,message:err.message});}
//         return res.status(200).send({status:true,message:msgs.success});
//     });
// } 

// exports.setDefaultIndustryType = (req,res)=>{
//     db.models.industry_type.updateOne({default:true},{$set:{default:false}},(err,data)=>{
//         if(err){return res.status(500).send({status:false,message:err.message});}
//     });
//     db.models.industry_type.updateOne({_id:req.params.id},{$set:{default:true}},(err,data)=>{
//         if(err){return res.status(500).send({status:false,message:err.message});}
//         return res.status(200).send({status:true,message:msgs.success});
//     });
// } 

// exports.setDefaultSpeciality = (req,res)=>{
//     db.models.speciality.updateOne({default:true},{$set:{default:false}},(err,data)=>{
//         if(err){return res.status(500).send({status:false,message:err.message});}
//     });
//     db.models.speciality.updateOne({_id:req.params._id},{$set:{default:true}},(err,data)=>{
//         if(err){return res.status(500).send({status:false,message:err.message});}
//         return res.status(200).send({status:true,message:msgs.success});
//     });
// } 