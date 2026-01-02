const Employees = JSON.parse(localStorage.getItem('employees')) || [];

//Add Employee Functionality 

function add_emp(event){
    event.preventDefault();

    const employee = {
        Name : document.getElementById("name").value,
        ID : Number(document.getElementById("ID").value),
        Date : document.getElementById("Date").value,
        Salary : Number(document.getElementById("salary").value)
    }

    Employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(Employees));
    alert("Employee Added Successfully !");
    event.target.reset();
}

//View Employee Functionality

const table = document.getElementById("empTable");
Employees.forEach((emp, index) => {
    const row = `
    <tr>
        <td>${emp.Name}</td>
        <td>${emp.ID}</td>
        <td>${emp.Date}</td>
        <td>${emp.Salary}</td>
        <td><button onclick="editEmployee(${index})">Edit</button></td>
    </tr>`;
    table.innerHTML+=row;
});

function editEmployee(index){
    localStorage.setItem("editIndex", index);
    window.location.href="edit.html";
}
function edit_emp(event){
    event.preventDefault();
    const editIndex = Number(localStorage.getItem("editIndex"));
    //const Employees = JSON.parse(localStorage.getItem("employees")) || [];
    const emp = Employees[editIndex];

    emp.Name = document.getElementById("new_name").value;
    emp.ID = Number(document.getElementById("new_ID").value);
    emp.Date = document.getElementById("new_Date").value;
    emp.Salary = Number(document.getElementById("new_salary").value);

    Employees[editIndex] = emp;
    localStorage.setItem("employees", JSON.stringify(Employees));
    localStorage.removeItem("editIndex");
    alert("Employee Updated Successfully!");
    window.location.href = "view.html";
}