// Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz);
document.querySelector("#q6").addEventListener("input", function () {
    document.querySelector("#q6Value").value = this.value + "%";
});

// Global variables
var score = 0;
var attempts = localStorage.getItem("total_attempts") || 0;

// Initialize randomized questions
displayQ4Choices();

// Functions
function isFormValid() {
    let isValid = true;
    let errorMessage = "";

    // Check each required question
    if (document.querySelector("#q1").value.trim() === "") {
        errorMessage += "Question 1 was not answered. ";
        isValid = false;
    }
    if (document.querySelector("#q2").value === "") {
        errorMessage += "Question 2 was not answered. ";
        isValid = false;
    }
    if (!document.querySelector("input[name='q4']:checked")) {
        errorMessage += "Question 4 was not answered. ";
        isValid = false;
    }
    if (document.querySelector("#q5").value === "") {
        errorMessage += "Question 5 was not answered. ";
        isValid = false;
    }

    document.querySelector("#validationFdbk").innerHTML = errorMessage;
    return isValid;
}

function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white p-2 rounded";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark' class='feedback-image'>";
    score += 10; // Each question worth 10 points (100 total)
}

function wrongAnswer(index, feedback = "Incorrect!") {
    document.querySelector(`#q${index}Feedback`).innerHTML = feedback;
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white p-2 rounded";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.webp' alt='X mark' class='feedback-image'>";
}

function displayQ4Choices() {
    let q4ChoicesArray = ["North Dakota", "South Dakota", "Kansas", "Nebraska"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);

    let choicesHTML = "";
    for (let i = 0; i < q4ChoicesArray.length; i++) {
        let state = q4ChoicesArray[i];
        let id = state.replace(/\s+/g, '').toLowerCase();
        choicesHTML += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="q4" id="${id}" value="${state}">
                <label class="form-check-label" for="${id}">${state}</label>
            </div>`;
    }
    document.querySelector("#q4Choices").innerHTML = choicesHTML;
}

function gradeQuiz() {
    console.log("Grading quiz...");
    document.querySelector("#validationFdbk").innerHTML = "";

    if (!isFormValid()) {
        return;
    }

    // Reset score
    score = 0;

    // Get responses and grade each question
    // In the gradeQuiz function:

// Question 1 - Rio Grande
    let q1Response = document.querySelector("#q1").value.trim().toLowerCase();
    if (q1Response === "rio grande" || q1Response === "rio grande river") {
        rightAnswer(1);
    } else {
        wrongAnswer(1, "Incorrect! The Rio Grande forms the border.");
    }

// Question 2 - Lake Michigan
    let q2Response = document.querySelector("#q2").value;
    if (q2Response === "michigan") {
        rightAnswer(2);
    } else {
        wrongAnswer(2, "Incorrect! Lake Michigan is entirely within the US.");
    }

// Question 3 - Gulf States (AL, LA, MS)
    let q3Correct = document.querySelector("#alabama").checked &&
        document.querySelector("#louisiana").checked &&
        document.querySelector("#mississippi").checked &&
        !document.querySelector("#georgia").checked;
    if (q3Correct) {
        rightAnswer(3);
    } else {
        wrongAnswer(3, "Incorrect! Alabama, Louisiana, and Mississippi border the Gulf.");
    }

// Question 4 - North Dakota (randomized)
    let q4Response = document.querySelector("input[name='q4']:checked") ?
        document.querySelector("input[name='q4']:checked").value : "";
    if (q4Response === "North Dakota") {
        rightAnswer(4);
    } else {
        wrongAnswer(4, "Incorrect! The geographic center is in North Dakota near the town of Rugby.");
    }

// Question 5 - 4 time zones
    let q5Response = document.querySelector("#q5").value;
    if (q5Response === "4") {
        rightAnswer(5);
    } else {
        wrongAnswer(5, "Incorrect! There are 4 time zones in the contiguous US.");
    }

// Question 6 - Alaska glaciers (~5%)
    let q6Response = document.querySelector("#q6").value;
    if (q6Response >= "4" && q6Response <= "6") {
        rightAnswer(6);
    } else {
        wrongAnswer(6, `Incorrect! About 5% of Alaska is glaciated. Your guess was ${q6Response}%.`);
    }

// Question 7 - Appalachian Mountains
    let q7Response = document.querySelector("input[name='q7']:checked") ?
        document.querySelector("input[name='q7']:checked").value : "";
    if (q7Response === "Appalachian") {
        rightAnswer(7);
    } else {
        wrongAnswer(7, "Incorrect! The Appalachian Trail runs through the Appalachian Mountains.");
    }

// Question 8 - Alaska statehood (1959)
    let q8Response = document.querySelector("#q8").value;
    if (q8Response && new Date(q8Response).getFullYear() === 1959) {
        rightAnswer(8);
    } else {
        wrongAnswer(8, "Incorrect! Alaska became a state in 1959.");
    }

// Question 9 - USGS email (@usgs.gov)
    let q9Response = document.querySelector("#q9").value.toLowerCase();
    if (q9Response.endsWith("@usgs.gov")) {
        rightAnswer(9);
    } else {
        wrongAnswer(9, "Incorrect! USGS emails end with @usgs.gov");
    }

// Question 10 - Topo maps URL (https://www.usgs.gov)
    let q10Response = document.querySelector("#q10").value.toLowerCase();
    if (q10Response === "https://www.usgs.gov" || q10Response === "http://www.usgs.gov") {
        rightAnswer(10);
    } else {
        wrongAnswer(10, "Incorrect! The correct URL is https://www.usgs.gov");
    }

    // Update attempts
    attempts++;
    localStorage.setItem("total_attempts", attempts);

    // Display results
    let scoreColor = score >= 80 ? "text-success" : "text-danger";
    document.querySelector("#totalScore").className = scoreColor;
    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}/100`;
    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${attempts}`;

    // Display congratulatory message if score is above 80
    if (score >= 80) {
        document.querySelector("#congratsMessage").innerHTML =
            "🎉 Congratulations! Great job on the quiz! 🎉";
        document.querySelector("#congratsMessage").className = "h4 text-success";
    } else {
        document.querySelector("#congratsMessage").innerHTML = "";
    }
}