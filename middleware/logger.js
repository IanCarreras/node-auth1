module.exports = () => (req, res, next) => {
    console.log({
        time: new Date().toLocaleString(),
        method: req.method,
        path: req.path,
        url: req.url
    })
    next()
}