const {
    getDataById,
    selectDataUsers,
    insertData,
    updateDataById,
    deleteDataById,
    findUser,
    insertOTP,
    getOTP,
    changePassword
} = require("../models/usersModel");
const argon2 = require("argon2");// eslint-disable-line no-unused-vars
const email = require("../middleware/email");
const UsersController = {
    // show all data user
    getUsers: async (req, res, next) => {
        try { 
            const showUsers = await selectDataUsers();
            if (!showUsers) {
                res.status(400).json({status:400,message:"Data user not found"});
            }
            res.status(200).json({status:200,message:"data found",data:showUsers.rows});
        } catch (error) {
            next(error);
        }
    },
    // show data user by id
    findUserByID: async (req, res, next) => {
        try {
            let data = {
                id: req.payload.id
            };

            let result = await getDataById(data);
            if (!result) {
                return res.status(400).json({ status: 404, message: "Error data user not found"});    
            } else {
                res.status(200).json({ status: 200, message: "data found", data: result.rows });
            }
        } catch (error) {  
            next(error);
        }
    },
    //post data atau add data users
    createUsers: async (req, res, next) => {
        try {
            const data = {};
            data.name = req.body.name;
            data.email = req.body.email;
            data.phone = req.body.phone;
            data.password = req.body.password;
            data.retypepassword = req.body.retypepassword;
            const addData = await insertData(data);
            if (!addData) {
                res.status(400).json({ status: 400, message: "Error input data failed"});
            }
            res.status(201).json({status:201,message:"input data success",data:data});    
        } catch (error) {
            next(error);
        }
    },
    //update data user
    updateUsers: async (req, res, next) => {
        try {
            const id = req.payload.id;
            const data = {};
            data.fullname = req.body.fullname;
            data.email = req.body.email;
            const updateData = await updateDataById(id, data);
            if (!updateData) {
                return res.status(400).json({status:404,message:"Error request data user not found"});
            }
            // const showUsers = await selectUserById("id", id);
            return res.status(201).json({status:201,message:"update data success"});
        } catch (error) {
            res.status(404).json({status:404,message:"Error request delete data failed"});
            next(error);
        }
    },
    //remove data user
    removeDataById: async (req, res, next) => {
        try {
            const id = req.payload.id;
            const email = req.body.email;
            const removeData = await deleteDataById(id, email);
            if (!removeData) {
                res.status(404).json({status:404,message:"Error request delete data failed"});
            }
            res.status(200).json({status:200,message:"delete data success",data:`email users: ${email} deleted`});
        } catch (error) {
            res.status(404).json({status:404,message:"Error request delete data failed"});
            next(error);
        }
    },
    //send otp forgot passwod
    sendOTPEmail: async (req, res, next) => {
        try {
            if (!req.body.email) {
                res.status(404).json({ status: 404, message: "Please fill your email"});
            } else {
                let { rows: [users] } = await findUser(req.body.email);
                if (users) {
                    let otp = Math.floor(100000 + Math.random() * 900000);

                    let inOTP = await insertOTP(req.body.email, otp);
                    if (!inOTP) {
                        res.status(404).json({ status: 404, message: "Failed to get OTP" });
                    } else {
                        try {
                            let sendEmail = email(req.body.email, otp);
                            if(sendEmail == "email not send"){
                                res.status(404).json({ status: 404, message: "Failed to send email" });                
                            } else {
                                res.status(200).json({ status: 200, message: "Please check your email" });
                            }
                        } catch (error) {
                            res.status(404).json({ status: 404, error: error.message });
                        }
                    }
                } else {
                    res.status(404).json({ status: 404, message: "User not found" });
                }
            }
        } catch (error) {
            next(error);
        }
    },
    verifyChangePassword: async (req,res,next)=>{
        try {
            if (!req.body.email || !req.body.otp) {
                res.status(404).json({ status: 404, message: "Please fill your email and OTP" });
            } else {
                let findEmail = await getOTP(req.body.email, req.body.otp);
                if (!findEmail.rows[0]) {
                    res.status(404).json({ status: 404, message: "Your email or OTP wrong" });
                } else {
                    res.status(200).json({ status: 200, message: "Confirm success", data: findEmail.rows });
                }
            }
        } catch (error) {
            next(error);
        }
    },
    resetPassword: async (req,res,next)=>{
        try {
            if (!req.body.password || !req.body.email) {
                res.status(404).json({ status: 404, message: "Please fill all column" });
            }else {
                let password = await argon2.hash(req.body.password);
                let reset = await changePassword(req.body.email, password);
                if (!reset) {
                    res.status(404).json({ status: 404, message: "Reset password failed" });
                } else {
                    res.status(200).json({ status: 200, message: "Reset password success" });
                }
            }
        } catch (error) {
            next(error);
        }
    }
};

module.exports = UsersController;