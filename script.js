/* =====================================================
   LEARNHUB - E-LEARNING PLATFORM
   script.js
   ===================================================== */


/* ================= PAGE LOAD ================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("LearnHub E-Learning Platform Loaded");

    loadUserData();
    updateNavigation();

});


/* ================= SMOOTH SCROLL ================= */

function scrollToCourses() {

    const courses = document.getElementById("courses");

    if (courses) {
        courses.scrollIntoView({
            behavior: "smooth"
        });
    }

}


/* ================= LOGIN MODAL ================= */

function openLogin() {

    const loginModal = document.getElementById("loginModal");

    if (loginModal) {
        loginModal.style.display = "flex";
    }

}


function closeLogin() {

    const loginModal = document.getElementById("loginModal");

    if (loginModal) {
        loginModal.style.display = "none";
    }

}


/* ================= SIGNUP MODAL ================= */

function openSignup() {

    const signupModal = document.getElementById("signupModal");

    if (signupModal) {
        signupModal.style.display = "flex";
    }

}


function closeSignup() {

    const signupModal = document.getElementById("signupModal");

    if (signupModal) {
        signupModal.style.display = "none";
    }

}


/* ================= SWITCH LOGIN / SIGNUP ================= */

function switchToSignup() {

    closeLogin();
    openSignup();

}


function switchToLogin() {

    closeSignup();
    openLogin();

}


/* ================= CLOSE MODAL ================= */

window.addEventListener("click", function (event) {

    const loginModal = document.getElementById("loginModal");
    const signupModal = document.getElementById("signupModal");

    if (event.target === loginModal) {
        closeLogin();
    }

    if (event.target === signupModal) {
        closeSignup();
    }

});


/* ================= SIGN UP ================= */

function registerUser(event) {

    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (name === "" || email === "" || password === "") {

        alert("Please fill all required fields.");

        return;
    }


    if (password.length < 6) {

        alert("Password must contain at least 6 characters.");

        return;
    }


    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    const existingUser =
        JSON.parse(localStorage.getItem("learnHubUser"));


    if (existingUser && existingUser.email === email) {

        alert("An account with this email already exists.");

        return;
    }


    const user = {

        name: name,
        email: email,
        password: password,
        enrolledCourses: []

    };


    localStorage.setItem(
        "learnHubUser",
        JSON.stringify(user)
    );


    alert(
        "Account created successfully! You can now login."
    );


    document.getElementById("signupName").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPassword").value = "";
    document.getElementById("confirmPassword").value = "";


    closeSignup();

    openLogin();

}


/* ================= LOGIN ================= */

function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    const user =
        JSON.parse(localStorage.getItem("learnHubUser"));


    if (!user) {

        alert(
            "No account found. Please create an account first."
        );

        return;
    }


    if (email === user.email && password === user.password) {

        localStorage.setItem(
            "learnHubLoggedIn",
            "true"
        );


        localStorage.setItem(
            "learnHubCurrentUser",
            JSON.stringify(user)
        );


        alert(
            "Login successful! Welcome to LearnHub, " +
            user.name + "."
        );


        document.getElementById("loginEmail").value = "";
        document.getElementById("loginPassword").value = "";


        closeLogin();

        updateNavigation();

    }

    else {

        alert(
            "Invalid email or password."
        );

    }

}


/* ================= LOAD USER ================= */

function loadUserData() {

    const user =
        JSON.parse(localStorage.getItem("learnHubUser"));


    if (!user) {

        console.log("No registered user found.");

        return;
    }


    console.log(
        "User loaded:",
        user.name
    );

}


/* ================= NAVIGATION UPDATE ================= */

function updateNavigation() {

    const loggedIn =
        localStorage.getItem("learnHubLoggedIn");

    const navButtons =
        document.querySelector(".nav-buttons");


    if (!navButtons) {
        return;
    }


    if (loggedIn === "true") {

        const user =
            JSON.parse(
                localStorage.getItem("learnHubCurrentUser")
            );


        navButtons.innerHTML = `

            <span style="
                display:flex;
                align-items:center;
                padding:10px;
                color:#2563eb;
                font-weight:600;
            ">
                👤 ${user ? user.name : "Student"}
            </span>

            <button
                class="signup-btn"
                onclick="logoutUser()">
                Logout
            </button>

        `;

    }

}


/* ================= LOGOUT ================= */

function logoutUser() {

    localStorage.removeItem("learnHubLoggedIn");
    localStorage.removeItem("learnHubCurrentUser");


    alert(
        "You have been logged out successfully."
    );


    location.reload();

}


/* ================= COURSE SEARCH ================= */

function searchCourses() {

    const searchInput =
        document.getElementById("courseSearch");


    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    const courses =
        document.querySelectorAll(".course-card");


    let foundCourses = 0;


    courses.forEach(function (course) {

        const courseText =
            course.innerText.toLowerCase();


        const courseData =
            course.getAttribute("data-course");


        if (
            courseText.includes(searchValue) ||
            (courseData &&
             courseData.toLowerCase().includes(searchValue))
        ) {

            course.style.display = "block";

            foundCourses++;

        }

        else {

            course.style.display = "none";

        }

    });


    let noResults =
        document.querySelector(".no-results");


    if (foundCourses === 0) {

        if (!noResults) {

            noResults =
                document.createElement("div");

            noResults.className =
                "no-results";

            noResults.innerHTML =
                "😔 No courses found. Try another search.";

            document
                .getElementById("courseContainer")
                .appendChild(noResults);

        }

    }

    else {

        if (noResults) {

            noResults.remove();

        }

    }

}


/* ================= SHOW ALL COURSES ================= */

function showAllCourses() {

    const courses =
        document.querySelectorAll(".course-card");


    courses.forEach(function (course) {

        course.style.display = "block";

    });


    const noResults =
        document.querySelector(".no-results");


    if (noResults) {

        noResults.remove();

    }


    const searchInput =
        document.getElementById("courseSearch");


    if (searchInput) {

        searchInput.value = "";

    }

}


/* ================= COURSE ENROLLMENT ================= */

function enrollCourse(courseName) {

    const loggedIn =
        localStorage.getItem("learnHubLoggedIn");


    if (loggedIn !== "true") {

        alert(
            "Please login or create an account before enrolling."
        );


        openLogin();

        return;
    }


    const user =
        JSON.parse(
            localStorage.getItem("learnHubCurrentUser")
        );


    if (!user) {

        alert(
            "User information could not be found."
        );

        return;
    }


    if (!user.enrolledCourses) {

        user.enrolledCourses = [];

    }


    if (user.enrolledCourses.includes(courseName)) {

        alert(
            "You are already enrolled in " +
            courseName + "."
        );

        return;
    }


    user.enrolledCourses.push(courseName);


    localStorage.setItem(
        "learnHubCurrentUser",
        JSON.stringify(user)
    );


    localStorage.setItem(
        "learnHubUser",
        JSON.stringify(user)
    );


    alert(
        "🎉 Successfully enrolled in " +
        courseName + "!"
    );

}


/* ================= CONTACT FORM ================= */

function submitContact(event) {

    event.preventDefault();


    const name =
        document.getElementById("contactName").value.trim();

    const email =
        document.getElementById("contactEmail").value.trim();

    const message =
        document.getElementById("contactMessage").value.trim();


    if (
        name === "" ||
        email === "" ||
        message === ""
    ) {

        alert(
            "Please fill all contact form fields."
        );

        return;
    }


    alert(
        "Thank you, " +
        name +
        "! Your message has been submitted successfully."
    );


    document.getElementById("contactForm").reset();

}


/* ================= EMAIL VALIDATION ================= */

function validateEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return pattern.test(email);

}


/* ================= PASSWORD VISIBILITY ================= */

function togglePassword(inputId) {

    const input =
        document.getElementById(inputId);


    if (!input) {
        return;
    }


    if (input.type === "password") {

        input.type = "text";

    }

    else {

        input.type = "password";

    }

}


/* ================= WELCOME MESSAGE ================= */

function showWelcomeMessage() {

    const loggedIn =
        localStorage.getItem("learnHubLoggedIn");


    if (loggedIn !== "true") {
        return;
    }


    const user =
        JSON.parse(
            localStorage.getItem("learnHubCurrentUser")
        );


    if (user) {

        console.log(
            "Welcome back, " + user.name + "!"
        );

    }

}


/* ================= KEYBOARD SHORTCUT ================= */

document.addEventListener("keydown", function (event) {

    /*
       Press "/" to focus the course search box.
    */

    if (
        event.key === "/" &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
    ) {

        event.preventDefault();

        const search =
            document.getElementById("courseSearch");


        if (search) {

            search.focus();

        }

    }


    /*
       Press Escape to close modals.
    */

    if (event.key === "Escape") {

        closeLogin();
        closeSignup();

    }

});


/* ================= INITIALIZATION ================= */

showWelcomeMessage();

console.log(
    "LearnHub JavaScript initialized successfully."
);
