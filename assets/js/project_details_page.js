
const handleIssueFormSubmit=(e)=>{
    //e.preventDefault();
    
    // let formData=new FormData(e.target)
    // let data={
    //     name:formData.get('name'),
    //     description:formData.get('description'),
    //     author:formData.get('author')
    // }
    
    // fetch('/projects/create',{
    //     method:'post',
    //     body:JSON.stringify(data),
    //     headers: {
    //         "Content-Type": "application/json",
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    // })
    const dialog=document.getElementById('add-issue-container')
    dialog.close()
}
const dialog=document.getElementById('add-issue-container')
const openDialogButton=document.querySelector('.dashboard-heading button')
openDialogButton.addEventListener('click',()=>dialog.showModal())
const addIssueForm=document.getElementById('create-issue-form')
addIssueForm.addEventListener('submit',handleIssueFormSubmit)

const closeDialogButton=document.getElementById('close-dialog-btn')

    closeDialogButton.addEventListener('click',()=>{
        if(dialog.open){dialog.close()}
        return
    })






//JS for toggle edit menu for issues
function toggleDialog(e){
    const div=document.getElementById(e.target.getAttribute('data-id'))
    
    if(div.style.display==='none'){

        div.style.display='block';

    }
    else if(div.style.display==='block'){
        
        div.style.display='none';
    }
}

const editButtons=document.getElementsByClassName('crud-issue-button')
for(let i=0;i<editButtons.length;i++){
    editButtons[i].addEventListener('click',toggleDialog)
}



//filter projects by search
const filterInputs=document.getElementsByClassName('filter-input');
const filterForm=document.getElementById('filter-issue-form');
var filterInputTitle=null
var filterInputAuthor=null
var filterInputTags=null
for(let input of filterInputs){
    input.addEventListener('change',filterResult)
}

async function filterResult(e){

  
        filterForm.submit();

      

         
        //     // console.log(filterInputAuthor,"author")
        //     // console.log(filterInputTitle,"title")
        //     // console.log(filterInputTags,"tags")
            
        //     // let res=await  fetch('/issues/filter',{
        //     //     method:'POST',
        //     //     body:JSON.stringify({
        //     //         'author':filterInputAuthor,
        //     //         'title':filterInputTitle,
        //     //         'tags':filterInputTags,
        //     //         }),
        //     //     headers: {
        //     //         "Content-type": 'application/x-www-form-urlencoded',
        //     //       },
        //     // })
      
        
    }
    
  

