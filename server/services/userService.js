const User = require("../Model/user")

module.exports = {
    findUserByEmail: async(email) => {
        try {
            const user = await User.findOne({email});
            return user
        }catch (err) {
            console.log(e.toString());
            next(e);
        }
    },

    findUserById: async(id, next) => {
        try {
            const user  = await User.findOne({id});
            return user
        }catch (err) {
            console.log(e.toString());
            next(e);
        }
    },

createUser: async (next) => {
    try {
        const { Name, email, password } = req.body;
  
        const newUser = await new User({
         Name, email, password
        });
        newUser.save();
        return newUser;
      } catch (err) {
        console.log("error adding books ", err);
        next(err)
      }
},

UpdateUser: async (next) => {
    try {
        const user  = await User.findOneAndUpdate();
        return user
    }catch (err) {
        console.log(e.toString());
        next(e);
    }
}

}