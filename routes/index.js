let express = require('express')
let router = express.Router();
let wikiRouter = require('./wiki');
let userRouter = require('./user');
let {Page, User} = require('../models')



router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', (req, res, next) => {
    Page.findAll().then((result)=>{
        res.render('index',{pages:result})
    })
    
})



module.exports = router