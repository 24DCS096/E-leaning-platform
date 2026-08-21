/*
=========================================================
        LEARNHUB - E-LEARNING PLATFORM
        learn.cpp
=========================================================
*/

#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
#include <algorithm>

using namespace std;


/* =====================================================
   COURSE STRUCTURE
   ===================================================== */

struct Course
{
    int id;
    string name;
    string category;
    int lessons;
    float rating;
};


/* =====================================================
   ENROLLED COURSE STRUCTURE
   ===================================================== */

struct EnrolledCourse
{
    int courseId;
    int progress;
};


/* =====================================================
   STUDENT STRUCTURE
   ===================================================== */

struct Student
{
    string name;
    string email;
    vector<EnrolledCourse> enrolledCourses;
};


/* =====================================================
   COURSE DATA
   ===================================================== */

vector<Course> courses =
{
    {1, "Full Stack Web Development", "Web Development", 25, 4.8},
    {2, "Python Programming", "Programming", 30, 4.9},
    {3, "Data Science Fundamentals", "Data Science", 28, 4.7},
    {4, "Database Management", "Database", 24, 4.8},
    {5, "Cyber Security Basics", "Cybersecurity", 22, 4.6},
    {6, "Artificial Intelligence", "AI & ML", 32, 4.9}
};


/* =====================================================
   DISPLAY HEADER
   ===================================================== */

void displayHeader(string title)
{
    cout << "\n";
    cout << "============================================================\n";
    cout << "                     LEARNHUB\n";
    cout << "                E-LEARNING PLATFORM\n";
    cout << "============================================================\n";
    cout << "                      " << title << "\n";
    cout << "============================================================\n";
}


/* =====================================================
   DISPLAY ALL COURSES
   ===================================================== */

void displayCourses()
{
    displayHeader("AVAILABLE COURSES");

    cout << left
         << setw(5)  << "ID"
         << setw(32) << "Course"
         << setw(20) << "Category"
         << setw(10) << "Lessons"
         << setw(10) << "Rating"
         << endl;

    cout << "------------------------------------------------------------\n";

    for (const Course &course : courses)
    {
        cout << left
             << setw(5)  << course.id
             << setw(32) << course.name
             << setw(20) << course.category
             << setw(10) << course.lessons
             << setw(10) << course.rating
             << endl;
    }

    cout << "------------------------------------------------------------\n";
}


/* =====================================================
   FIND COURSE
   ===================================================== */

Course* findCourse(int id)
{
    for (auto &course : courses)
    {
        if (course.id == id)
        {
            return &course;
        }
    }

    return nullptr;
}


/* =====================================================
   CHECK ENROLLMENT
   ===================================================== */

bool isEnrolled(const Student &student, int courseId)
{
    for (const EnrolledCourse &course :
         student.enrolledCourses)
    {
        if (course.courseId == courseId)
        {
            return true;
        }
    }

    return false;
}


/* =====================================================
   ENROLL COURSE
   ===================================================== */

void enrollCourse(Student &student)
{
    displayCourses();

    int courseId;

    cout << "\nEnter Course ID: ";
    cin >> courseId;

    Course *course = findCourse(courseId);

    if (course == nullptr)
    {
        cout << "\nInvalid Course ID.\n";
        return;
    }

    if (isEnrolled(student, courseId))
    {
        cout << "\nYou are already enrolled in "
             << course->name << ".\n";
        return;
    }

    EnrolledCourse newCourse;

    newCourse.courseId = courseId;
    newCourse.progress = 0;

    student.enrolledCourses.push_back(newCourse);

    cout << "\nSuccessfully enrolled!\n";
    cout << "Course: " << course->name << endl;
}


/* =====================================================
   DISPLAY MY COURSES
   ===================================================== */

void displayMyCourses(const Student &student)
{
    displayHeader("MY COURSES");

    if (student.enrolledCourses.empty())
    {
        cout << "\nYou have not enrolled in any courses.\n";
        return;
    }

    for (const EnrolledCourse &enrolled :
         student.enrolledCourses)
    {
        Course *course =
            findCourse(enrolled.courseId);

        if (course != nullptr)
        {
            cout << "\nCourse ID : "
                 << course->id;

            cout << "\nCourse    : "
                 << course->name;

            cout << "\nCategory  : "
                 << course->category;

            cout << "\nLessons   : "
                 << course->lessons;

            cout << "\nRating    : "
                 << course->rating;

            cout << "\nProgress  : "
                 << enrolled.progress << "%";

            cout << "\n--------------------------------------------------\n";
        }
    }
}


/* =====================================================
   UPDATE COURSE PROGRESS
   ===================================================== */

void updateProgress(Student &student)
{
    if (student.enrolledCourses.empty())
    {
        cout << "\nYou have not enrolled in any course.\n";
        return;
    }

    displayMyCourses(student);

    int courseId;
    int progress;

    cout << "\nEnter Course ID: ";
    cin >> courseId;

    cout << "Enter Progress (0-100): ";
    cin >> progress;

    if (progress < 0 || progress > 100)
    {
        cout << "\nProgress must be between 0 and 100.\n";
        return;
    }

    for (EnrolledCourse &course :
         student.enrolledCourses)
    {
        if (course.courseId == courseId)
        {
            course.progress = progress;

            cout << "\nProgress updated successfully!\n";

            if (progress == 100)
            {
                cout << "Congratulations! Course completed.\n";
            }

            return;
        }
    }

    cout << "\nYou are not enrolled in this course.\n";
}


/* =====================================================
   DISPLAY PROGRESS
   ===================================================== */

void displayProgress(const Student &student)
{
    displayHeader("MY PROGRESS");

    if (student.enrolledCourses.empty())
    {
        cout << "\nNo course progress available.\n";
        return;
    }

    int totalProgress = 0;

    for (const EnrolledCourse &enrolled :
         student.enrolledCourses)
    {
        Course *course =
            findCourse(enrolled.courseId);

        if (course != nullptr)
        {
            cout << "\n"
                 << course->name
                 << " : "
                 << enrolled.progress
                 << "%";

            totalProgress += enrolled.progress;

            cout << "\n";

            cout << "[";

            int bars = enrolled.progress / 10;

            for (int i = 0; i < 10; i++)
            {
                if (i < bars)
                    cout << "#";
                else
                    cout << "-";
            }

            cout << "]\n";
        }
    }

    int average =
        totalProgress /
        student.enrolledCourses.size();

    cout << "\n------------------------------------------------------------\n";

    cout << "Overall Progress: "
         << average
         << "%\n";
}


/* =====================================================
   WEB DEVELOPMENT QUIZ
   ===================================================== */

void webDevelopmentQuiz()
{
    displayHeader("WEB DEVELOPMENT QUIZ");

    int score = 0;
    char answer;

    cout << "\n1. Which language is used to create the structure "
            "of a web page?\n";

    cout << "A. HTML\n";
    cout << "B. CSS\n";
    cout << "C. SQL\n";
    cout << "D. C++\n";

    cout << "Answer: ";
    cin >> answer;

    if (answer == 'A' || answer == 'a')
        score++;


    cout << "\n2. Which language is used to style a webpage?\n";

    cout << "A. HTML\n";
    cout << "B. CSS\n";
    cout << "C. SQL\n";
    cout << "D. Python\n";

    cout << "Answer: ";
    cin >> answer;

    if (answer == 'B' || answer == 'b')
        score++;


    cout << "\n3. Which language provides interactivity "
            "to websites?\n";

    cout << "A. HTML\n";
    cout << "B. CSS\n";
    cout << "C. JavaScript\n";
    cout << "D. SQL\n";

    cout << "Answer: ";
    cin >> answer;

    if (answer == 'C' || answer == 'c')
        score++;


    cout << "\n4. What does HTML stand for?\n";

    cout << "A. Hyper Text Markup Language\n";
    cout << "B. High Text Machine Language\n";
    cout << "C. Hyperlink Text Management Language\n";
    cout << "D. Home Tool Markup Language\n";

    cout << "Answer: ";
    cin >> answer;

    if (answer == 'A' || answer == 'a')
        score++;


    cout << "\n5. Which technology is used for responsive "
            "web design?\n";

    cout << "A. CSS\n";
    cout << "B. SQL\n";
    cout << "C. C++\n";
    cout << "D. MySQL\n";

    cout << "Answer: ";
    cin >> answer;

    if (answer == 'A' || answer == 'a')
        score++;


    cout << "\n============================================================\n";

    cout << "Quiz Completed!\n";
    cout << "Score: " << score << " / 5\n";

    float percentage =
        (score / 5.0f) * 100;

    cout << "Percentage: "
         << percentage
         << "%\n";

    if (percentage == 100)
    {
        cout << "Excellent! Outstanding performance!\n";
    }
    else if (percentage >= 60)
    {
        cout << "Good job! Keep learning.\n";
    }
    else
    {
        cout << "Keep practicing and try again.\n";
    }
}


/* =====================================================
   PYTHON QUIZ
   ===================================================== */

void pythonQuiz()
{
    displayHeader("PYTHON QUIZ");

    int score = 0;
    char answer;

    cout << "\n1. Which keyword is used to define a function?\n";
    cout << "A. function\n";
    cout << "B. def\n";
    cout << "C. fun\n";
    cout << "D. define\n";

    cout << "Answer: ";
    cin >> answer;

    if (answer == 'B' || answer == 'b')
        score++;


    cout << "\n2. Which symbol is used for comments?\n";
    cout << "A. //\n";
    cout << "B. /* */\n";
    cout << "C. #\n";
    cout << "D. <!-- -->\n";

    cout << "Answer: ";
    cin >> answer;

    if (answer == 'C' || answer == 'c')
        score++;


    cout << "\n3. Python is a ______ language.\n";
    cout << "A. Programming\n";
    cout << "B. Markup\n";
    cout << "C. Query\n";
    cout << "D. Styling\n";

    cout << "Answer: ";
    cin >> answer;

    if (answer == 'A' || answer == 'a')
        score++;


    cout << "\n4. Which file extension is used for Python?\n";
    cout << "A. .cpp\n";
    cout << "B. .html\n";
    cout << "C. .py\n";
    cout << "D. .css\n";

    cout << "Answer: ";
    cin >> answer;

    if (answer == 'C' || answer == 'c')
        score++;


    cout << "\n5. Which function displays output in Python?\n";
    cout << "A. display()\n";
    cout << "B. print()\n";
    cout << "C. output()\n";
    cout << "D. show()\n";

    cout << "Answer: ";
    cin >> answer;

    if (answer == 'B' || answer == 'b')
        score++;


    cout << "\n============================================================\n";

    cout << "Quiz Completed!\n";
    cout << "Score: " << score << " / 5\n";

    float percentage =
        (score / 5.0f) * 100;

    cout << "Percentage: "
         << percentage
         << "%\n";
}


/* =====================================================
   QUIZ MENU
   ===================================================== */

void quizMenu()
{
    int choice;

    do
    {
        displayHeader("QUIZZES");

        cout << "\n1. Web Development Quiz";
        cout << "\n2. Python Quiz";
        cout << "\n3. Back";

        cout << "\n\nEnter choice: ";
        cin >> choice;

        switch (choice)
        {
            case 1:
                webDevelopmentQuiz();
                break;

            case 2:
                pythonQuiz();
                break;

            case 3:
                break;

            default:
                cout << "\nInvalid choice.\n";
        }

    } while (choice != 3);
}


/* =====================================================
   CERTIFICATE
   ===================================================== */

void displayCertificates(const Student &student)
{
    displayHeader("CERTIFICATES");

    bool certificateFound = false;

    for (const EnrolledCourse &enrolled :
         student.enrolledCourses)
    {
        if (enrolled.progress == 100)
        {
            Course *course =
                findCourse(enrolled.courseId);

            if (course != nullptr)
            {
                certificateFound = true;

                cout << "\n+------------------------------------------------+\n";
                cout << "|              COURSE CERTIFICATE               |\n";
                cout << "+------------------------------------------------+\n";

                cout << "| Student : "
                     << student.name << "\n";

                cout << "| Course  : "
                     << course->name << "\n";

                cout << "| Status  : COMPLETED\n";

                cout << "+------------------------------------------------+\n";
            }
        }
    }

    if (!certificateFound)
    {
        cout << "\nNo certificates available yet.\n";
        cout << "Complete a course to earn a certificate.\n";
    }
}


/* =====================================================
   STUDENT PROFILE
   ===================================================== */

void displayProfile(const Student &student)
{
    displayHeader("STUDENT PROFILE");

    cout << "\nName  : "
         << student.name;

    cout << "\nEmail : "
         << student.email;

    cout << "\nCourses Enrolled : "
         << student.enrolledCourses.size();

    cout << "\n";
}


/* =====================================================
   SEARCH COURSE
   ===================================================== */

void searchCourse()
{
    string keyword;

    cin.ignore();

    cout << "\nEnter course name/category: ";

    getline(cin, keyword);

    transform(
        keyword.begin(),
        keyword.end(),
        keyword.begin(),
        ::tolower
    );

    bool found = false;

    cout << "\nSearch Results\n";
    cout << "------------------------------------------------------------\n";

    for (const Course &course : courses)
    {
        string courseName = course.name;
        string category = course.category;

        transform(
            courseName.begin(),
            courseName.end(),
            courseName.begin(),
            ::tolower
        );

        transform(
            category.begin(),
            category.end(),
            category.begin(),
            ::tolower
        );

        if (
            courseName.find(keyword) != string::npos ||
            category.find(keyword) != string::npos
        )
        {
            cout << "\nID       : " << course.id;
            cout << "\nCourse   : " << course.name;
            cout << "\nCategory : " << course.category;
            cout << "\nRating   : " << course.rating;
            cout << "\n";

            found = true;
        }
    }

    if (!found)
    {
        cout << "\nNo courses found.\n";
    }
}


/* =====================================================
   MAIN MENU
   ===================================================== */

void mainMenu(Student &student)
{
    int choice;

    do
    {
        displayHeader("STUDENT DASHBOARD");

        cout << "\nWelcome, "
             << student.name
             << "!";

        cout << "\n\n1.  View All Courses";
        cout << "\n2.  Search Course";
        cout << "\n3.  Enroll in Course";
        cout << "\n4.  My Courses";
        cout << "\n5.  Update Progress";
        cout << "\n6.  My Progress";
        cout << "\n7.  Quizzes";
        cout << "\n8.  Certificates";
        cout << "\n9.  My Profile";
        cout << "\n10. Logout";

        cout << "\n\nEnter your choice: ";
        cin >> choice;


        switch (choice)
        {
            case 1:
                displayCourses();
                break;

            case 2:
                searchCourse();
                break;

            case 3:
                enrollCourse(student);
                break;

            case 4:
                displayMyCourses(student);
                break;

            case 5:
                updateProgress(student);
                break;

            case 6:
                displayProgress(student);
                break;

            case 7:
                quizMenu();
                break;

            case 8:
                displayCertificates(student);
                break;

            case 9:
                displayProfile(student);
                break;

            case 10:
                cout << "\nLogging out...\n";
                break;

            default:
                cout << "\nInvalid choice. Please try again.\n";
        }

    } while (choice != 10);
}


/* =====================================================
   MAIN FUNCTION
   ===================================================== */

int main()
{
    Student student;

    displayHeader("STUDENT REGISTRATION");

    cout << "\nEnter Student Name: ";
    getline(cin, student.name);

    cout << "Enter Student Email: ";
    getline(cin, student.email);

    if (student.name.empty())
    {
        student.name = "Student";
    }

    cout << "\nRegistration successful!";
    cout << "\nWelcome to LearnHub, "
         << student.name
         << "!\n";

    mainMenu(student);

    cout << "\n============================================================\n";
    cout << "             THANK YOU FOR USING LEARNHUB\n";
    cout << "                 KEEP LEARNING!\n";
    cout << "============================================================\n";

    return 0;
}
