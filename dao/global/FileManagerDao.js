const fs = require('fs');
const FileType = require('file-type');


class FileManagerDao {

    constructor() {
    }

    createFile(filePath) {
        try {
            if (!fs.existsSync(`${__dirname}/../../public/${filePath}/`)) {
                const dateNow = filePath;
                fs.mkdirSync(`./public/${dateNow}`);
            }
        } catch (error) {
            console.log(error)
        }
    }

    uploadFile(filePath, files) {
        files.forEach(element => {
            const file = element;
            file.mv(`${__dirname}/../../public/${filePath}/${file.name}`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
            })
        })
    }

    getDocumentsInfo(filePath) {
        return new Promise((resolve, reject) => {
            try {
                fs.readdir(`${__dirname}/../../public/${filePath}/`, async (err, files) => {
                    if (err) {
                        reject(err)
                    }

                    let documents = [];

                    for (const filename of files) {
                        // const all = await FileType.fromFile(`${__dirname}/../../public/${filePath}/${filename}`);
                        // console.log(all)
                        const { size: filesize, mtime } = fs.statSync(`${__dirname}/../../public/${filePath}/${filename}`);
                        const doc = {
                            filename,
                            filesize,
                            // filetype,
                            mtime,
                            url: `/public/${filePath}/${filename}`
                        }
                        documents.push(doc);
                    }
                    resolve(documents)
                });
            } catch (err) {
                console.error(err);
                reject(err)
            }
        })
    }
}
module.exports = FileManagerDao