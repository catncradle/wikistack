const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');



router.get('/add', (req, res, next) => {
    res.render('addpage', {name: 'Carlos', email: 'carlos@gmail.com', content: 'Hi', status: 'open'})
})

router.get('/', (req,res,next) => {
    res.redirect('/');
})


router.post('/', (req, res, next) => {
    User.findOrCreate({where:{name: req.body.name},defaults:{email:req.body.email}})
    .spread((user,created)=>{
        return user 
    }).then(result=>{
    return Page.create({
            title: req.body.title,
            content: req.body.content,
            authorId: result.id
        })
    }).then(result =>{
        res.redirect(result.route)
    }).catch(next)


    //     Page.create({
    //     title: req.body.title,
    //     content: req.body.content  
    // }).then((result) => {
    //     // res.json(result.urlTitle);
    //     res.redirect(result.route)
    // }).catch(next)
});

router.get('/:urlTitle',(req,res,next)=>{
    let url = req.params.urlTitle
    Page.findAll({
        where:{
            urlTitle : url
        }
    }).then((result)=>{res.render('wikipage',{title:result[0].title,content:result[0].content})})
    .catch(next)
    // res.send(thePage)
})




module.exports = router;

// let person = Object.defineProperties('name', {
//     get: function () {
//         return 'xifeng';
//     },
//     set: function(newName) {
//         this.name = newName;
//     }
// });

// let person = {};
// person.name = 'xifeng';
// person.name;

