// // Selecting the html elements to the js file
// const form = document.getElementById("studentData");
// // Query selector you collect the element using css selctors exaple #id
// const tablebody = document.querySelector("#studentTable tbody");

// //Array
// let students = [];

// //get students from localstorage
// students = JSON.parse(localStorage.getItem('students'))
// updatetable();


// // Add event listener on the form example click, submit, onClick
// //first argument is type of event, then anonymous function that handles the event
// form.addEventListener("submit",function(event){
//     //prevent the default submission always
//     event.preventDefault();//function that prringify(localStorage.getItem('students'))events the form from submiting itself

//     //get all the values of the form field
//     const studentName = document.getElementById("name").value;
//     const studentRegNo = document.getElementById("regNumber").value;
//     const cat1 = parseFloat(document.getElementById("cat1").value);
//     const cat2 = parseFloat(document.getElementById("cat2").value);
//     const examMarks = parseFloat(document.getElementById("exam").value);

//     //calculate average of cat 1 and cat 2
//     const catAverage = (cat1 + cat2)/2;
//     const finalMarks = catAverage + examMarks;

//     //determine studnet grade
//     let grade = '';
//     if (finalMarks >= 70) grade = 'A' ;       
//     else if(finalMarks>= 60) grade='B';
//     else if(finalMarks >= 50) grade='C';
//     else if(finalMarks>=40) grade = 'D'
//     else grade = 'F'

//     //create student object
//     const student = {
//         studentName, studentRegNo, cat1, cat2,examMarks, finalMarks,grade
//     };
//     students.push(student);//my student is available in the group or array of students
//     updatetable()
//     // Now we have to store in local storage
//     localStorage.setItem("students", JSON.stringify(students));

// });

// // Function to update the table
// function updatetable(){
//     tablebody.innerHTML = ''

//     // iterating through objects
//     students.forEach(student =>{
//         const newRow = document.createElement('tr');
//         newRow.innerHTML = `
//             <td>${student.studentName}</td>
//             <td>${student.studentRegNo}</td>
//             <td>${student.cat1}</td>
//             <td>${student.cat2}</td>
//             <td>${student.examMarks}</td>
//             <td>${student.finalMarks}</td>
//             <td>${student.grade}</td>
//         `
//         //making it display on html
//         tablebody.appendChild(newRow);

//         //save to localStorage
//         localStorage.setItem("students", JSON.stringify(students));
//     })
//  }

// Selecting the HTML elements
const form = document.getElementById("studentData");
const tablebody = document.querySelector("#studentTable tbody");

// Initialize students array from localStorage or empty array
let students = JSON.parse(localStorage.getItem('students')) || [];

// Update table initially
updatetable();

// Add event listener for form submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form field values
    const studentName = document.getElementById("name").value.trim();
    const studentRegNo = document.getElementById("regNumber").value.trim();
    const cat1 = parseFloat(document.getElementById("cat1").value);
    const cat2 = parseFloat(document.getElementById("cat2").value);
    const examMarks = parseFloat(document.getElementById("exam").value);

    // Validate inputs
    if (!studentName || !studentRegNo) {
        alert("Name and Registration Number are required!");
        return;
    }
    if (isNaN(cat1) || isNaN(cat2) || isNaN(examMarks)) {
        alert("Please enter valid numbers for CAT1, CAT2, and Exam marks!");
        return;
    }

    // Check for duplicate registration number
    if (students.some(student => student.studentRegNo === studentRegNo)) {
        alert("Registration Number already exists!");
        return;
    }

    // Calculate average and final marks
    const catAverage = (cat1 + cat2) / 2;
    const finalMarks = parseFloat((catAverage + examMarks).toFixed(2));

    // Determine student grade
    let grade = '';
    if (finalMarks >= 70) grade = 'A';
    else if (finalMarks >= 60) grade = 'B';
    else if (finalMarks >= 50) grade = 'C';
    else if (finalMarks >= 40) grade = 'D';
    else grade = 'F';

    // Create student object
    const student = {
        studentName,
        studentRegNo,
        cat1,
        cat2,
        examMarks,
        finalMarks,
        grade
    };

    // Add student to array and update table
    students.push(student);
    updatetable();

    // Save to localStorage
    localStorage.setItem("students", JSON.stringify(students));

    // Reset form
    form.reset();
});

// Function to update the table
function updatetable() {
    tablebody.innerHTML = ''; // Clear existing rows

    // Iterate through students
    students.forEach(student => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${student.studentName}</td>
            <td>${student.studentRegNo}</td>
            <td>${student.cat1}</td>
            <td>${student.cat2}</td>
            <td>${student.examMarks}</td>
            <td>${student.finalMarks}</td>
            <td>${student.grade}</td>
        `;
        tablebody.appendChild(newRow);
    });
}