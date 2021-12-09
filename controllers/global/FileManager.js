const FileManagerDao = require('../../dao/global/FileManagerDao');

const fileManagerDao = new FileManagerDao();

exports.create = async (req, res) => {
    try {
        fileManagerDao.createFile(req.body.filePath)
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.upload = async (req, res) => {
    try {
        const dateNow = req.body.filePath;

        const files = [].concat(req.files.file);
        fileManagerDao.uploadFile(dateNow, files)
        return res.json({ ok: true })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
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

exports.delete = async (req, res) => {
    try {
        fileManagerDao.deleteFile(req.body.url)
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}
