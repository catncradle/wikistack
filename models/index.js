const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page',{
    title:{
        type: Sequelize.STRING
    },
    urlTitle:{
        type: Sequelize.TEXT
    },
    content:{
        type: Sequelize.TEXT
    },
    status:{
        type: Sequelize.ENUM('open','close')
    }
})

const User = db.define('user',{
    name:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING,
        validate: {
            isEmail:true
        }
    }
})



// db.sync()
// .then(()=>{
//     console.log('db synced')
// })

module.exports = {
    Page : Page,
    User : User
}