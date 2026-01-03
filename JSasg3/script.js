const Task = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask(){
    const task={
        title: document.getElementById("title").value,
        description : document.getElementById("desc").value,
        status: "pending"
    }
    Task.push(task);
    localStorage.setItem("tasks", JSON.stringify(Task));
    alert("Task added !")
    
}
const table=document.getElementById("view");

Task.forEach((ele, index)=> {
    const row=document.createElement("tr")
    const titleCell=document.createElement("td");
    titleCell.textContent = ele.title;
    row.appendChild(titleCell);

    const descCell = document.createElement("td");
    descCell.textContent=ele.description;
    row.appendChild(descCell);

    const completedCell = document.createElement("td");
    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";
    completedCheckbox.checked = ele.status === "completed";
    //completedCheckbox.className = "completed";
    completedCell.appendChild(completedCheckbox);
    row.appendChild(completedCell);

    const pendingCell=document.createElement("td");
    const pendingCheck = document.createElement("input")
    pendingCheck.type="checkbox";
    pendingCheck.checked = ele.status ==="pending";
    //pendingCheck.className="pending";
    pendingCell.appendChild(pendingCheck);
    row.appendChild(pendingCell);

    pendingCheck.addEventListener("change", () => {
        if (pendingCheck.checked) {
            completedCheckbox.checked = false;
            ele.status="pending";
        }
        localStorage.setItem("tasks", JSON.stringify(Task));
        location.reload();
    });

    completedCheckbox.addEventListener("change", () => {
        if (completedCheckbox.checked) {
            pendingCheck.checked = false;
            ele.status="completed"
        }
        localStorage.setItem("tasks", JSON.stringify(Task));
        location.reload();
    });
    const editCell = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
        localStorage.setItem("editIndex", index);
        window.location.href="edit.html";
    });
    editCell.appendChild(editBtn);
    row.append(editCell)

    const DeleteCell = document.createElement("td");
    const DeleteBtn = document.createElement("button");
    DeleteBtn.textContent="Delete";

    DeleteBtn.addEventListener("click", ()=>{
       Task.splice(index, 1);
       localStorage.setItem("tasks", JSON.stringify(Task));
       updateCounts();
       location.reload();
    })
    DeleteCell.appendChild(DeleteBtn);
    row.appendChild(DeleteCell)
    table.appendChild(row);
    updateCounts();
})

function updateCounts(){
    const Task = JSON.parse(localStorage.getItem("tasks")) || [];
    const total=Task.length;
    const completed = Task.filter(t=>t.status==="completed").length;
    const pending = total-completed;

    document.getElementById("totalCount").innerHTML=total;
    document.getElementById("pendingCount").textContent=pending;
    document.getElementById("completedCount").textContent=completed;

}


