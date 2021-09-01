
const CarrierDao = require('../../dao/carrier/CarrierDao')
const express = require('express');
const fileUpload = require('express-fileupload');
const FileManagerDao = require('../../dao/global/FileManagerDao');

const app = express();

app.use(fileUpload());

const carrierDao = new CarrierDao()
const fileManagerDao = new FileManagerDao()

exports.list = async (req, res) => {
    try {
        res.json({
            ok: true,
            data: await carrierDao.findAll()
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.select = async (req, res) => {

    try {
        res.json({
            ok: true,
            data: await carrierDao.getSelect()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.listByID = async (req, res) => {
    const id = parseInt(req.body.id, 10)

    try {
        res.json({
            ok: true,
            data: await carrierDao.findById(id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        await carrierDao.deleteById(id)
        res.json({ ok: true, msg: `Success deleting id ${id}` })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

exports.insert = async (req, res) => {
    try {
        /** INSERT CARRIER */
        const carrier = req.body.form
        delete carrier.documents

        await carrierDao.insert(carrier)
        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.update = (req, res) => {
    try {
        /**UPDATE CARRIER */
        const carrier = req.body.form
        delete carrier.documents

        carrierDao.update(carrier)
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

        await fileManagerDao.uploadFile(dateNow, files)

        return res.json({ ok: true, filePath: dateNow })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}