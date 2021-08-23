const db = require('../../../models/dbconecction')

exports.list = async (req, res) => {
    try{
        db.query('SELECT m.*, b.name as Brand FROM setup_model m, setup_model_brand b WHERE b.id = m.brand', [], async(err, result) => {
            if(err){
                return res.status(500).send(err);
            }else{
                res.send(result);
            }
        });
    }catch (error) {
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => { general.deleteGeneral( t.types.setupModel, req, (req, result) => { res.send(result) } ) }

exports.insert = async (req, res) => {
    try{
        const { name } = req.body;

        db.query('INSERT INTO setup_model (name) VALUES (?)', [name], async(err) => {
            if(err){
                return res.status(500).send('CustomerType/Insert -> Algo ha salido mal');
            }
        });
    }catch (error) {
        res.status(403).send(`No se ha podido insertar la información debido a ${error}`)
    }
}