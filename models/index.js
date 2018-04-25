const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    content:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    status:{
        type: Sequelize.ENUM('open','close')
    },
    date:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW
    }
},  {
    getterMethods: {
        route() {
            return '/wiki/' + this.urlTitle;
        }
    }
})


function generateUrlTitle (title) {
    if (title) {
        // Removes all non-alphanumeric characters from title
        // And make whitespace underscore
        return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
        // Generates random 5 letter string
        return Math.random().toString(36).substring(2, 7);
    }
}

Page.beforeValidate((pageInstance, optionsObject) => {
    pageInstance.urlTitle = generateUrlTitle(pageInstance.title);
})



const User = db.define('user',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        validate: {
            isEmail:true
        },
        allowNull: false
    }
})

Page.belongsTo(User, { as: 'author' });


module.exports = {
    Page : Page,
    User : User
}