const loadBtn = document.getElementById("loadUsersBtn")
const errorMsg = document.getElementById("errorMsg");
const outputBox = document.getElementById("userList");
const searchInput = document.getElementById("search");


let allUsers=[];

loadBtn.addEventListener("click", loadUsers);
searchInput.addEventListener("input", filterUsers);

async function loadUsers(){
    errorMsg.textContent="";
    outputBox.textContent="Loading...";
    searchInput.style.display = "none";
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        allUsers = await response.json();
        renderUsers(allUsers);

        searchInput.style.display = "block"; // 🔹 show after data loads
        searchInput.value = "";  
    }
    catch(error){
        outputBox.textContent="";
        errorMsg.textContent = "Error: Failed to load users.";
        console.error( error);
    }
}
function renderUsers(users){
    const output = users.map(user => `
            Name : ${user.name}
            Email : ${user.email}
            City : ${user.address.city}
            ----------------------------------`).join('\n')
        
        outputBox.textContent = output;
}
function filterUsers() {
    const text = searchInput.value.toLowerCase();

    const filtered = allUsers.filter(user =>
      user.name.toLowerCase().includes(text) ||
      user.email.toLowerCase().includes(text) ||
      user.address.city.toLowerCase().includes(text)
    );

    renderUsers(filtered);
}
