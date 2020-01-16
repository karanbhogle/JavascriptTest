var countUser = 0;

if(window.sessionStorage.getItem("Users") == null){
    allUsers = [];
    countUser = 0;
    window.sessionStorage.setItem("Users", JSON.stringify(allUsers));
}

function saveData(){
    var name, mathsMarks, englishMarks, avgMarks, yearOfPassing;
    var tableData;
    

    name = document.getElementById("txtName").value;
    mathsMarks = document.getElementById("txtMathsMarks").value;
    englishMarks = document.getElementById("txtEnglishMarks").value;
    yearOfPassing = document.getElementById("numYOP").value;  
    
    if(name !="" && mathsMarks !="" && englishMarks !="" && yearOfPassing !=""){
        
        User = function(id, name, mathsMarks, englishMarks, yearOfPassing){
            this.id = id;
            this.name = name;
            this.mathsMarks = mathsMarks;
            this.englishMarks = englishMarks;
            this.yearOfPassing = yearOfPassing;
            this.averageMarks = (this.mathsMarks+this.englishMarks)/2;
            this.dateCreated = new Date().toLocaleDateString();

        }

        user = new User(countUser, name, parseInt(mathsMarks), parseInt(englishMarks), yearOfPassing);
        countUser = parseInt(countUser)+1;
        countUser = window.sessionStorage.setItem("userCount", countUser);
        countUser = window.sessionStorage.getItem("userCount");
        allUsers = JSON.parse(sessionStorage.getItem("Users"));
        allUsers.push(user);
        window.sessionStorage.setItem("Users", JSON.stringify(allUsers));
    }
    else{
        alert("All the fields are necessary");
        return false;
    }
    window.location.reload();
}

display();
function display(){
    allUsersToDisplay = JSON.parse(window.sessionStorage.getItem("Users"));

    for(i=0; i<allUsersToDisplay.length; i++){
        var table = document.getElementById("userTable");
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = allUsersToDisplay[i].name;
        cell2.innerHTML =  allUsersToDisplay[i].mathsMarks;
        cell3.innerHTML =  allUsersToDisplay[i].englishMarks;
        cell4.innerHTML =  allUsersToDisplay[i].averageMarks;
        cell5.innerHTML =  allUsersToDisplay[i].yearOfPassing;
        cell6.innerHTML =  allUsersToDisplay[i].dateCreated;
    }
}