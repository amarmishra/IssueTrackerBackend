const handleSignUp=async (e)=>{
    e.preventDefault()
    let formData=new FormData(e.target)
    try{
        await fetch('/users/signup',{
            method:'POST',
            body:{
                name:formData.get('name'),
                email:formData.get('email'),
                password:formData.get('password'),
            }
        })
    
    }
    catch(err){
        console.log(`Error in signing up :${err}`)
    }
    
}


const handleSignIn=async (e)=>{
    console.log("Request sent for login")
    e.preventDefault()
    let formData=new FormData(e.target)
    try{
        await fetch('/users/login',{
            method:'POST',
            body:{
                email:formData.get('email'),
                password:formData.get('password'),
            }
        })
    
    }
    catch(err){
        console.log(`Error in signing up :${err}`)
    }
}