const card = document.getElementsByClassName("card");
const dragcard = document.getElementsByClassName("drag");
const save = document.getElementById("save");
const titles = document.getElementsByTagName("h5");
const messeges = document.getElementsByTagName("p");
const addTask = document.getElementById("addTask");

let item = {};
let edit = false;

refrsh();
function refrsh() {
  for (let i = 0; i < 8; i++) {
    let x = document.createElement("div");
    x.setAttribute("class", "x");
    card[0].append(x);
    let y = document.createElement("div");
    y.setAttribute("class", "y");
    card[1].append(y);
    let z = document.createElement("div");
    z.setAttribute("class", "z");
    card[2].append(z);
  }
}

const x = document.getElementsByClassName("x");
const y = document.getElementsByClassName("y");
const z = document.getElementsByClassName("z");

initilise();

function initilise() {
  for (let i = 0; i < x.length; i++) {
    x[i].innerHTML = "";
    y[i].innerHTML = "";
    z[i].innerHTML = "";
  }
  let arrdata = JSON.parse(localStorage.getItem("infos"));
  if (arrdata == null) arrdata = [];
  let l = 0;
  let m = 0;
  let n = 0;
  arrdata.forEach((e, i) => {
    let elem = `<div class="drag" draggable="true" id="${e.catag}">
        <h5>${e.title}</h5>
        <p> ${e.msg}</p>
        <button onclick="del(${i})" class="btn btn-light btn-sm"> Delete </button>
       
      </div>`;

    if (e.catag == "red") {
      x[l].innerHTML = elem;
      l++;
    }
    if (e.catag == "yellow") {
      y[m].innerHTML = elem;
      m++;
    }
    if (e.catag == "green") {
      z[n].innerHTML = elem;
      n++;
    }
  });
}

dragdrop();

function dragdrop() {
  for (box of dragcard) {
    box.addEventListener("dragstart", (e) => {
      setTimeout(() => {
        e.target.classList.add("hide");

        item = e.target;
        console.log(item);
      }, 0);
    });
    box.addEventListener("dragend", (e) => {
      e.target.className = "drag";
    });
  }

  for (box of card) {
    box.addEventListener("drop", (e) => {
      console.log("drop and append dragdrop element", e.target.className);

      if (e.target.className == "x") {
        item.id = "red";
        e.target.append(item);
      }
      if (e.target.className == "y") {
        item.id = "yellow";
        e.target.append(item);
      }
      if (e.target.className == "z") {
        item.id = "green";
        e.target.append(item);
      }
    });
    box.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
  }
}

edits();

function edits() {
  for (box of titles) {
    box.addEventListener("click", (e) => {
      e.target.setAttribute("contenteditable", "true");

      alldata();
    });
  }

  for (box of messeges) {
    box.addEventListener("click", (e) => {
      e.target.setAttribute("contenteditable", "true");

      alldata();
    });
  }
}

// add task
console.log(x[3].innerHTML == "");

addTask.addEventListener("click", (e) => {
  for (let i = 0; i < x.length; i++) {
    if (x[i].innerHTML == "") {
      let elem = `<div class="drag" id="red" draggable="true" >
            <h5> Add title </h5>
            <p> add messege</p>
            <button onclick="del(${i})" class="btn btn-light btn-sm">Delete</button>
           
          </div>`;

      x[i].innerHTML = elem;

      dragdrop();
      edits();
      break;
    } else {
    }
  }
});

// push card data to arrey

save.addEventListener("click", () => {
  alldata();
});

function alldata() {
  let arrdata = [];
  for (let i = 0; i < titles.length; i++) {
    let obj1 = {
      title: titles[i].innerText,
      msg: messeges[i].innerText,
      catag: titles[i].parentElement.id,
    };

    arrdata.push(obj1);
  }
  localStorage.setItem("infos", JSON.stringify(arrdata));
}

function del(i) {
  let arrdata = JSON.parse(localStorage.getItem("infos"));

  arrdata.splice(i, 1);

  localStorage.clear();
  localStorage.setItem("infos", JSON.stringify(arrdata));
  initilise();
}
