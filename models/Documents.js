class Documents {
    constructor({ id, name, filename, filesize, filetype, url }) {
        this.id = id
        this.name = name
        this.filename = filename
        this.filesize = filesize
        this.filetype = filetype
        this.url = url
    }
}
module.exports = Documents