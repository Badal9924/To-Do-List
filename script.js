const screen = document.querySelector(".screen");
const addbtn = document.querySelector(".add");
const clearAllbtn = document.querySelector(".clear");
const maincontent = document.querySelector(".maincontent");
const saveChangebtn = document.querySelector(".saveChange");
const filtersTab = document.querySelectorAll(".filters");
let work = JSON.parse(localStorage.getItem('todoList')) || [];


 // Function for showing the List :)
 function showList(filt){
    let workDone="";
        work.forEach((element,id) => {
        let isCompleted = element.status=="completed"?"checked":"";
        let workToBedone = (element.bgcolor)?"checkedbox" : "";

        if (filt==element.status || filt == "all" ) {
            workDone += `
            <div class="content">
            <input type="checkbox" id=${id} onClick = "updateCheck(this)"${isCompleted}><span class="work ${workToBedone}">${element.workName}</span>
            <ul class="more_icon">
                <li>
                    <i class="fa fa-ellipsis-h" aria-hidden="true"onclick="showsubmenu(this)"></i>
                    <div class="sub_menu">
                        <p class="edit"onClick='editTask(${id},"${element.workName}")'><i class="fa fa-trash" aria-hidden="true"></i> : Edit</p>
                        <hr>
                        <p class="delete" onClick="deleteTask(${id})"><i class="fa fa-pencil" aria-hidden="true"></i> : Delete</p>
                    </div>
                </li>
            </ul>
        </div>
    <hr>`
}
        });
        maincontent.innerHTML = workDone || `<span class = "warning">You have no any task in this section</span>`;
}
showList("all");


// Adding to the local storage :)
    addbtn.addEventListener('click',()=>{
        if (screen.value == '') {
            alert("Please enter your task ");
        }else{ 
         let workInformatiion = {workName:screen.value,status:"pending",bgcolor:false};
         work.push(workInformatiion);
         localStorage.setItem('todoList',JSON.stringify(work))
         screen.value = "";
         showList("all"); // Calling the showing function :)
        }
    })


    function updateCheck(targetedcheckbox){
        if (targetedcheckbox.checked) {
            targetedcheckbox.nextElementSibling.classList.add("checkedbox");
            work[targetedcheckbox.id].status = "completed";
            work[targetedcheckbox.id].bgcolor = true;
        }else{
            targetedcheckbox.nextElementSibling.classList.remove("checkedbox");
            work[targetedcheckbox.id].status = "pending";
            work[targetedcheckbox.id].bgcolor = false;
        }
        localStorage.setItem('todoList',JSON.stringify(work));
    }

   
   
function showsubmenu(elem){
    elem.nextElementSibling.classList.toggle("show");
    document.addEventListener('click',(e)=>{
        if (e.target.tagName !='I' || e.target != elem) {
            elem.nextElementSibling.classList.remove("show");
        }
    })
}

function deleteTask(deleteId){
    work.splice(deleteId,1);   
    localStorage.setItem('todoList',JSON.stringify(work));
    showList("all");
}

function editTask(id,task){
    addbtn.style.display = "none";
    saveChangebtn.style.display = "inline-block";
    screen.value = task;
    saveChangebtn.addEventListener('click',()=>{
        work[id].workName = screen.value;
        localStorage.setItem('todoList',JSON.stringify(work));
        addbtn.style.display = "inline-block";
        saveChangebtn.style.display = "none";
        showList("all");
        screen.value = "";
    })
}

clearAllbtn.addEventListener('click',()=>{
    work.splice(0,work.length)
    localStorage.setItem('todoList',JSON.stringify(work));
    showList("all");
    localStorage.removeItem('todoList');
})

filtersTab.forEach((tabs)=>{
    tabs.addEventListener('click',()=>{
        document.querySelector(".filters.active").classList.remove("active");
        tabs.classList.add("active");
        showList(tabs.id);
    })
})