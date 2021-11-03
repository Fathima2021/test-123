module.exports = ((req, res, next) => {
    if (typeof (req.file) === 'undefined' || typeof (req.body) === 'undefined') {
        return res.status(400).json({
            errors: 'problem with send data'
        })
    }
    if (!(req.file.mimetype).includes('.jpeg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('jpg')) {
        fs.unlinkSync(req.file.path)
        return res.status(400).json({
            message: 'file not supported...x'
        })
    }
    return next()
})