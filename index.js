var typed = new Typed(".cont",{
    strings:["UI/UX Designer","Web Developer","Freelancer","Student"],
    typeSpeed: 150,
    backSpeed: 150,
    loop: true
})

setInterval(() => {
    hr_obj = document.getElementsByClassName("hr")[0]
    min_obj = document.getElementsByClassName("min")[0]
    sec_obj = document.getElementsByClassName("sec")[0]


    d = new Date(); //object of date()
    hr = d.getHours();
    min = d.getMinutes();
    sec = d.getSeconds();
    hr_rotation = 30 * hr + min / 2; //converting current time
    min_rotation = 6 * min;
    sec_rotation = 6 * sec;
 
    hr_obj.style.transform = `rotate(${hr_rotation}deg)`;
    min_obj.style.transform = `rotate(${min_rotation}deg)`;
    sec_obj.style.transform = `rotate(${sec_rotation}deg)`;
}, 1000);

function show(){
    let x = document.getElementsByClassName("abt")[0];
    let y = document.getElementsByClassName("hsdiv")[0];

    if (x.style.height === "0rem") {
        x.style.height = "10rem";
    } else {
        x.style.height = "0rem";
    }

}
