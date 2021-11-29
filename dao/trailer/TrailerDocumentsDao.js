const TrailerDocuments = require("../../models/trailer/TrailerDocuments");
const DocumentsDao = require("../DocumentsDao");
const dbCon = require("../Connection");


class TrailerDocumentsDao extends DocumentsDao {
    db=dbCon
    constructor() {
        super(TrailerDocuments)
    }

    async mountObj(data) {
        const documents = {
            ...data,
            expiration: this.datetimeToDate(data.expiration)
        }
        return new TrailerDocuments(documents)
    }

    // findByFilePath(path){
    //     this.db.query('SELECT name, expiration FROM trailer_documents WHERE url = "/public/Trailers/1636375948328/practica_react.txt" ' , (result, err) => {
            
    //         return  this.mountObj(result)
    //     })
         
    // }

}
module.exports = TrailerDocumentsDao