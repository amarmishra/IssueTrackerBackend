// const projectFlashCard=$('flash-card')
// const description=$('.description')

// projectFlashCard.click(async ()=>{
//     //const json=await $.get(`/project/fetch-description/?id=${}`) 
    
//     const data=descripionEJSdata.filter((obj)=>{
//         obj.key==$(this).attr('id' )
//     }).value
//     alert(data)
//     //description.append(`<span>${data}</span>`)
// })



// const handleProjectFormSubmit=(e)=>{
//     e.preventDefault();
//     let formData=new FormData(e.target)
//     let {name,description,author}=formData;
//     console.log(name,description,author)
//     // fetch('/projects/create',{
//     //     method:'POST',
//     //     body:{
//     //         name:formData.get('name'),
//     //         description:formData.get('')
//     //     }
//     // })
// }

const dialog=document.getElementById('add-project-container')
    const openAddProjectDialog=()=>{
       
        if(!dialog.open){
            dialog.showModal()
        }
        
    }
    
    const projectBtn=document.getElementById('add-project-btn')
    projectBtn.addEventListener('click',openAddProjectDialog)
    
    
    const closeDialogBox=()=>{
   
        if(dialog.open){
            dialog.close()
        }
    }
    
    const closeBtn=document.getElementById('close-dialog-btn')
    closeBtn.addEventListener('click',closeDialogBox)
