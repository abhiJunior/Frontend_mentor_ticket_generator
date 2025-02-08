
const dropArea = document.getElementsByClassName("droparea")[0];
const inputfied = document.getElementById("upload");
const imageview = document.getElementsByClassName("avatar")[0];
const uploadAlert = document.getElementsByClassName("uploadalert")[0];
inputfied.addEventListener("change",uploadImage)


function uploadImage(){
    
    let file = inputfied.files[0];
    if (file){
        let imgLink = URL.createObjectURL(file);
        if (file.size > 512000){
            uploadAlert.innerText = "File too large. Please upload a photo under 500KB."
        uploadAlert.style.color = "red";
        }

        else{
            imageview.style.backgroundImage = `url(${imgLink})`;
            imageview.textContent = "";
            uploadAlert.innerText = "Upload your photo (JPG or PNG, max size: 500KB).";
            uploadAlert.style.color = "grey";
        }
        
        
    }
    
    
}

dropArea.addEventListener("dragover",function(e){
    e.preventDefault();
});

dropArea.addEventListener("drop",function(e){
    e.preventDefault();
    inputfied.files = e.dataTransfer.files;
    uploadImage();
});

function seterror(elementName,error){
    let element = document.querySelector(`.classerror.${elementName}`)
    element.innerText = error;


}

function validateForm(){
    
    let returnval = true;
    let fullName = document.forms["myForm"]["fullname"].value;
    
    if (fullName.length < 5){
        seterror("fullName","Length of name is too short");
        returnval = false;
    }

    let email = document.forms["myForm"]["email"].value;
    
    if (email.length > 30){
        seterror("email","Enter a valid email");
        returnval = false;
    }

    let github = document.forms["myForm"]["github"].value;
    if (github.length < 3){
        seterror("github","Enter a valid GitHub username");
        returnval = false;
    }

    let avatar = document.forms["myForm"]["avatar"].files[0];
    if (!avatar) {
        seterror("avatar", "Please upload your avatar");
        returnval = false;
    }

    const reader = new FileReader();
    reader.onload = function(event){
        const avatarDataUrl = event.target.result;
        const ticketHtml = `
            <div class="ticket-container">
                <img class="container-cod" src="./assets/images/logo-full.svg" alt="">
                <h1 class="ticket-h1">${fullName} !</h1>
                <h2 class="ticket-h2" style="font-size:40px;word-spacing: 5px;color:white;">Your ticket is ready.</h2>
                <p class="ticket-p" style="margin-top: 30px;">We've emailed your ticket to</p>
                <p class="ticket-p"><span style="color:#eb2721;">${email}</span> and will send updates in</p>
                <p class="ticket-p">the run up to the event.</p>
                <div class="image-wrapper">
                    <img src="./ticket_image/pattern-ticket.svg" alt="image">
                    <div class="image-text">
                        <p class="ticket-logo" style="font-size:larger;word-spacing: 5px;color: white;"></p>
                        <p style="font-weight: lighter; color: #ccc; font-size:x-small;word-spacing: 5px;margin-top:0px;margin-left:35px">Jan 31, 2025 / Austin, TX</p>
                    </div>
                    <div class="image-avatar">
                        <img src="${avatarDataUrl}" alt="image">
                    </div>
                    <div class="image-name">
                        <span>${fullName}</span>
                        <p class="ticket-github"><i class="fa-brands fa-github"></i>  ${github}</p>
                    </div>
                </div>
            


            </div>




    </div>
        `;
        document.body.innerHTML = ticketHtml;
        
        
    };
    reader.readAsDataURL(avatar);
    return false


    
    
    
    
}