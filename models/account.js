const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const accountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

accountSchema.pre('save', async function(next) {

    try {

        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        console.log(this.password)
        next()

    } 
    catch (error) {
        next(error)
    }
    
})

accountSchema.methods.comparePassword = function( userPassword ) {

    return bcrypt.compare(userPassword, this.password);
}

const Account = mongoose.model('Account', accountSchema);   // this has to be last code because the methods and middleware are not included before this
module.exports = Account;
// next() function is basically an indicator to finish and move on to the actual task. It's like a green flag to finish