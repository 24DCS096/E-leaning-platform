#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
using namespace std;

/* =====================================================
   LEARNHUB - E-LEARNING PLATFORM
   learn.cpp
   ===================================================== */

struct Course {
    int id;
    string name;
    string category;
    int lessons;
    double rating;
};

struct Student {
    string name;
    string email;
    vector<int> enrolledCourses;
};

vector<Course> courses = {
    {1, "Full Stack Web Development", "Web Development", 25, 4.8},
    {2, "Python Programming", "Programming", 30, 4.9},
    {3, "Data Science Fundamentals", "Data Science", 28, 4.7},
    {4, "Database Management", "Database", 24, 4.8},
    {5, "Cyber Security Basics", "Cybersecurity", 22, 4.6},
    {6, "Artificial Intelligence", "AI & ML", 32, 4.9}
};


/* ================= DISPLAY COURSES ================= */

void displayCourses() {

    cout << "\n============================================================\n";
    cout << "                    AVAILABLE COURSES\n";
    cout << "============================================================\n";

    cout << left
         << setw(5) << "ID"
         << setw(32) << "Course"
         << setw(20) << "Category"
         << setw(10) << "Lessons"
         << setw(10) << "Rating"
         << endl;

    cout << "------------------------------------------------------------\n";

    for (const Course &course : courses) {

        cout << left
             << setw(5) << course.id
             << setw(32) << course.name
             << setw(20) << course.category
             << setw(10) << course.lessons
             << setw(10) << course.rating
             << endl;
    }

    cout << "============================================================\n";
}


/* ================= FIND COURSE ================= */

Course* findCourse(int courseId) {

    for (auto &course : courses) {

        if (course.id == courseId) {
            return &course;
        }
    }

    return nullptr;
}


/* ================= ENROLL COURSE ================= */

void enrollCourse(Student &student) {

    displayCourses();

    int courseId;

    cout << "\nEnter Course ID to enroll: ";
    cin >> courseId;

    Course* course = findCourse(courseId);

    if (course == nullptr) {

        cout << "\nInvalid Course ID.\n";
        return;
    }


    for (int id : student.enrolledCourses) {

        if (id == courseId) {

            cout << "\nYou are already enrolled in "
                 << course->name << ".\n";

            return;
        }
    }


    student.enrolledCourses.push_back(courseId);

    cout << "\nSuccessfully enrolled in: "
         << course->name << endl;
}


/* ================= MY COURSES ================= */

void displayMyCourses(const Student &student) {

    cout << "\n============================================================\n";
    cout << "                       MY COURSES\n";
    cout << "============================================================\n";

    if (student.enrolledCourses.empty()) {

        cout << "You have not enrolled in any courses yet.\n";
        return;
    }


    for (int courseId : student.enrolledCourses) {

        Course* course = findCourse(courseId);

        if (course != nullptr) {

            cout << "\nCourse ID : " << course->id;
            cout << "\nCourse    : " << course->name;
            cout << "\nCategory  : " << course->category;
            cout << "\nLessons   : " << course->lessons;
            cout << "\nRating    : " << course->rating;
            cout << "\nProgress  : 0%";
            cout << "\n-----------------------------\n";
        }
    }
}


/* ================= QUIZ ================= */

void startQuiz() {

    int score = 0;
    char answer;

    cout << "\n============================================================\n";
    cout << "                     LEARNHUB QUIZ\n";
    cout << "============================================================\n";


    cout << "\n1. Which language is mainly used to structure web pages?";
    cout << "\nA. HTML";
    cout << "\nB. C++";
    cout << "\nC. Python";
    cout << "\nD. SQL";
    cout << "\nAnswer: ";

    cin >> answer;

    if (answer == 'A' || answer == 'a') {
        score++;
    }


    cout << "\n2. Which language is commonly used for database queries?";
    cout << "\nA. HTML";
    cout << "\nB. SQL";
    cout << "\nC. CSS";
    cout << "\nD. JavaScript";
    cout << "\nAnswer: ";

    cin >> answer;

    if (answer == 'B' || answer == 'b') {
        score++;
    }


    cout << "\n3. What does AI stand for?";
    cout << "\nA. Automated Internet";
    cout << "\nB. Artificial Intelligence";
    cout << "\nC. Advanced Interface";
    cout << "\nD. Application Integration";
    cout << "\nAnswer: ";

    cin >> answer;

    if (answer == 'B' || answer == 'b') {
        score++;
    }


    cout << "\n4. Which language is represented by the Python logo?";
    cout << "\nA. Python";
    cout << "\nB. Java";
    cout << "\nC. C";
    cout << "\nD. PHP";
    cout << "\nAnswer: ";

    cin >> answer;

    if (answer == 'A' || answer == 'a') {
        score++;
    }


    cout << "\n5. CSS is mainly used for:";
    cout << "\nA. Database management";
    cout << "\nB. Web page styling";
    cout << "\nC. Operating systems";
    cout << "\nD. Data storage";
    cout << "\nAnswer: ";

    cin >> answer;

    if (answer == 'B' || answer == 'b') {
        score++;
    }


    cout << "\n============================================================\n";

    cout << "Quiz Completed!\n";
    cout << "Your Score: " << score << " / 5\n";


    if (score == 5) {

        cout << "Excellent! Outstanding performance.\n";

    }
    else if (score >= 3) {

        cout << "Good job! Keep learning.\n";

    }
    else {

        cout << "Keep practicing and try again.\n";

    }

    cout << "============================================================\n";
}


/* ================= STUDENT PROFILE ================= */

void displayProfile(const Student &student) {

    cout << "\n============================================================\n";
    cout << "                    STUDENT PROFILE\n";
    cout << "============================================================\n";

    cout << "\nName  : " << student.name;
    cout << "\nEmail : " << student.email;
    cout << "\nCourses Enrolled : "
         << student.enrolledCourses.size();

    cout << "\n============================================================\n";
}


/* ================= MAIN MENU ================= */

void showMenu(Student &student) {

    int choice;

    do {

        cout << "\n\n============================================================\n";
        cout << "                 LEARNHUB E-LEARNING\n";
        cout << "============================================================\n";

        cout << "\n1. View All Courses";
        cout << "\n2. Enroll in Course";
        cout << "\n3. My Courses";
        cout << "\n4. Start Quiz";
        cout << "\n5. Student Profile";
        cout << "\n6. Exit";

        cout << "\n\nEnter your choice: ";
        cin >> choice;


        switch (choice) {

            case 1:
                displayCourses();
                break;

            case 2:
                enrollCourse(student);
                break;

            case 3:
                displayMyCourses(student);
                break;

            case 4:
                startQuiz();
                break;

            case 5:
                displayProfile(student);
                break;

            case 6:
                cout << "\nThank you for using LearnHub!\n";
                break;

            default:
                cout << "\nInvalid choice. Please try again.\n";
        }

    } while (choice != 6);
}


/* ================= MAIN FUNCTION ================= */

int main() {

    Student student;

    cout << "============================================================\n";
    cout << "             WELCOME TO LEARNHUB\n";
    cout << "             E-LEARNING PLATFORM\n";
    cout << "============================================================\n";


    cout << "\nEnter Student Name: ";
    getline(cin, student.name);


    cout << "Enter Student Email: ";
    getline(cin, student.email);


    cout << "\nRegistration successful!\n";

    showMenu(student);

    return 0;
}
