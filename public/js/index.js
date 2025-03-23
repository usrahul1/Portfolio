const preloader = document.querySelector("[data-preloader]");
window.addEventListener("load", () => {
	preloader.classList.add("remove");
});

var typed = new Typed(".cont", {
	strings: ["UI/UX Designer", "Web Developer", "Freelancer", "Student"],
	typeSpeed: 150,
	backSpeed: 150,
	loop: true,
});

setInterval(() => {
	hr_obj = document.getElementsByClassName("hr")[0];
	min_obj = document.getElementsByClassName("min")[0];
	sec_obj = document.getElementsByClassName("sec")[0];

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

// let button = document.querySelector("#burger")[0]
// button.addEventListener('click', show)

function toggleMenu() {
	let navbarOpen = document.querySelector(".abt-asa");
	navbarOpen.classList.toggle("show");
}

function show() {
	let x = document.querySelector(".abt-asa");
	let y = document.querySelector(".abt");
	let icon = document.querySelector("#burger");
	let navs = document.querySelector("nav");

	x.classList.toggle("open");
	y.classList.toggle("open");

	if (icon.classList.contains("fa-bars")) {
		icon.classList.remove("fa-bars");
		icon.classList.add("fa-xmark");
	} else {
		icon.classList.remove("fa-xmark");
		icon.classList.add("fa-bars");
	}
}

const modal = document.querySelector(".popup");
const closeModal = document.querySelector(".closeModal");

document.querySelectorAll(".openModal").forEach((button) => {
	button.addEventListener("click", (event) => {
		if (modal) modal.style.display = "block";
	});
});

closeModal.addEventListener("click", () => {
	if (modal) modal.style.display = "none";
});
