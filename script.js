/* =========================================================
   LEARNHUB - E-LEARNING PLATFORM
   script.js
   ========================================================= */


/* ================= MOBILE NAVIGATION ================= */

function toggleMenu() {
    const navbar = document.querySelector(".navbar");

    if (navbar) {
        navbar.classList.toggle("mobile-active");
    }
}


/* Close mobile menu after clicking a link */

document.querySelectorAll(".navbar a").forEach(function (link) {

    link.addEventListener("click", function () {

        const navbar = document.querySelector(".navbar");

        if (navbar) {
            navbar.classList.remove("mobile-active");
        }

    });

});


/* ================= LOGIN MODAL ================= */

function openLogin() {

    const loginModal = document.getElementById("loginModal");

    if (loginModal) {
        loginModal.classList.add("active");
    }

    closeSignup();
}


function closeLogin() {

    const loginModal = document.getElementById("loginModal");

    if (loginModal) {
        loginModal.classList.remove("active");
    }

}


/* ================= SIGNUP MODAL ================= */

function openSignup() {

    const signupModal = document.getElementById("signupModal");

    if (signupModal) {
        signupModal.classList.add("active");
    }

    closeLogin();
}


function closeSignup() {

    const signupModal = document.getElementById("signupModal");

    if (signupModal) {
        signupModal.classList.remove("active");
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


/* ================= CLOSE MODAL ON OUTSIDE CLICK ================= */

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


/* ================= LOGIN ================= */

function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (email === "" || password === "") {

        alert("Please enter email and password.");

        return;
    }

    /*
        Demo login system.

        In a real project, authentication should be
        handled by a backend and database.
    */

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", email);

    alert("Login successful! Welcome to LearnHub.");

    closeLogin();

    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";

    updateLoginButton();
}


/* ================= SIGNUP ================= */

function signupUser(event) {

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

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("learnHubUser", JSON.stringify(user));

    alert(
        "Account created successfully!\n\n" +
        "Welcome to LearnHub, " + name + "!"
    );

    closeSignup();

    document.getElementById("signupName").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPassword").value = "";
    document.getElementById("confirmPassword").value = "";

    openLogin();
}


/* ================= LOGOUT ================= */

function logoutUser() {

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");

    alert("You have been logged out.");

    updateLoginButton();
}


/* ================= UPDATE LOGIN BUTTON ================= */

function updateLoginButton() {

    const buttons = document.querySelectorAll(".nav-buttons");

    const loggedIn = localStorage.getItem("loggedIn");

    buttons.forEach(function (container) {

        if (loggedIn === "true") {

            container.innerHTML = `
                <button class="btn btn-outline" onclick="logoutUser()">
                    Logout
                </button>

                <button class="btn btn-primary" onclick="showDashboard()">
                    Dashboard
                </button>
            `;

        } else {

            container.innerHTML = `
                <button class="btn btn-outline" onclick="openLogin()">
                    Login
                </button>

                <button class="btn btn-primary" onclick="openSignup()">
                    Sign Up
                </button>
            `;

        }

    });

}


/* ================= COURSE SEARCH ================= */

function searchCourses() {

    const input =
        document.getElementById("courseSearch");

    if (!input) {
        return;
    }

    const searchText =
        input.value.toLowerCase().trim();

    const courses =
        document.querySelectorAll(".course-card");

    let found = false;

    courses.forEach(function (course) {

        const courseText =
            course.textContent.toLowerCase();

        if (courseText.includes(searchText)) {

            course.classList.remove("hidden");

            found = true;

        } else {

            course.classList.add("hidden");

        }

    });

    let noResults =
        document.querySelector(".no-results");

    if (!noResults) {

        noResults =
            document.createElement("div");

        noResults.className = "no-results";

        noResults.textContent =
            "No courses found. Try another search.";

        const courseGrid =
            document.getElementById("courseGrid");

        if (courseGrid) {
            courseGrid.appendChild(noResults);
        }

    }

    if (searchText !== "" && !found) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


/* ================= COURSE ENROLLMENT ================= */

function enrollCourse(courseName) {

    const loggedIn =
        localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {

        const confirmLogin = confirm(
            "Please login before enrolling in a course.\n\n" +
            "Would you like to login now?"
        );

        if (confirmLogin) {
            openLogin();
        }

        return;
    }

    let enrolledCourses =
        JSON.parse(
            localStorage.getItem("enrolledCourses")
        ) || [];

    if (enrolledCourses.includes(courseName)) {

        alert(
            "You are already enrolled in " +
            courseName + "."
        );

        return;
    }

    enrolledCourses.push(courseName);

    localStorage.setItem(
        "enrolledCourses",
        JSON.stringify(enrolledCourses)
    );

    alert(
        "🎉 Enrollment Successful!\n\n" +
        "Course: " + courseName +
        "\n\nYou can start learning now."
    );

}


/* ================= SHOW ALL COURSES ================= */

function showAllCourses() {

    const courses =
        document.querySelectorAll(".course-card");

    courses.forEach(function (course) {
        course.classList.remove("hidden");
    });

    const noResults =
        document.querySelector(".no-results");

    if (noResults) {
        noResults.style.display = "none";
    }

    const search =
        document.getElementById("courseSearch");

    if (search) {
        search.value = "";
    }

    document.getElementById("courses").scrollIntoView({
        behavior: "smooth"
    });

}


/* ================= DEMO BUTTON ================= */

function showDemo() {

    alert(
        "🎓 Welcome to LearnHub!\n\n" +
        "This demo introduces you to our online learning platform.\n\n" +
        "Explore courses, enroll, track your progress and learn new skills."
    );

}


/* ================= CONTACT FORM ================= */

function submitContact(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {

        alert("Please fill all fields.");

        return;
    }

    /*
        Store contact messages locally for demonstration.
    */

    const contactMessage = {

        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleString()

    };

    let messages =
        JSON.parse(
            localStorage.getItem("contactMessages")
        ) || [];

    messages.push(contactMessage);

    localStorage.setItem(
        "contactMessages",
        JSON.stringify(messages)
    );

    alert(
        "Thank you, " + name + "!\n\n" +
        "Your message has been submitted successfully."
    );

    document.querySelector(".contact-form").reset();

}


/* ================= DASHBOARD ================= */

function showDashboard() {

    const user =
        JSON.parse(
            localStorage.getItem("learnHubUser")
        );

    const enrolledCourses =
        JSON.parse(
            localStorage.getItem("enrolledCourses")
        ) || [];

    if (!user) {

        alert("Please login first.");

        openLogin();

        return;
    }

    let courseList = "";

    if (enrolledCourses.length === 0) {

        courseList =
            "No courses enrolled yet.";

    } else {

        courseList =
            enrolledCourses
                .map(function (course, index) {
                    return (
                        (index + 1) +
                        ". " +
                        course
                    );
                })
                .join("\n");

    }

    alert(
        "👨‍🎓 STUDENT DASHBOARD\n\n" +
        "Name: " + user.name +
        "\nEmail: " + user.email +
        "\n\nMy Courses:\n" +
        courseList
    );

}


/* ================= NAVIGATION ACTIVE LINK ================= */

window.addEventListener("scroll", function () {

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".navbar a");

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 100;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });

    navLinks.forEach(function (link) {

        link.style.color = "";

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.style.color = "#2563eb";

        }

    });

});


/* ================= PAGE LOAD ================= */

document.addEventListener("DOMContentLoaded", function () {

    updateLoginButton();

    /*
        Add smooth behavior to internal links.
    */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

});


/* ================= KEYBOARD ESCAPE ================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeLogin();
        closeSignup();

    }

});
