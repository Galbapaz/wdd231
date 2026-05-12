const courses = [

    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    },

    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },

    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: false
    },

    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    }

];

const courseContainer = document.querySelector("#courseContainer");

const totalCredits = document.querySelector("#totalCredits");

const buttons = document.querySelectorAll(".course-buttons button");


function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const courseCard = document.createElement("p");

        courseCard.innerHTML =
        `${course.subject} ${course.number}`;

        if (course.completed) {

            courseCard.style.backgroundColor = "#123c73";

            courseCard.style.color = "white";

        }

        courseContainer.appendChild(courseCard);

    });

    displayCredits(courseList);

}



function displayCredits(courseList) {

    const credits = courseList.reduce((total, course) =>
    total + course.credits, 0);

    totalCredits.textContent = credits;

}



buttons[0].addEventListener("click", () => {

    displayCourses(courses);

});

buttons[1].addEventListener("click", () => {

    const cseCourses = courses.filter(course =>
        course.subject === "CSE"
    );

    displayCourses(cseCourses);

});

buttons[2].addEventListener("click", () => {

    const wddCourses = courses.filter(course =>
        course.subject === "WDD"
    );

    displayCourses(wddCourses);

});


displayCourses(courses);