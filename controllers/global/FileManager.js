const FileManagerDao = require('../../dao/global/FileManagerDao');

const fileManagerDao = new FileManagerDao();

exports.create = async (req, res) => {
    try {
        await fileManagerDao.createFile(req.body.filePath)
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.load = async (req, res) => {
    try {
        const documents = await fileManagerDao.getDocumentsInfo(req.body.filePath)
        res.json({ ok: true, data: documents })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

