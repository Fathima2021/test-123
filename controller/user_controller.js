const UserModel = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.createUser = (req, res) => {
    let name = req.body.name;
    let mobile = req.body.mobile;
    let password = req.body.password;
    let email = req.body.email;
    let photo = req.file.path;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).json({
                status: 0,
                message: err.message
            })
        }
        
        // testing of commit
        bcrypt.hash(password, salt, (err1, hash) => {
            if (err1) return res.status(500).json({
                status: 0,
                message: 'Error Changing Password!'
            })

            const user = new UserModel({
                name: name,
                photo: photo,
                mobile: mobile,
                email: email,
                password: hash
            })

            user.save((err, users) => {
                if (err) {
                    return res.status(400).json({
                        errors: err.message
                    })
                } else {
                    return res.status(200).json({
                        message: "User create sucessfully...."
                    })
                }
            })
        })
    })
}
exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    UserModel.findOne({
        email: email
    }).then((user) => {
        if (!user) {
            return res.status(401).json({
                errors: 'user not found..'
            })
        } else {
            bcrypt.compare(password, user.password, async (err, match) => {
                if (!match) {
                    return res.status(401).json({
                        errors: 'email and password did not match.'
                    })
                } else {
                    let payload = {
                        _id: user._id,
                        email: user.email
                    }
                    const token = jwt.sign(payload, 'text', { expiresIn: '28day' });
                    let data = {
                        token: token
                    }
                    let condtion = {
                        _id: user._id
                    }
                    UserModel.findOneAndUpdate(condtion, data, {
                        new: true,
                    }).then((response) => {
                        return res.status(200).json({
                            status: 1,
                            message: 'Successfully Logged in...',
                            user: response
                        })
                    }).catch((err) => {
                        return res.status(500).json({
                            status: 1,
                            message: `something was rong`
                        })
                    })
                }
            })
        }
    })
}
exports.getUserDetails = (req, res) => {
   return res.status(200).json({
       message:'User details founded',
       data:req.body.user_details
   })
}