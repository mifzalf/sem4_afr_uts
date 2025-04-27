let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sem4_back_front'
});

connection.connect(function(error){
    if(error){
        console.log(error);
    }
    else{
        console.log('Connection success');
    }
})

module.exports = connection;