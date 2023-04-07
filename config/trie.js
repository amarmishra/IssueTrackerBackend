const Trie = require('mnemonist/trie-map');
const Label=require('../models/labels');

//pull list from the database
let labels;
(async function pullLabelData(){
    labels= await Label.find({});
})()

let listLabelNames={}
let trie;
if(labels){
    //create trie from labels in database

    labels.forEach((label)=>{
        listLabelNames[label.name]=label.id;
    })
    
    trie = Trie.from(listLabelNames);
}   
else{

    //create a new trie

    trie=new Trie();
}


module.exports=trie;


