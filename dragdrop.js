const card= document.getElementsByClassName('card')
let dragcard=document.getElementsByClassName('drag');
const save = document.getElementById('save')
const titles= document.getElementsByTagName('h5')
const messeges= document.getElementsByTagName('p')
const addTask= document.getElementById('addTask')
const saveCard= document.getElementsByClassName('saveCard')

let item={};
let edit=false
let dataX=[]
let dataY=[]
let dataZ=[]
let obj={
    title:"",
    msg:"",
}



for(let i=0;i<8;i++){
    
    let x=document.createElement('div')
    x.setAttribute('class','x')
    card[0].append(x)
    let y=document.createElement('div')
    y.setAttribute('class','y')
    card[1].append(y)
    let z=document.createElement('div')
    z.setAttribute('class','z')
    card[2].append(z)
    console.log("done",card[1]);

}

const x= document.getElementsByClassName('x')
const y=document.getElementsByClassName('y')
const z= document.getElementsByClassName('z')

initilise()

function initilise(){

    dataX=JSON.parse(localStorage.getItem('datax'))
    if(dataX!=null){
    dataX.forEach((e,i) => {
        let elem=`<div class="drag" id="drag" draggable="true" >
        <h5>${e.title}</h5>
        <p> ${e.msg}</p>
        <button id="del">Delete</button>
        <button class="saveCard">save</button>
      </div>`;

    //    console.log(box);
      
        x[i].innerHTML=elem
        
    });}

    else dataX=[]

    dataY=JSON.parse(localStorage.getItem('datay'))
    if(dataY!=null){
    dataY.forEach((e,i) => {
        let elem=`<div class="drag" id="drag" draggable="true" style="background-color: yellow" >
        <h5>${e.title}</h5>
        <p> ${e.msg}</p>
        <button id="del">Delete</button>
        <button class="saveCard">save</button>
      </div>`;

    //    console.log(box);
      
        y[i].innerHTML=elem
        
    });}

    else dataY=[]

    dataZ=JSON.parse(localStorage.getItem('dataz'))
    if(dataZ!=null){
    dataZ.forEach((e,i) => {
        let elem=`<div class="drag" id="drag" draggable="true" style="background-color: green">
        <h5>${e.title}</h5>
        <p> ${e.msg}</p>
        <button id="del"> Delete </button>
        <button class="saveCard">save</button>
      </div>`;

       console.log(e.title);
      
        z[i].innerHTML=elem
        
    });}

    else dataZ=[]
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

    // box.addEventListener('click',(e)=>{
    //     console.log("clicked on drag");

    //     e.target.setAttribute("contenteditable", 'true');
    //     console.log(e.target);
        
        
        
    // })

}

for (box of card)
{
    
    box.addEventListener('drop',(e)=>{
        
        console.log('drop and append dragdrop element',e.target.className);

        if(e.target.className == 'x') {item.style.backgroundColor ='red'; e.target.append(item) }
        if(e.target.className == 'y') {item.style.backgroundColor ='yellow'; e.target.append(item) }
        if(e.target.className == 'z') {item.style.backgroundColor ='green'; e.target.append(item) }
        
           
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




edits()

function edits(){
    

for (box of titles){
    box.addEventListener('click',(e)=>{
        console.log("clicked on drag");

        e.target.setAttribute("contenteditable", 'true');
        console.log(e.target);
        
        obj.title= e.target.innerText
        
    })
}

for (box of messeges){
    box.addEventListener('click',(e)=>{
        console.log("clicked on drag");

        e.target.setAttribute("contenteditable", 'true');
        console.log(e.target);
    

        obj.msg= e.target.innerText
        
    })
}


}


// add task
console.log(x[3].innerHTML == "");

addTask.addEventListener('click',(e)=>{

    for (box of x){
        if(box.innerHTML =="" ) {
            let elem=`<div class="drag" id="drag" draggable="true" >
            <h5> add title and </h5>
            <p> msg</p>
            <button id="del">Delete</button>
            <button class="saveCard">save</button>
          </div>`;

           console.log(box);
          
            box.innerHTML=elem
            console.log(box);
            dragdrop();
            console.log(titles);
            edits()
            savedatas()
            break;
        }
        
        else{
            
        }
    }
})

// push card data to arrey

savedatas()
function savedatas(){
for (box of saveCard){
box.addEventListener('click',(e)=>{
    console.log('savecard called');
    
    let omg=e.target.parentElement.childNodes
    
    if(omg[1].innerText=="") return
    
    let val= e.target.parentElement.parentElement.className;
    console.log(e.target.parentElement.childNodes[1].innerText);
    
    obj.title=e.target.parentElement.childNodes[1].innerText
    obj.msg=e.target.parentElement.childNodes[3].innerText
    
    // this local storga remove has no work

   if(val == 'x') { localStorage.removeItem('datax'); dataX.push(obj) ; localStorage.setItem('datax', JSON.stringify(dataX))}
   if(val == 'y') {  localStorage.removeItem('datay');dataY.push(obj) ; localStorage.setItem('datay', JSON.stringify(dataY))}
   if(val == 'z') {  localStorage.removeItem('dataz');dataZ.push(obj) ; localStorage.setItem('dataz', JSON.stringify(dataZ))}

   for (boxes of titles){
    boxes.setAttribute("contenteditable", "false");

}
for (boxes of messeges){
    boxes.setAttribute("contenteditable", "false");
}
    
})

}
}