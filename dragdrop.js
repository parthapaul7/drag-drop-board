const card= document.getElementsByClassName('card')
const dragcar=document.getElementById('drag');
const dragcard=document.getElementsByClassName('drag');
const save = document.getElementById('save')

let item={};
let edit=false

for(let i=0;i<16;i++){
    console.log("done",card[0]);
    let dive= document.createElement('div')
    card[0].append(dive)
}

dragdrop();

function dragdrop(){

    for (box of dragcard)
{
    box.addEventListener('dragstart',(e)=>{

    console.log(box);
    
    setTimeout(()=>{
        e.target.classList.add("hide");
        console.log('dragstart and id chaged to hide');
        item= e.target
        console.log(item);
        
         
    },0)
});
    box.addEventListener('dragend',(e)=>{
    console.log('dragend and id chaged to drag');
    e.target.className='drag';
    })

    box.addEventListener('click',(e)=>{
        console.log("clicked on drag");

        e.target.setAttribute("contenteditable", 'true');
        console.log(e.target);
        
        
        
    })

}

for (box of card)
{
    console.log(dragcard[0]);
    
    box.addEventListener('drop',(e)=>{
        
        console.log('drop and append dragdrop element',e.target);
        let ca=document.createElement('div')
        ca.append(dragcar.innerText)
        e.target.append(item)     
    })
    box.addEventListener('dragover',(e)=>{
        console.log('dragover');
        
        e.preventDefault();
        
        
    });

    // box.addEventListener('dragenter',(e)=>{
    //     console.log('enter the card');
    //     // e.target.className='dashed';
        
        
    // });
    // box.addEventListener('dragleave',(e)=>{
    //     console.log('leave the card');
        
    //     e.target.className = 'card';
        
    // })
}
   

}

save.addEventListener('click',()=>{
   console.log("clicked on card");
   
    
    for (boxes of dragcard){
        boxes.setAttribute("contenteditable", "false");
    }
})