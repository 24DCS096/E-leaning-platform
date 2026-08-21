/* =====================================================
   LEARNHUB - E-LEARNING PLATFORM
   script.js
   ===================================================== */

/* ================= DEFAULT DATA ================= */

const courses = [
    {
        name: "Full Stack Web Development",
        category: "Web Development",
        progress: 75
    },
    {
        name: "Python Programming",
        category: "Programming",
        progress: 50
    },
    {
        name: "Data Science Fundamentals",
        category: "Data Science",
        progress: 30
    }
];

let enrolledCourses = [];
let currentUser = null;


/* ================= PAGE LOAD ================= */

document.addEventListener("DOMContentLoaded", function () {

    loadUser();

    updateDashboard();

    setupKeyboardEvents();

});


/* ================= SIDEBAR ================= */

function toggleSidebar() {

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
}


function closeSidebar() {

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    sidebar.classList.remove("open");
    overlay.classList.remove("active");
}


/* ================= SECTION NAVIGATION ================= */

function showSection(sectionId, element) {

    const sections =
        document.querySelectorAll(".content-section");

    sections.forEach(section => {
        section.classList.remove("active-section");
    });


    const selectedSection =
        document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active-section");
    }


    const menuItems =
        document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {
        item.classList.remove("active");
    });


    if (element) {
        element.classList.add("active");
    }


    closeSidebar();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showSectionById(sectionId) {

    const section =
        document.getElementById(sectionId);

    if (!section) {
        return;
    }


    document.querySelectorAll(".content-section")
        .forEach(item => {
            item.classList.remove("active-section");
        });


    section.classList.add("active-section");


    document.querySelectorAll(".menu-item")
        .forEach(item => {
            item.classList.remove("active");

            const href =
                item.getAttribute("href");

            if (href === "#" + sectionId) {
                item.classList.add("active");
            }
        });


    closeSidebar();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= USER REGISTRATION ================= */

function registerUser(event) {

    event.preventDefault();


    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    if (password.length < 6) {

        alert("Password must contain at least 6 characters.");

        return;
    }


    const user = {
        name: name,
        email: email,
        password: password
    };


    localStorage.setItem(
        "learnhubUser",
        JSON.stringify(user)
    );


    currentUser = user;


    enrolledCourses = [];

    localStorage.setItem(
        "learnhubEnrollments",
        JSON.stringify(enrolledCourses)
    );


    updateUserInterface();

    closeSignup();


    alert(
        "Account created successfully! Welcome to LearnHub."
    );


    document.getElementById("signupName").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPassword").value = "";
    document.getElementById("confirmPassword").value = "";
}


/* ================= LOGIN ================= */

function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    const storedUser =
        JSON.parse(localStorage.getItem("learnhubUser"));


    if (!storedUser) {

        alert(
            "No account found. Please create an account first."
        );

        return;
    }


    if (
        email !== storedUser.email ||
        password !== storedUser.password
    ) {

        alert(
            "Invalid email or password."
        );

        return;
    }


    currentUser = storedUser;

    localStorage.setItem(
        "learnhubLoggedIn",
        "true"
    );


    loadEnrollments();

    updateUserInterface();

    closeLogin();


    alert(
        "Login successful. Welcome back!"
    );


    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
}


/* ================= LOAD USER ================= */

function loadUser() {

    const storedUser =
        localStorage.getItem("learnhubUser");

    const loggedIn =
        localStorage.getItem("learnhubLoggedIn");


    if (storedUser && loggedIn === "true") {

        currentUser =
            JSON.parse(storedUser);

    } else {

        currentUser = null;
    }


    loadEnrollments();

    updateUserInterface();
}


/* ================= LOAD ENROLLMENTS ================= */

function loadEnrollments() {

    const saved =
        localStorage.getItem("learnhubEnrollments");


    if (saved) {

        enrolledCourses =
            JSON.parse(saved);

    } else {

        enrolledCourses = [];
    }
}


/* ================= SAVE ENROLLMENTS ================= */

function saveEnrollments() {

    localStorage.setItem(
        "learnhubEnrollments",
        JSON.stringify(enrolledCourses)
    );
}


/* ================= UPDATE USER INTERFACE ================= */

function updateUserInterface() {

    const defaultName = "Student";

    const userName =
        currentUser
            ? currentUser.name
            : defaultName;


    const userEmail =
        currentUser
            ? currentUser.email
            : "student@example.com";


    const welcomeName =
        document.getElementById("welcomeUserName");

    const headerName =
        document.getElementById("headerUserName");

    const sidebarName =
        document.getElementById("sidebarUserName");

    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");


    if (welcomeName) {
        welcomeName.textContent = userName;
    }


    if (headerName) {
        headerName.textContent = userName;
    }


    if (sidebarName) {
        sidebarName.textContent = userName;
    }


    if (profileName) {
        profileName.textContent = userName;
    }


    if (profileEmail) {
        profileEmail.textContent = userEmail;
    }


    updateDashboard();
}


/* ================= LOGOUT ================= */

function logoutUser() {

    const confirmLogout =
        confirm("Are you sure you want to logout?");


    if (!confirmLogout) {
        return;
    }


    localStorage.removeItem("learnhubLoggedIn");

    currentUser = null;

    updateUserInterface();


    alert(
        "You have been logged out successfully."
    );


    showSectionById("dashboard");
}


/* ================= ENROLL COURSE ================= */

function enrollCourse(courseName) {

    const alreadyEnrolled =
        enrolledCourses.some(
            course => course.name === courseName
        );


    if (alreadyEnrolled) {

        alert(
            "You are already enrolled in " +
            courseName + "."
        );

        return;
    }


    const courseData =
        courses.find(
            course => course.name === courseName
        );


    if (!courseData) {

        alert("Course not found.");

        return;
    }


    const newCourse = {
        name: courseData.name,
        category: courseData.category,
        progress: 0
    };


    enrolledCourses.push(newCourse);

    saveEnrollments();

    updateDashboard();


    alert(
        "Successfully enrolled in " +
        courseName + "!"
    );


    showSectionById("courses");
}


/* ================= CONTINUE COURSE ================= */

function continueCourse(courseName) {

    alert(
        "Opening " +
        courseName +
        "...\n\nCourse lessons will be available here."
    );
}


/* ================= UPDATE DASHBOARD ================= */

function updateDashboard() {

    const totalCourses =
        document.getElementById("totalCourses");

    const enrolledCount =
        document.getElementById("enrolledCourses");

    const overallProgress =
        document.getElementById("overallProgress");

    const completedCourses =
        document.getElementById("completedCourses");


    if (totalCourses) {

        totalCourses.textContent =
            courses.length;
    }


    if (enrolledCount) {

        enrolledCount.textContent =
            enrolledCourses.length;
    }


    let averageProgress = 0;


    if (enrolledCourses.length > 0) {

        const totalProgress =
            enrolledCourses.reduce(
                (sum, course) =>
                    sum + Number(course.progress || 0),
                0
            );


        averageProgress =
            Math.round(
                totalProgress / enrolledCourses.length
            );
    }


    if (overallProgress) {

        overallProgress.textContent =
            averageProgress + "%";
    }


    const completed =
        enrolledCourses.filter(
            course => Number(course.progress) >= 100
        ).length;


    if (completedCourses) {

        completedCourses.textContent =
            completed;
    }


    updateMyCourses();
}


/* ================= MY COURSES ================= */

function updateMyCourses() {

    const container =
        document.getElementById("myCoursesGrid");


    if (!container) {
        return;
    }


    if (enrolledCourses.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                <h3>📚 No courses enrolled yet</h3>
                <p>
                    Explore our courses and start learning today.
                </p>
                <br>
                <button
                    onclick="showSectionById('explore')"
                    style="
                        background:#2563eb;
                        color:white;
                        padding:10px 18px;
                        border-radius:7px;
                    ">
                    Explore Courses
                </button>
            </div>
        `;

        return;
    }


    container.innerHTML = "";


    enrolledCourses.forEach(course => {

        const progress =
            Number(course.progress || 0);


        let icon = "📚";
        let className = "web";


        if (course.category === "Programming") {

            icon = "🐍";
            className = "python";

        } else if (course.category === "Data Science") {

            icon = "📊";
            className = "data";

        } else if (course.category === "Database") {

            icon = "🗄️";
            className = "database";

        } else if (course.category === "Cybersecurity") {

            icon = "🔐";
            className = "security";

        } else if (course.category === "AI & ML") {

            icon = "🤖";
            className = "ai";
        }


        const card = document.createElement("article");

        card.className = "learning-card";


        card.innerHTML = `

            <div class="course-image ${className}">
                ${icon}
            </div>

            <div class="course-body">

                <span class="course-category">
                    ${course.category}
                </span>

                <h3>
                    ${course.name}
                </h3>

                <div class="progress-info">

                    <span>Progress</span>

                    <strong>
                        ${progress}%
                    </strong>

                </div>

                <div class="progress-bar">

                    <div style="width:${progress}%"></div>

                </div>

                <button
                    onclick="continueCourse('${course.name}')">
                    ${progress >= 100
                        ? "Completed"
                        : "Continue"}
                </button>

            </div>
        `;


        container.appendChild(card);
    });
}


/* ================= SEARCH DASHBOARD COURSES ================= */

function searchDashboardCourses() {

    const searchInput =
        document.getElementById("globalSearch");


    if (!searchInput) {
        return;
    }


    const value =
        searchInput.value.toLowerCase().trim();


    const cards =
        document.querySelectorAll(
            "#dashboardCourseGrid .learning-card"
        );


    cards.forEach(card => {

        const course =
            card.dataset.course || "";


        if (course.includes(value)) {

            card.style.display = "";

        } else {

            card.style.display = "none";
        }
    });
}


/* ================= FILTER EXPLORE COURSES ================= */

function filterCourses() {

    const input =
        document.getElementById("courseSearch");


    if (!input) {
        return;
    }


    const value =
        input.value.toLowerCase().trim();


    const cards =
        document.querySelectorAll(
            "#allCoursesGrid .learning-card"
        );


    let visibleCards = 0;


    cards.forEach(card => {

        const searchText =
            card.dataset.search || "";


        if (searchText.includes(value)) {

            card.style.display = "";

            visibleCards++;

        } else {

            card.style.display = "none";
        }
    });


    let noResults =
        document.getElementById("courseNoResults");


    if (visibleCards === 0) {

        if (!noResults) {

            noResults =
                document.createElement("div");

            noResults.id =
                "courseNoResults";

            noResults.className =
                "no-results";

            noResults.innerHTML = `
                <h3>🔍 No courses found</h3>
                <p>
                    Try searching for another course.
                </p>
            `;

            document
                .getElementById("allCoursesGrid")
                .appendChild(noResults);
        }

    } else {

        if (noResults) {
            noResults.remove();
        }
    }
}


/* ================= QUIZ ================= */

function startQuiz(category) {

    const questions = {

        "Web Development": [
            {
                question:
                    "Which language is used to structure web pages?",
                answer: "HTML"
            },
            {
                question:
                    "Which language is used for web page styling?",
                answer: "CSS"
            },
            {
                question:
                    "Which language adds interactivity to websites?",
                answer: "JavaScript"
            }
        ],

        "Python": [
            {
                question:
                    "Which keyword is used to define a function in Python?",
                answer: "def"
            },
            {
                question:
                    "Which symbol is used for comments in Python?",
                answer: "#"
            },
            {
                question:
                    "What type of language is Python?",
                answer: "Programming"
            }
        ],

        "Database": [
            {
                question:
                    "Which language is commonly used for databases?",
                answer: "SQL"
            },
            {
                question:
                    "What does SQL stand for?",
                answer:
                    "Structured Query Language"
            },
            {
                question:
                    "Which command is used to retrieve data?",
                answer: "SELECT"
            }
        ]

    };


    const quiz =
        questions[category];


    if (!quiz) {

        alert(
            category +
            " quiz will be available soon."
        );

        return;
    }


    let score = 0;


    for (let i = 0; i < quiz.length; i++) {

        const userAnswer =
            prompt(
                `Question ${i + 1} of ${quiz.length}\n\n` +
                quiz[i].question
            );


        if (
            userAnswer &&
            userAnswer.trim().toLowerCase() ===
            quiz[i].answer.toLowerCase()
        ) {

            score++;
        }
    }


    const percentage =
        Math.round(
            (score / quiz.length) * 100
        );


    alert(
        `Quiz Completed!\n\n` +
        `Course: ${category}\n` +
        `Score: ${score}/${quiz.length}\n` +
        `Percentage: ${percentage}%`
    );
}


/* ================= PROFILE ================= */

function editProfile() {

    if (!currentUser) {

        alert(
            "Please create an account or login first."
        );

        return;
    }


    const newName =
        prompt(
            "Enter your new name:",
            currentUser.name
        );


    if (!newName || !newName.trim()) {
        return;
    }


    currentUser.name =
        newName.trim();


    localStorage.setItem(
        "learnhubUser",
        JSON.stringify(currentUser)
    );


    updateUserInterface();


    alert(
        "Profile updated successfully."
    );
}


/* ================= NOTIFICATIONS ================= */

function showNotifications() {

    const modal =
        document.getElementById(
            "notificationModal"
        );


    if (modal) {

        modal.style.display = "flex";
    }
}


function closeNotifications() {

    const modal =
        document.getElementById(
            "notificationModal"
        );


    if (modal) {

        modal.style.display = "none";
    }
}


/* ================= LOGIN MODAL ================= */

function openLogin() {

    const modal =
        document.getElementById("loginModal");


    if (modal) {

        modal.style.display = "flex";
    }
}


function closeLogin() {

    const modal =
        document.getElementById("loginModal");


    if (modal) {

        modal.style.display = "none";
    }
}


/* ================= SIGNUP MODAL ================= */

function openSignup() {

    const modal =
        document.getElementById("signupModal");


    if (modal) {

        modal.style.display = "flex";
    }
}


function closeSignup() {

    const modal =
        document.getElementById("signupModal");


    if (modal) {

        modal.style.display = "none";
    }
}


/* ================= SWITCH AUTH MODALS ================= */

function switchToSignup() {

    closeLogin();

    openSignup();
}


function switchToLogin() {

    closeSignup();

    openLogin();
}


/* ================= PRIVACY ================= */

function showPrivacyMessage() {

    alert(
        "Privacy settings:\n\n" +
        "Your account information is stored locally " +
        "in your browser for this demo project."
    );
}


/* ================= KEYBOARD EVENTS ================= */

function setupKeyboardEvents() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.k
