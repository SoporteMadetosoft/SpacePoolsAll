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
            if (filePath !== null) {
                if (!fs.existsSync(`${__dirname}/../../public/${filePath}/`)) {
                    const dateNow = filePath;
                    fs.mkdirSync(`./public/${dateNow}`);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    uploadFile(filePath, files) {
        if (filePath !== null) {
            files.forEach(element => {
                const file = element;
                file.mv(`${__dirname}/../../public/${filePath}/${file.name}`, err => {
                    if (err) {
                        console.error(err);
                    }
                })
            })
        }
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
                if (filePath !== null) {
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

                            if (doc.length === 0) {

                                // const { mime: filetype } = await FileType.fromFile(`${__dirname}/../../public/${filePath}/${filename}`);
                                const { size: filesize } = fs.statSync(`${__dirname}/../../public/${filePath}/${filename}`);
                                doc = {
                                    name: '',
                                    filename,
                                    filesize: this.helperFileSize(filesize),
                                    filetype: '',
                                    // filetype: this.helperMime(filetype),
                                    url: `/public/${filePath}/${filename}`
                                }
                            }
                            documents.push(doc);

                        }
                        resolve(documents)
                    });
                } else {
                    resolve([])
                }
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
            'application/vnd.ms-excel': 'XLS',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
            'application/vnd.ms-powerpoint': 'PPT',
            'application/xml': 'XML',
            'application/zip': 'ZIP',
            'application/x-compressed-zip': 'ZIP',
            'application/x-rar-compressed': 'RAR',
            'application/x-tar': 'TAR/TAR.GZ',
            'application/x-bzip2': 'BZ2',
            'image/gif': 'GIF',
            'image/jpeg': 'JPEG',
            'image/png': 'PNG',
            'image/svg+xml': 'SVG',
            'image/tiff': 'TIFF',
            'text/csv': 'CSV',
            'text/plain': 'Texto'
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