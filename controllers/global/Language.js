const LanguageDao = require('../../dao/global/LanguageDao')

const languageDao = new LanguageDao()

exports.list = async (req, res) => {

    try {
        res.json({
            ok: true,
            data: await languageDao.findAll()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}