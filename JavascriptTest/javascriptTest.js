

//Globally accessible variables
var loginEmail, loginPassword;
var currentAdmin;
var adminName, adminEmail, adminPassword, adminCity, adminState;
var userName, userEmail, userPassword, userDOB;



//BELOW FUNCTIONS WILL GET EXECUTED ON login.html

function login(){
    loginEmail = document.getElementById("txtEmailLogin").value;
    loginPassword = document.getElementById("txtPasswordLogin").value;

    if(isAdmin()){
       window.location.replace("dashboard.html");
    }
    else if(isValidUser()){
        window.sessionStorage.setItem("currentUser", loginEmail);
        window.sessionStorage.setItem("currentUserLoginTime", new Date());
        window.location.replace("subuser.html");
    }
    else{
        alert("Check your login credentials");
    }
}

function registerNow(){
   window.location.replace("registration.html");
}

function isValidUser(){
    users = JSON.parse(window.localStorage.getItem("Users"));
    for(i=0; i<users.length; i++){
        if(loginEmail == users[i].email && loginPassword == users[i].password){
            return true;
        }
    }
}


function isAdmin(){
    currentAdmin = JSON.parse(window.localStorage.getItem("currentAdmin"));
    currentAdminEmail = currentAdmin.email;
    currentAdminPassword = currentAdmin.password;

    if(loginEmail === currentAdminEmail && loginPassword === currentAdminPassword){
        return true;
    }
    else{
        return false;
    }
}




















//BELOW FUNCTIONS WILL GET EXECUTED ON registration.html
function validateName(){
    var fullName = document.getElementById("txtRegisterName");
    var letters = /^[A-Za-z ]+$/;
    if(fullName.value.match(letters)){
        return true;
    }
    else{
        alert("Please enter a valid name");
        document.getElementById("txtRegisterName").value = "";
        return false;
    }
}


function verifyPasswords(){
    var password = document.getElementById("txtRegisterPassword").value;
    var confirmPassword = document.getElementById("txtRegisterConfirmPassword").value;

    if(password != confirmPassword){
        alert("Password and Confirm Password should be same");
        document.getElementById("txtRegisterPassword").value = "";
        document.getElementById("txtRegisterConfirmPassword").value = "";
    }
}


function registerAdmin(){
    if(adminDetailsCheck()){
        if(document.getElementById("checkboxTerms").checked){
            if(JSON.parse(window.localStorage.getItem("currentAdmin"))==null){
                saveAdminToLocalStorage();
            }
            else{
                alert("Admin already registered");
            }
            window.location.replace("login.html");
        }
        else{
            alert("Please Agree to TERMS & CONDITIONS by ticking the checkbox");
        }
    }
    else{
        alert("All the fields are necessary to be filled");
    }
}


function adminDetailsCheck(){
    adminName = document.getElementById("txtRegisterName").value;
    adminEmail = document.getElementById("txtRegisterEmail").value;
    adminPassword = document.getElementById("txtRegisterPassword").value;
    adminCity = document.getElementById("selectCity").value;
    adminState = document.getElementById("selectState").value;

    if(adminName!="" && adminEmail!="" && adminPassword!="" && adminCity!="" && adminState!=""){
        return true;
    }
    else{
        return false;
    }
}

function saveAdminToLocalStorage(){
    Admin = function(name, email, password, city, state){
        this.name = name;
        this.email = email;
        this.password = password;
        this.city = city;
        this.state = state;
    }

    admin = new Admin(adminName, adminEmail, adminPassword, adminCity, adminState);
    window.localStorage.setItem("currentAdmin", JSON.stringify(admin));
}




















//BELOW FUNCTIONS WILL GET EXECUTED ON dashboard.html
function displayDashBoard(){
    window.location.replace("dashboard.html");
}

function displaySubUserDashBoard(){
    window.location.replace("dashboardSubUser.html");
}

function displayUsers(){
    window.location.replace("users.html");
}

function displayLoginSession(){
    window.location.replace("usersession.html")
}

function logoutAdmin(){
    window.location.replace("login.html");
}










//BELOW FUNCTIONS WILL GET EXECUTED ON users.html
function addUser(){
    userName = document.getElementById("newUserName").value;
    userEmail = document.getElementById("newUserEmail").value;
    userPassword = document.getElementById("newUserPassword").value;
    userDOB = document.getElementById("newUserDOB").value;

    totalUsers = window.sessionStorage.getItem("userCount");
    
    User = function(id, name, email, password, dob){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = parseInt(password);
        this.dob = new Date(dob);
        this.age = ~~((Date.now() - this.dob) / (31557600000)) + " years old";
    }

    user = new User(totalUsers, userName, userEmail, userPassword, userDOB);
    
    allUsers = JSON.parse(window.localStorage.getItem("Users"));
    allUsers.push(user);
    window.localStorage.setItem("Users", JSON.stringify(allUsers));
    window.location.reload();
}


var userId;
function editUserData(id){
    userId = parseInt(id);
    user = JSON.parse(window.localStorage.getItem("Users"));

    document.getElementById("update").style.display="block";
    document.getElementById("add").style.display="none";
    document.getElementById("newUserName").value = user[userId].name;
    document.getElementById("newUserEmail").value = user[userId].email;
    document.getElementById("newUserPassword").value = user[userId].password;
    document.getElementById("newUserDOB").value = user[userId].dob;
    
}

function updateUser(){
    alert(userId);
    user = JSON.parse(window.localStorage.getItem("Users"));
    user[userId].name = document.getElementById("newUserName").value;
    user[userId].email = document.getElementById("newUserEmail").value;
    user[userId].password = document.getElementById("newUserPassword").value;
    user[userId].dob = new Date(document.getElementById("newUserDOB").value);
    window.localStorage.setItem("Users", JSON.stringify(user));

    document.getElementById("newUserName").value = "";
    document.getElementById("newUserEmail").value = "";
    document.getElementById("newUserPassword").value = "";
    document.getElementById("newUserDOB").value = "";
    window.location.reload();
}

function deleteUserData(id){
    userId = parseInt(id);
    user = JSON.parse(window.localStorage.getItem("Users"));
    user.splice(id,1);
    window.localStorage.setItem("Users", JSON.stringify(user));
    window.location.reload();
}












//subuser.html
function logoutUser(){
    LoggedUsers = function(email, loggedInTime, loggedOutTime){
        this.email = email;
        this.loggedInTime = loggedInTime;
        this.loggedOutTime = loggedOutTime;
    };

    lu = new LoggedUsers(window.sessionStorage.getItem("currentUser"), window.sessionStorage.getItem("currentUserLoginTime"), new Date());
    loggedUsers = JSON.parse(window.localStorage.getItem("LoggedUsers"));
    loggedUsers.push(lu);
    window.localStorage.setItem("LoggedUsers", JSON.stringify(loggedUsers));
    window.location.replace("login.html");
}