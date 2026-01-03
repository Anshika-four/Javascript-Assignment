/*const signupForm = document.getElementById("signupform");
if(signupForm){
signupForm.addEventListener("submit", function(e){
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user={
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    const exists = users.some(u => u.email===user.email);

    if(exists){
        alert("User already exists");
        return ;
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully !");
    window.location.href="login.html";
})
}

const loginForm = document.getElementById("loginform");
if(loginForm){
loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;

    const user = users.find(
        u=>u.email===email && u.password===password
    )
    if(user){
        alert("Login Successfull");
        window.location.href="home.html";
         localStorage.setItem("currentUser", JSON.stringify(user));
    }
    else{
        alert("Invalid email or password");
    }
})
}
const userDetails = document.getElementById("userDetails");
if(userDetails){
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){
    alert("Please login first");
    window.location.href="login.html";
}
userDetails.innerText = 
`Name: ${currentUser.name} | Email : ${currentUser.email}`;

document.getElementById("LogoutBtn").addEventListener("click", ()=>{
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
})*/

/* ---------- SIGNUP ---------- */
const signupForm = document.getElementById("signupform");

if (signupForm) {
  signupForm.addEventListener("submit", function(e){
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    const exists = users.some(u => u.email === user.email);

    if (exists) {
      alert("User already exists");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    window.location.href = "login.html";
  });
}


/* ---------- LOGIN ---------- */
const loginForm = document.getElementById("loginform");

if (loginForm) {
  loginForm.addEventListener("submit", function(e){
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    // 🔹 save current user
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Login Successful");
    window.location.href = "home.html";
  });
}


/* ---------- HOME PAGE (Protected) ---------- */
const userDetails = document.getElementById("userDetails");

if (userDetails) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Please login first");
    window.location.href = "login.html";
  } else {
    userDetails.innerText =
      `Name: ${currentUser.name} | Email: ${currentUser.email}`;
  }

  const logoutBtn = document.getElementById("LogoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  }
}
