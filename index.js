const form = document.getElementById("studentData");
const tablebody = document.querySelector("#studentTable tbody");

let students = JSON.parse(localStorage.getItem('students')) || [];

updatetable();

form.addEventListener("submit", function (event) {
    event.preventDefault();

    //get all the values of the form field
    const studentName = document.getElementById("name").value.trim();
    const studentRegNo = document.getElementById("regNumber").value.trim();
    const cat1 = parseFloat(document.getElementById("cat1").value);
    const cat2 = parseFloat(document.getElementById("cat2").value);
    const examMarks = parseFloat(document.getElementById("exam").value);

    //calculate average of cat 1 and cat 2
    const catAverage = (cat1 + cat2)/2;
    const finalMarks = catAverage + examMarks;

    //determine studnet grade
    let grade = '';
    if (finalMarks >= 70) grade = 'A' ;       
    else if(finalMarks>= 60) grade='B';
    else if(finalMarks >= 50) grade='C';
    else if(finalMarks>=40) grade = 'D'
    else grade = 'F'

    //create student object
    const student = {
        studentName, studentRegNo, cat1, cat2,examMarks, finalMarks,grade
    };
    students.push(student);//my student is available in the group or array of students
    updatetable()
    // Now we have to store in local storage
    localStorage.setItem("students", JSON.stringify(students));

    form.reset()

});

// Function to update the table
function updatetable(){
    tablebody.innerHTML = ''

    // iterating through objects
    students.forEach(student =>{
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${student.studentName}</td>
            <td>${student.studentRegNo}</td>
            <td>${student.cat1}</td>
            <td>${student.cat2}</td>
            <td>${student.examMarks}</td>
            <td>${student.finalMarks}</td>
            <td>${student.grade}</td>
        `
        //making it display on html
        tablebody.appendChild(newRow);
    });
 }