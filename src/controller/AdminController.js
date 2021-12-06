let Users = require('../model/users')

function ManagementUser(req,res){
    Users.findAll({}).then(dt => {
        // console.log('find data...', dt)
        let data = dt
        if(req.params.json === 'json'){
            return res.json(data)
        }
        else{
            res.render('management_user', {data})

        }
    })
}

function EditUser(req,res){
    console.log('parmas...',req.params.uid)
    Users.findOne({where: {uid: req.params.uid}}).then(data => {
        console.log('find data EDITTTT...', data)
        // let data = dt
        res.render('edit_user', {data})
    })
}

function PostEditUser(req,res){
    console.log('parmas...',req.body)
    Users.update(req.body, {
          where: {
            uid: req.body.uid
          }
        }).then(() => {
            console.log("Update: Done!");
            res.send('Successfully Updated...  <a href="http://localhost:8888/management-user">Management User</a>')

        });
}

function DeleteUser(req,res){
    Users.destroy({where:{uid: req.params.uid}})
    .then(() => {res.send('Delete Successfully User'+ req.params.uid)})
}

let Admin = {ManagementUser, EditUser, PostEditUser, DeleteUser}

module.exports = Admin