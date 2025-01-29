document.addEventListener("DOMContentLoaded", () => {

// const preloader = document.querySelector("[data-preloader]")
// window.addEventListener("load", () => {
//     preloader.classList.add("remove");
// });

// var typed = new Typed(".cont",{
//     strings:["UI/UX Designer","Web Developer","Freelancer","Student"],
//     typeSpeed: 150,
//     backSpeed: 150,
//     loop: true
// })

// setInterval(() => {
//     hr_obj = document.getElementsByClassName("hr")[0]
//     min_obj = document.getElementsByClassName("min")[0]
//     sec_obj = document.getElementsByClassName("sec")[0]


//     d = new Date(); //object of date()
//     hr = d.getHours();
//     min = d.getMinutes();
//     sec = d.getSeconds();
//     hr_rotation = 30 * hr + min / 2; //converting current time
//     min_rotation = 6 * min;
//     sec_rotation = 6 * sec;
 
//     hr_obj.style.transform = `rotate(${hr_rotation}deg)`;
//     min_obj.style.transform = `rotate(${min_rotation}deg)`;
//     sec_obj.style.transform = `rotate(${sec_rotation}deg)`;
// }, 1000);

// // let button = document.querySelector("#burger")[0]
// // button.addEventListener('click', show)

// function show(){
//     let x = document.querySelector(".abt-asa")
//     let y = document.querySelector(".abt")
//     let icon = document.querySelector("#burger")
//     let navs = document.querySelector("nav")

//     x.classList.toggle("open")
//     y.classList.toggle("open")
    
//     if (icon.classList.contains('fa-bars')) {
//         icon.classList.remove('fa-bars');
//         icon.classList.add('fa-xmark');
//     } else {
//         icon.classList.remove('fa-xmark');
//         icon.classList.add('fa-bars');
//     }

// }

const modal = document.querySelector(".popup");
const closeModal = document.querySelector(".closeModal");

// Open modal on button click
document.querySelectorAll(".openModal").forEach((button) => {
    button.addEventListener("click", (event) => {
        const type = button.dataset.type; // Get the data-type from clicked element
        // console.log(type);
        
        modal.setAttribute("data-type", type);
        // modal.dataset.type="sad"
        console.log(modal.getAttribute("data-type"))
        
        // console.log(modal.getAttribute("data-type")); // Output: "warning"
        modal.showModal(); // Open the modal
    });
});

// Close modal when clicking the close button
if(closeModal) {
closeModal.addEventListener("click", () => {
    modal.close();
});

}

// Dynamically update modal content based on the type
function updateModalContent(type) {
    const modalContent = document.querySelector(".popup form");
    
    // Clear existing content
    modalContent.innerHTML = '';

    // Add dynamic content based on type (you might need to load the content from the server via an API)
    if (type === 'title') {
        modalContent.innerHTML = '<%- include("./popupPartials/titles.ejs") %>'; // This won't work in JS, it needs to be handled server-side
    } else if (type === 'project') {
        modalContent.innerHTML = '<%- include("./popupPartials/project.ejs") %>'; // Same issue as above
    } else {
        modalContent.innerHTML = '<h1 style="color: black;">Unknown Type</h1>';
    }
}

})