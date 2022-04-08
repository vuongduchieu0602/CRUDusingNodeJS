const UserDB = require('../model/model');

//create and save new user
exports.create = async(req, res) => {
    const {name, email, gender, status} = req.body;
    //validate request
    if(!req.body){
        res
            .status(400)
            .json({success: false, message: "Content can not be empty!"})
        return;
    }

    //new user
    const newUser = new UserDB({
        name: name,
        email: email,
        gender: gender,
        status: status
    })
    //save user
    await newUser
            .save()
            .then(data =>{
                // res.send(data);
                res.redirect('/add-user');
            })
            .catch(err => {
                res
                    .status(500)
                    .json({success: false, message: err.message||"Some error occurred while creating a create operation"})
            })
}

//retrieve and return all users | retriveve and return a single user
exports.find = async(req, res) => {
    const id = req.query.id;

    if(req.query.id)
    {
        UserDB.findById(id)
            .then(data => {
                if(!data){
                    res
                        .status(404)
                        .json({success: false, message: "Not found user with id " + id});
                }else{
                    res.json(data);
                }
            })
            .catch(err => {
                res.status(500).json({success: false, message: "Error retrieving user with id " + id});
            })
    }else{
        UserDB.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res
                .status(500)
                .json({success: false, message: err.message||"Error occurred while retrieving user information"});
        })
    }
}

//Update a new identified user by user id
exports.update = async(req, res) => {
    if(!req.body){
        res
            .status(500)
            .json({success: false, message: "Data to update can not be empty"})
    }

    const id = req.params.id;
    UserDB.findByIdAndUpdate(id, req.body, {userFindAndModify: false})
        .then(data =>{
            if(!data){
                res
                    .status(400)
                    .json({success: false, message: `Cannot update user with id ${id}. Maybe user not found!`})
            }else{
                res
                    .status(200)
                    .json({success: true, data})
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({success: false, message: "Error update user information"})
        })
}

//Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const  id = req.params.id;

    UserDB.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res
                .status(404)
                .json({success: false, message: `Cannot delete with id ${id}. Maybe id is wrong`});
        }else{
            res
                .status(200)
                .json({success: true, messsage: "User was deleted successfully!"});
        }
    })
    .catch(err => {
        res
            .status(500)
            .json({success: false, message: "Could not delete User with id =" + id});
    });
}