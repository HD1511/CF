const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://harsh:Harry%401511@cluster0.mlsgk9w.mongodb.net/codeforces?retryWrites=true&w=majority")
    .then(() => console.log("done..."))
    .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User