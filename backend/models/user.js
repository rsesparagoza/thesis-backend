const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    image: Buffer  
})

userSchema.pre('save', function(next) {
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8, (err, hash) =>{
            if(err) return next(err);

            this.password = hash;
            next();
        })
    }
})


userSchema.methods.comparePassword =  async function (password) {
    if(!password) throw new Error('Password is missing'); 
    try {
        const result = await bcrypt.compare(password, this.password)
        return result;
    } catch (error) {
        console.log('Error while comparing password', error.message)
    }
}

userSchema.statics.EmailInUse = async function (email) {
    if (!email) throw new Error('Invalid Email');
    try {
        const formattedEmail = email.trim().toLowerCase(); // Convert to lowercase and trim
        console.log('Query:', { email: formattedEmail });
        const user = await this.findOne({ email: formattedEmail });
        console.log('User from database:', user);
        console.log('User exists:', !!user);
        return !!user;
    } catch (error) {
        console.log('error inside EmailInUse method', error.message);
        return false;
    }
}



/* userSchema.statics.EmailInUse = async function(email){
    if(!email) throw new Error('Invalid Email');
    try {
        const user = await this.findOne({email})
        if(user) return false
        return !!user;
    } catch (error) {
        console.log('error inside EmailInUse method', error.message)
        return false;
    }
} */

module.exports = mongoose.model('User', userSchema); 

//module.exports = User;
