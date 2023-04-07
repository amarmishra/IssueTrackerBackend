function addLabelDataToSession(req,res,next){
    const {queryString}=req.body
    if(req.session.labelAddString){
        req.session.labelAddString+=' '+queryString
        return next()
    }
    //add labelFilterString to the session object
    //which will be cleared once the form gets submitted
    req.session['labelAddString']=queryString
    
    return next()
}
function cleanLabelDataFromSession(req,res,next){
    {
        if(!req.url.includes('/projects') || !req.url.includes('/labels') || !req.url.includes('/issues/create') ){
            delete req.session.labelInputString
            delete req.session.labelFilterString
            return next()
        }
        return next()
    }
}
module.exports={addLabelDataToSession,cleanLabelDataFromSession}