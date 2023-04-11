const dialog=document.getElementById('add-issue-container')
const openDialogButton=document.querySelector('.dashboard-heading button')
openDialogButton.addEventListener('click',()=>dialog.showModal())
const addIssueForm=document.getElementById('create-issue-form')



const handleIssueFormSubmit=async (e)=>{
    
    e.preventDefault()
    let formData=new FormData(addIssueForm)
   
    let data={
        title:formData.get('title'),
        description:formData.get('description'),
        author:formData.get('author'),
        newLabelArray,
        choosenLabelArray
    }

    //if following fields are not empty throw flash notification
    if(!data.title || !data.description || !data.author){
        console.log("Field is blank")
        return
    }


    try{
        let response=await fetch(`/issues/create/${formData.get('projectId')}`,{
            method:'post',
            body:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        let {success}=await response.json()
       
       if(success){
            if(dialog.open){dialog.close()}
            location.reload(); 
       }
        
        return 
    }
    catch(Err){
        console.log(Err); return
    }
    
   
    
}



addIssueForm.addEventListener('submit',handleIssueFormSubmit)
 
const closeDialogButton=document.getElementById('close-dialog-btn')

    closeDialogButton.addEventListener('click',()=>{
        if(dialog.open){dialog.close()}
        return
    })



//label input box 
const addLabelsInput=document.getElementById('add-labels-input');
const autoCompleteList=document.getElementById('autocomplete-list')
const autoCompleteElements=autoCompleteList.getElementsByClassName('autocomplete-element')

const selectedLabelListDisplay=document.getElementById('selected-labels-list')
const selectedLabelDisplayElementsRemoveButtons=selectedLabelListDisplay.getElementsByClassName('remove-label-button')

let choosenLabelArray=[];       //stores the ids of known labels  


let newLabelArray=[];           //stores the name of new labels--
                                //to be added on form submission if not already exist.


let currIndex;

addLabelsInput.addEventListener('input',async (e)=>{
  
        //send fetch post request if value not empty
    if(addLabelsInput.value){
        //set loader on inputbox and make it disbled
        // e.target.setAttribute('disabled',true)
        
        let response=await fetch('/labels/suggestLabels',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
                 },
            body:JSON.stringify({
                queryString:addLabelsInput.value
            })
        })

        let {success,data}=await response.json();
        

        if(success && data.length!==0){
            //display autocomplete list

            currIndex=-1;
            //hideVisibleAutoCompleteList()
         
            autoCompleteList.removeAttribute('hidden')
            autoCompleteList.innerHTML=''
            data.map((label)=>{
                return autoCompleteList.innerHTML += `<div class='autocomplete-element' data-id=${label._id}>${label.name}</div>`
            })


           
            //add EventListeners for adding autocomplete elements
            for(let element of autoCompleteElements){
                element.addEventListener('click',(e)=>{
                            let id=e.target.getAttribute('data-id')
                    
                            if(choosenLabelArray.filter((val)=>{ return val.id===id }).length===0){
                                choosenLabelArray.push({id,name:e.target.innerText})
                                autoCompleteList.setAttribute('hidden',"true")
                                renderSelectedLabelsDisplay()
                            }
                            
                           
                        })
            }
            
        }
      
        else{
            autoCompleteList.setAttribute('hidden','true')
            return
        }
        
   

        //remove loader and make inputbox enabled
        // e.target.removeAttribute('disabled')

        //clear value
       
        
    }
   
   
})


    function renderSelectedLabelsDisplay(){
        //add elements of choosenLabelsArray and newLabelsArray
        //in selected-labels-list div
        selectedLabelListDisplay.innerHTML=''
        choosenLabelArray.forEach((label)=>{
            selectedLabelListDisplay.innerHTML+=`<div data-id=${label.id}>${label.name}<button type="button" class='remove-label-button' data-id=${label.id}>x</button></div>`
        })
        newLabelArray.forEach((label)=>{
            selectedLabelListDisplay.innerHTML+=`<div data-name="${label}">${label}<button type="button" class='remove-label-button' data-name="${label}">x</button></div>`
        })


         //add EventListeners for removing label on click
         for(let removeButton of selectedLabelDisplayElementsRemoveButtons){
            removeButton.addEventListener('click',(e)=>{
                if(removeButton.hasAttribute("data-id")){
                
                    let id=removeButton.getAttribute('data-id')
                    choosenLabelArray=choosenLabelArray.filter((label)=>{
                        return label.id!==id
                    })
                    
                    let childToBeRemoved=selectedLabelListDisplay.querySelector(`[data-id="${id}"]`)
                    childToBeRemoved.remove()
                }

                if(removeButton.hasAttribute("data-name")){
                    
                    let name=removeButton.getAttribute('data-name')
                   
                    newLabelArray=newLabelArray.filter((label)=>{
                        return label!==name
                    })
                    
                    
                    let childToBeRemoved=selectedLabelListDisplay.querySelector(`[data-name="${name}"]`)
                    childToBeRemoved.remove()
                }
            })
        }

        return
    }

        


   
//event listeners for adding new labels on pressing enter or tab

addLabelsInput.addEventListener('keydown',async (e)=>{
    if(( e.code == "Enter" || e.code =="Tab" ) && e.target.value){
        //space is pressed and value is present
        let value=e.target.value.trim()
    
        //add to New Label Array
        if(!newLabelArray.includes(value)){
            newLabelArray.push(value)
        }
        
        e.target.value=''
        renderSelectedLabelsDisplay()
    }
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
// const filterInputs=document.getElementsByClassName('filter-input');

// for(let input of filterInputs){
//     input.addEventListener('change',filterResult)
// }


  


//filter by author and title
const filterAuthTitleBoxes=document.getElementsByClassName('filter-input')

for(let box of filterAuthTitleBoxes){
    let data={}
    box.addEventListener('keyup',async(e)=>{
        if(e.keyCode === 13 && box.value )
        {
           
            //send fetch request
            if(e.target.getAttribute('name')==='author'){
               
                data['author']=box.value
            }
            if(e.target.getAttribute('name')==='title'){
               
                data['title']=box.value
            }
          
            let response =await fetch(`/issues/filter/${(window.location.href.split('/')).slice(-1)[0]}`,{
                method:'post',
                body:JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            let {success,data:issuesList}=await response.json()
            if(success){
                
                renderFilteredIssueDashboard(issuesList)
                return
            }
           
        }
        if(!box.value){
            location.reload();
        }
    })
}

//helper function
function returnTags(labelArr){
    let str=''

    labelArr.map((label)=>{
        str+=`<button>${label.name}</button>`
    })
    return str
}

//helper function to generate display for filtered issuesList
function renderFilteredIssueDashboard(issuesList){

    let issueDashBoard=document.querySelector('div.issues-dashboard')
    if(issuesList){

        issueDashBoard.innerHTML=''
         issuesList.map((issue)=>{ 
           issueDashBoard.innerHTML+=
           ` <div class="issue-container">
                
                <div class="heading">
                <span>Title : &nbsp;${issue.title}</span>
                
                <span>Author : &nbsp;${issue.author}</span>
                </div>

                <div class="description">
                    <h4>Description</h4>
                    <p>${issue.description}</p>
                </div>

                <div class="tags">

                    <div class="crud-btn-container">
                        <button class="crud-issue-button" data-id=${ issue._id }>...</button>
                        <div id= ${ issue._id } class="drop-down-list" style="display:none;" >
                            <ul id='drop-down-list' style="list-style:none;">
                                <li><button data-id='delete'>DELETE</button></li>
                                <li data-id='edit'>EDIT</li>
                            </ul>
                        </div>
                    </div>

                    <div class="label-list">
                    ${(issue['labels']) ?  returnTags(issue['labels']): '' }
                    </div>
                </div>
            </div>`
         }) 
    }else{
        `<div class="issue-container"> 
             <span>NO ISSUES/BUGS FOR THIS PROJECT. PLEASE CREATE ONE</span>
        </div>`
    }

    const editButtons=document.getElementsByClassName('crud-issue-button')
        for(let i=0;i<editButtons.length;i++){
        editButtons[i].addEventListener('click',toggleDialog)
    }

    return
}



// filter by tags
//label input box 

const filterLabelsInput=document.getElementById('filter-labels-input');
const filterautoCompleteList=document.getElementById('filter-autocomplete-list')


const filterselectedLabelListDisplay=document.getElementById('filter-selected-labels-list')
const filterselectedLabelDisplayElementsRemoveButtons=filterselectedLabelListDisplay.getElementsByClassName('remove-label-button')

let filterLabelArray=[];  //stores the ids of known labels  

//focus event on input ---> filter by tags
filterLabelsInput.addEventListener('focus',async (e)=>{


    if(!filterLabelsInput.value ){

        //if the value is nothing, pull all the labels of the project in autocomplete list
     
        let response=await fetch(`/labels/suggestLabels/${filterLabelsInput.getAttribute('data-projectId')}`)


        let {success,data}=await response.json();
            

        if(success && data.length!==0){
            //display autocomplete list

            filterautoCompleteList.removeAttribute('hidden')
            filterautoCompleteList.innerHTML=''
            data.map((label)=>{
                return filterautoCompleteList.innerHTML += `<div class='autocomplete-element' data-id=${label._id}>${label.name}</div>`
            })


            let filterautoCompleteElements=filterautoCompleteList.getElementsByClassName('autocomplete-element')
            //add EventListeners for adding autocomplete elements
            for(let element of filterautoCompleteElements){
               
                element.addEventListener('click',(e)=>{
                            let id=element.getAttribute('data-id')
                          
                            if(filterLabelArray.filter((val)=>{ return val.id===id }).length===0){
                                filterLabelArray.push({id,name:element.innerText})
                                filterautoCompleteList.setAttribute('hidden',"true")
                                renderFilterSelectedLabelsDisplay()
                            }
                        })
            }
            
        }else{
            filterautoCompleteList.setAttribute('hidden',true)
            return
        }
        
        
    }
    
})

//helper function
async function  renderFilterSelectedLabelsDisplay(){

    let labelIdArray=[];
    filterselectedLabelListDisplay.innerHTML=''
    filterLabelArray.forEach((label)=>{
        filterselectedLabelListDisplay.innerHTML+=`<div data-id=${label.id}>${label.name}<button type="button" class='remove-label-button' data-id=${label.id}>x</button></div>`
        labelIdArray.push(label.id);
    })

    //send fetch post request for filter issue by labels
    if(labelIdArray.length!==0){
        let response =await fetch(`/issues/filter/${(window.location.href.split('/')).slice(-1)[0]}`,{
            method:'post',
            body:JSON.stringify({labelIdArray}),
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        let {success,data:issuesList}=await response.json()
        if(success){
      
            renderFilteredIssueDashboard(issuesList)
            
        }
    }
    if(labelIdArray.length===0){
        location.reload()
        return
    }



    for(let removeButton of filterselectedLabelDisplayElementsRemoveButtons){
        removeButton.addEventListener('click',(e)=>{
            
            
                let id=removeButton.getAttribute('data-id')
                filterLabelArray=filterLabelArray.filter((label)=>{
                    return label.id!==id
                })
                
                let childToBeRemoved=filterselectedLabelListDisplay.querySelector(`[data-id="${id}"]`)
                childToBeRemoved.remove()
                renderFilterSelectedLabelsDisplay()

        })
    }
}

//close autocomplete list on click anywhere outside the body
document.addEventListener('click',(e)=>{

   

        if(e.target.getAttribute('id')==='filter-labels-input'){
            return
        }
        // if(e.target.getAttribute('id')==='create-issue-submit-btn'){
        //     e.preventDefault()
        //     handleIssueFormSubmit()
        //     return
        // }
     
        if(  !filterautoCompleteList.getAttribute('hidden') && e.target.getAttribute('class')!=='autocomplete-element'  ){
            filterautoCompleteList.setAttribute('hidden','true')
            return
        }
        if(  !autoCompleteList.getAttribute('hidden') && e.target.getAttribute('class')!=='autocomplete-element'  ){
            autoCompleteList.setAttribute('hidden','true')
            return
        }
   
   console.log("Click event on doucment is triggered")
})


filterLabelsInput.addEventListener('input',async (e)=>{

    try{
    if(filterLabelsInput.value){
        //if the value is nothing, pull all the labels of the project in autocomplete list
        let response=await fetch(`/labels/suggestLabels/`,{
            method:'post',
            body:JSON.stringify({
                queryString:filterLabelsInput.value
            }),
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })


        let {success,data}=await response.json();
            

        if(success && data.length!==0){
            //display autocomplete list

        
            filterautoCompleteList.removeAttribute('hidden')
            filterautoCompleteList.innerHTML=''
            data.map((label)=>{
                return filterautoCompleteList.innerHTML += `<div class='autocomplete-element' data-id=${label._id}>${label.name}</div>`
            })

            let filterautoCompleteElements=filterautoCompleteList.getElementsByClassName('autocomplete-element')
        
            //add EventListeners for adding autocomplete elements
            for(let element of filterautoCompleteElements){
                element.addEventListener('click',(e)=>{
                            let id=e.target.getAttribute('data-id')
                    
                            if(filterLabelArray.filter((val)=>{ return val.id===id }).length===0){
                                filterLabelArray.push({id,name:e.target.innerText})
                                filterautoCompleteList.setAttribute('hidden',"true")
                                renderFilterSelectedLabelsDisplay()
                            }
                            
                        
                        })
            }
            
        }
        else{
            filterautoCompleteList.setAttribute('hidden','true')
            return
        }
        
    }else   if(!filterLabelsInput.value ){

        //if the value is nothing, pull all the labels of the project in autocomplete list
     
        let response=await fetch(`/labels/suggestLabels/${filterLabelsInput.getAttribute('data-projectId')}`)


        let {success,data}=await response.json();
            

        if(success && data.length!==0){
            //display autocomplete list

            filterautoCompleteList.removeAttribute('hidden')
            filterautoCompleteList.innerHTML=''
            data.map((label)=>{
                return filterautoCompleteList.innerHTML += `<div class='autocomplete-element' data-id=${label._id}>${label.name}</div>`
            })


            let filterautoCompleteElements=filterautoCompleteList.getElementsByClassName('autocomplete-element')
            //add EventListeners for adding autocomplete elements
            for(let element of filterautoCompleteElements){
               
                element.addEventListener('click',(e)=>{
                            let id=element.getAttribute('data-id')
                            console.log("Selected tag",id)
                            if(filterLabelArray.filter((val)=>{ return val.id===id }).length===0){
                                filterLabelArray.push({id,name:element.innerText})
                                filterautoCompleteList.setAttribute('hidden',"true")
                                renderFilterSelectedLabelsDisplay()
                            }
                        })
            }
            
        }else{
            filterautoCompleteList.setAttribute('hidden',true)
            return
        }
        
        
    }
    }
    catch(Error){
        console.log(Error);
        return
    }  
})