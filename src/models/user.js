module.exports = function (mongoose) {
    let options = {
        collection: 'user',
        versionKey: false,
        timestamps: {
			createdAt: true,
			updatedAt: 'modifiedAt'
		}
    };
    const userSchema = new mongoose.Schema({
        role:{
                type: String,
                enum: ['farmer','company'],
            },

        firstName: {
            type : String
        },
        lastName: {
            type : String
        },
        companyName: {
            type : String
        },
        companyType: {
            type : String
        },
        email: {
            type: String,
            unique:true
        },
        mobile: {
            type: String,
            unique:true
        },
        gender: {
            type: String,
        },
        addressLine1:{
            type: String
        },
        addressLine2:{
            type: String
        },
        state:{
            type: String
        },
        city:{
            type: String
        },
        totalLand: {
            type: String
        },
        sizeUnitOfLand: {
            type: String
        },
        landType: {
            type: String
        },
        token: {
            type : String
        },
        about:{
            type : String
        },
        password:{
            type : String
        },
        socialMediaType:{
            type : String
        },
        signupType:{
            type : String
        },
        otp:{
            type : String
        }
        
    }, options);
    
  
    return userSchema;
}