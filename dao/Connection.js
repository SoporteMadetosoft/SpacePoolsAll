const mysql = require('mysql');

const db_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}

let db = mysql.createConnection(db_config);

db.connect((err) => {
    if (err) {
        console.log(err);
        db = reconnect(db);
    } else {
        console.log("MYSQL Connected...");
    }
});

const reconnect = (db) => {
    console.log("\n New connection tentative...");
    if (db) db.destroy();
    //- Try to reconnect
    db.connect((err) => {
        if (err) {
            //- Try to connect every 2 seconds.
            setTimeout(reconnect(db), 2000);
        } else {
            console.log("\n\t *** New connection established with the database. ***")
            return db;
        }
    });
}

//- Error listener
db.on('error', (err) => {

    //- The server close the connection.
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        db = reconnect(db);
    }

    //- Connection in closing
    else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        db = reconnect(db);
    }

    //- Fatal error : connection variable must be recreated
    else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        db = reconnect(db);
    }

    //- Error because a connection is already being established
    else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
    }

    //- Anything else
    else {
        console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
        db = reconnect(db);
    }

});

module.exports = db;