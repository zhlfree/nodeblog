var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* list all users. */

router.get('/', function(req, res) {
    User.find(function(err, users){
        if(err){
            console.log('user findall err'+err);
        }else{
            res.json({users:users});
        }
    });
});

/* save user */

router.post('/',function(req, res){
    var user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.save(function(err){
        if(err){
            console.log('user save err'+err);
        }
        res.json({msg:'user save success'});
    });
});

/*  get user by username */

router.get('/:username',function(req, res){
    var name = req.params.username;
    User.findOne({name:name},function(err,user){
        if(err){
            console.log('get user by name err'+err);
        }else{
            res.json({user:user});
        }
    });
});


/* update user by name */
router.put('/:username',function(req, res){
    
    var name = req.params.username;
    var email = req.body.email;

    var query = {name:name};
    User.update(query,{email:email},function(err){
        if(err){
            console.log('user update err+'+err);
        }else{
            var result = User.findOne({name:name},function(err,user){
                if(err){
                    console.log('get user after update err+'+err);
                }else{
                    res.json({msg: 'user update success',user:user});
                }
            });
        }
    });

});

/* delete user by name */

router.delete('/:username',function(req, res){
    var name = req.params.username;
    var query = {name: name};

    User.remove(query,function(err){
        if(err){
            console.log('delete user err+'+err);
        }else{
            res.json({msg:'delete user success'});
        }
    });
});

module.exports = router;
