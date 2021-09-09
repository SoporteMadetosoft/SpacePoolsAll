class Documents {
    constructor({ id, name, filename, filesize, filetype, mtime, url }) {
        this.id = id
        this.name = name
        this.filename = filename
        this.filesize = filesize
        this.filetype = filetype
        this.mtime = mtime
        this.url = url
    }
}
module.exports = Documents