document.querySelector("#zipCode").addEventListener("input", displayCity);
document.querySelector("#password").addEventListener("click", displayPassword);
document.querySelector("#username").addEventListener("input", errorName);
document.querySelector("#state").addEventListener ("change", displayCounty);
document.querySelector("#submitBtn").addEventListener("click", isFormValid);
displayAllStates();


async function displayCity(){
    let zipCode = document.querySelector("#zipCode").value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip="+zipCode;

    let response = await fetch(url);
    let data = await response.json()
   if(!data.city){
        document.querySelector("#city").textContent = "No zip available";
        document.querySelector("#city").style.color = "red";
        document.querySelector("#latitude").textContent = "";
        document.querySelector("#longitude").textContent = "";
   }else{
        document.querySelector("#city").textContent = data.city;
        document.querySelector("#city").style.color = "green";
        document.querySelector("#latitude").textContent = data.latitude;
        document.querySelector("#longitude").textContent = data.longitude;
        document.querySelector("#state").value = data.state;
        displayCounty();
   }
}

async function displayAllStates(){

    let url = " https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    let stateSelect = document.querySelector("#state");
    stateSelect.innerHTML = "";

    for (let i of data) {

        let optionEl = document.createElement("option");
        optionEl.textContent = i.state;
        optionEl.value =  i.usps;

        stateSelect.append(optionEl);

    }

}
async function displayCounty() {
    let state = document.querySelector("#state").value;
    let url = "https://csumb.space/api/countyListAPI.php?state="+state;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    let countySelect = document.querySelector("#county");
    countySelect.innerHTML = ""; 

    for (let i of data) {
        let optionEl = document.createElement("option");
        optionEl.textContent = i.county;
        optionEl.value = i.county; 
        countySelect.append(optionEl);
    }
}
async function displayPassword(){
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    let response = await fetch(url);
    let data = await response.json();
    let password = data.password;
    console.log(data);
    document.querySelector("#passwordSug").textContent = `suggested; ${password}`;

}
async function errorName(){
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    
    if (!data.available){
    document.querySelector("#errorName").textContent = `Not Available`;
    document.querySelector("#errorName").style.color = "red";
    }
    else{
    document.querySelector("#errorName").textContent = `Available`;
    document.querySelector("#errorName").style.color = "green";
    }
}


function isFormValid(){
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let isValid = true;
    let feedback = document.querySelector("#validationFdbk");

    if(username.length < 3){
        document.querySelector("#validationFdbk").innerHTML = "Username must be at least 3 characters.";
        document.querySelector("#validationFdbk").style.color = "blue";
        isValid = false;
    }
    else if(password.length < 6){
        document.querySelector("#validationFdbk").innerHTML = "Password must be at least 6 characters.";
        document.querySelector("#validationFdbk").style.color = "orange";
        isValid = false;
    }
    else if(document.querySelector("#password").value !== document.querySelector("#passwordCheck").value){
        document.querySelector("#validationFdbk").innerHTML = "Passwords do not match.";
        document.querySelector("#validationFdbk").style.color = "violet";
        isValid = false;
    }else{
        if(isValid){
            document.querySelector("#validationFdbk").innerHTML="Sign up successful!"
            document.querySelector("#validationFdbk").style.color="green";
        }

    }

}