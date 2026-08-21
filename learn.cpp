#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
using namespace std;

/*
    LearnHub - E-Learning Platform
    learn.cpp

    This program demonstrates basic backend/course
    management logic for the E-Learning Platform.
*/

struct Course {
    int id;
    string name;
    string category;
    string level;
    int lessons;
    int duration;
    double price;
};

struct Student {
    int id;
    string name;
    string email;
    vector<int> enrolledCourses;
};


/* ================= COURSE DATA ================= */

vector<Course> courses = {

    {1, "Complete HTML & CSS",
     "Web Development", "Beginner",
     25, 8, 0},

    {2, "Python Programming",
     "Programming", "Beginner",
     40, 15, 0},

    {3, "Java Programming",
     "Programming", "Intermediate",
     35, 14, 499},

    {4, "Database Management",
     "Database", "Intermediate",
     30, 12, 399},

    {5, "C++ Programming",
     "Programming", "Intermediate",
     32, 13, 399},

    {6, "JavaScript Masterclass",
     "Web Development", "Intermediate",
     38, 16, 599}
};


/* ================= DISPLAY COURSE ================= */

void displayCourse(const Course& course) {

    cout << "\n----------------------------------------\n";

    cout << "Course ID     : " << course.id << endl;
    cout << "Course Name   : " << course.name << endl;
    cout << "Category      : " << course.category << endl;
    cout << "Level         : " << course.level << endl;
    cout << "Lessons       : " << course.lessons << endl;
    cout << "Duration      : " << course.duration << " Hours" << endl;

    if (course.price == 0) {
        cout << "Price         : Free" << endl;
    } else {
        cout << "Price         : Rs. "
             << fixed << setprecision(2)
             << course.price << endl;
    }

    cout << "----------------------------------------\n";
}


/* ================= DISPLAY ALL COURSES ================= */

void displayAllCourses() {

    cout << "\n========================================\n";
    cout << "          AVAILABLE COURSES\n";
    cout << "========================================\n";

    for (const Course& course : courses) {
        displayCourse(course);
    }
}


/* ================= SEARCH COURSE ================= */

void searchCourse() {

    string keyword;

    cout << "\nEnter course name or category: ";
    cin.ignore();
    getline(cin, keyword);

    bool found = false;

    for (const Course& course : courses) {

        string courseName = course.name;
        string category = course.category;

        if (
            courseName.find(keyword) != string::npos ||
            category.find(keyword) != string::npos
        ) {

            displayCourse(course);
            found = true;
        }
    }

    if (!found) {
        cout << "\nNo course found.\n";
    }
}


/* ================= FIND COURSE ================= */

int findCourse(int courseId) {

    for (int i = 0; i < courses.size(); i++) {

        if (courses[i].id == courseId) {
            return i;
        }
    }

    return -1;
}


/* ================= ENROLL STUDENT ================= */

void enrollStudent(Student& student) {

    int courseId;

    cout << "\nEnter Course ID to enroll: ";
    cin >> courseId;

    int index = findCourse(courseId);

    if (index == -1) {

        cout << "\nInvalid Course ID.\n";
        return;
    }

    for (int id : student.enrolledCourses) {

        if (id == courseId) {

            cout << "\nYou are already enrolled in this course.\n";
            return;
        }
    }

    student.enrolledCourses.push_back(courseId);

    cout << "\n========================================\n";
    cout << "       ENROLLMENT SUCCESSFUL\n";
    cout << "========================================\n";

    cout << "Student : " << student.name << endl;
    cout << "Course  : " << courses[index].name << endl;

    if (courses[index].price == 0) {
        cout << "Payment : Free\n";
    } else {
        cout << "Amount  : Rs. "
             << courses[index].price << endl;
    }

    cout << "========================================\n";
}


/* ================= MY COURSES ================= */

void displayMyCourses(const Student& student) {

    cout << "\n========================================\n";
    cout << "             MY COURSES\n";
    cout << "========================================\n";

    if (student.enrolledCourses.empty()) {

        cout << "\nYou have not enrolled in any course yet.\n";
        return;
    }

    for (int courseId : student.enrolledCourses) {

        int index = findCourse(courseId);

        if (index != -1) {

            cout << "\nCourse ID : "
                 << courses[index].id << endl;

            cout << "Course    : "
                 << courses[index].name << endl;

            cout << "Category  : "
                 << courses[index].category << endl;

            cout << "Progress  : 0%\n";

            cout << "----------------------------------------\n";
        }
    }
}


/* ================= COURSE PROGRESS ================= */

void showProgress(const Student& student) {

    cout << "\n========================================\n";
    cout << "          LEARNING PROGRESS\n";
    cout << "========================================\n";

    if (student.enrolledCourses.empty()) {

        cout << "\nNo enrolled courses.\n";
        return;
    }

    int progress = 0;

    for (int courseId : student.enrolledCourses) {

        int index = findCourse(courseId);

        if (index != -1) {

            cout << "\n"
                 << courses[index].name
                 << " : ";

            cout << progress << "%";

            cout << "\n";
        }
    }

    cout << "\nComplete lessons to increase your progress.\n";
}


/* ================= STUDENT PROFILE ================= */

void displayProfile(const Student& student) {

    cout << "\n========================================\n";
    cout << "           STUDENT PROFILE\n";
    cout << "========================================\n";

    cout << "Student ID     : " << student.id << endl;
    cout << "Student Name   : " << student.name << endl;
    cout << "Email          : " << student.email << endl;

    cout << "Courses Taken  : "
         << student.enrolledCourses.size()
         << endl;

    cout << "========================================\n";
}


/* ================= MAIN MENU ================= */

void showMenu() {

    cout << "\n\n";
    cout << "========================================\n";
    cout << "             LEARNHUB\n";
    cout << "        E-LEARNING PLATFORM\n";
    cout << "========================================\n";

    cout << "1. View All Courses\n";
    cout << "2. Search Course\n";
    cout << "3. Enroll in Course\n";
    cout << "4. My Courses\n";
    cout << "5. Learning Progress\n";
    cout << "6. Student Profile\n";
    cout << "7. Exit\n";

    cout << "========================================\n";
    cout << "Enter your choice: ";
}


/* ================= MAIN FUNCTION ================= */

int main() {

    Student student;

    student.id = 1001;
    student.name = "Student";
    student.email = "student@example.com";

    int choice;

    cout << "\n";
    cout << "========================================\n";
    cout << "       WELCOME TO LEARNHUB\n";
    cout << "========================================\n";

    do {

        showMenu();

        cin >> choice;

        switch (choice) {

            case 1:

                displayAllCourses();

                break;


            case 2:

                searchCourse();

                break;


            case 3:

                displayAllCourses();

                enrollStudent(student);

                break;


            case 4:

                displayMyCourses(student);

                break;


            case 5:

                showProgress(student);

                break;


            case 6:

                displayProfile(student);

                break;


            case 7:

                cout << "\nThank you for using LearnHub!\n";
                cout << "Keep Learning. Keep Growing. 🚀\n";

                break;


            default:

                cout << "\nInvalid choice."
                     << " Please try again.\n";
        }

    } while (choice != 7);

    return 0;
}
