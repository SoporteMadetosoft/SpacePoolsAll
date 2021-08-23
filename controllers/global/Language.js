const LanguageDao = require('../../dao/global/LanguageDao')

const languageDao = new LanguageDao()

exports.select = async (req, res) => {

    try{
        res.json({
            ok:true,
            data: await languageDao.getSelect() 
        })
    }catch(error){
        console.log(error)
        return res.status(500).send(error);
    }
}