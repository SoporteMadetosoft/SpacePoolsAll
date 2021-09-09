const fs = require('fs');
const FileType = require('file-type');

class FileManagerDao {
    constructor(dao) {
        if (dao) {
            this.dao = new dao({});
        }
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
                }
            })
        })
    }

    deleteFile(url) {
        try {
            fs.unlinkSync(`${__dirname}/../../${url}`)
        } catch (err) {
            console.error(err)
        }
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
                        let doc = []
                        if (this.dao) {
                            doc = await this.dao.findByFilePath(`/public/${filePath}/${filename}`)
                        }

                        console.log(doc)

                        if (doc.length === 0) {

                            const { mime: filetype } = await FileType.fromFile(`${__dirname}/../../public/${filePath}/${filename}`);
                            const { size: filesize, mtime } = await fs.statSync(`${__dirname}/../../public/${filePath}/${filename}`);
                            doc = {
                                filename,
                                filesize: this.helperFileSize(filesize),
                                filetype: this.helperMime(filetype),
                                mtime,
                                url: `/public/${filePath}/${filename}`
                            }
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

    helperMime(filetype) {
        const extensions = {
            'application/pdf': 'PDF',
            'application/msword': 'DOC',
            'image/gif': 'GIF',
            'image/jpeg': 'JPEG',
            'image/png': 'PNG',
            'application/zip': 'ZIP',
            'application/x-compressed-zip': 'ZIP',
            'application/x-bzip2': 'BZ2',
            'application/vnd.ms-excel': 'XLS',
            'text/plain': 'Texto',
            'application/x-tar': 'TAR/TAR.GZ',
            'image/svg+xml': 'SVG',
            'text/xml': 'XML'
        }
        return extensions[filetype]
    }

    helperFileSize(filesize) {
        const fileSizeInMB = filesize / (1024 * 1024)
        const formatedSize = (Math.round(fileSizeInMB * 100) / 100).toFixed(2);

        return `${formatedSize} MB`
    }

}
module.exports = FileManagerDao