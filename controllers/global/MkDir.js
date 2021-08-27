const fs = require('fs');

exports.mkdir = (req, res) => {
    try {
        if (!fs.existsSync(`${__dirname}/../../public/${req.body.filePath}/`)) {
            dateNow = req.body.filePath;
            fs.mkdirSync(`./public/${dateNow}`);
        }
        res.json({ ok: true })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

}