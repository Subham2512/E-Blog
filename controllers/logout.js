module.exports = (req,res)=>{
    loggedIn = null
    req.session.destroy(()=>{
        res.redirect('/')
    })
}