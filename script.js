const formatDate = (date) => {
    return `${date.getFullYear()}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")} ${date
            .getHours()
            .toString()
            .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
                .getSeconds()
                .toString()
                .padStart(2, "0")}`;
}

// Exercise 1
// Find the timezones of :
// Anchorage (USA) -8
// Reykjavik (Iceland) 0
// Kyiv (Ukraine) +3
// And display the date and time of these cities along with the time and date of Brussels.
const exercisesContainer = document.querySelector('.exercises');
const exercise1 = document.createElement("div");
exercise1.classList.add("exercise");
exercise1.innerHTML = `<h2>Exercise 1</h2>`;
const timezoneDisplay = document.createElement("p");
exercise1.appendChild(timezoneDisplay);
exercisesContainer.appendChild(exercise1);

setInterval(() => {
    const brussels = new Date().toLocaleString("en-BE", {
        timeZone: "Europe/Brussels",
        timeStyle: "medium",
        hourCycle: "h24",
    });
    const kyiv = new Date().toLocaleString("en-UA", {
        timeZone: "Europe/Kyiv",
        timeStyle: "medium",
        hourCycle: "h24",
    });
    const reykjavik = new Date().toLocaleString("en-US", {
        timeZone: "Atlantic/Reykjavik",
        timeStyle: "medium",
        hourCycle: "h24",
    });
    const anchorage = new Date().toLocaleString("en-US", {
        timeZone: "America/Anchorage",
        timeStyle: "medium",
        hourCycle: "h24",
    });

    timezoneDisplay.innerHTML = `
    Time in Brussels: ${brussels}<br />
    Time in Kyiv: ${kyiv}<br />
    Time in Reykjavik: ${reykjavik}<br />
    Time in Anchorage: ${anchorage}
  `;
}, 1000);

// Exercise 2
// Using timestamps, find how many days have passed since the date of your birth. Feeling old, yet?
// Write a function to find how many days have passed since any point in time (after 1970).
const exercise2 = document.createElement("div");
exercise2.classList.add("exercise");
exercise2.innerHTML = `<h2>Exercise 2</h2>`;
const birthInfo = document.createElement("p");
exercise2.appendChild(birthInfo);
exercisesContainer.appendChild(exercise2);

const dateOfBirth = new Date(1992, 9, 28);
const currentDate = new Date();
const daysSinceBirth = Math.floor(
    (currentDate - dateOfBirth) / (1000 * 60 * 60 * 24)
);
birthInfo.textContent = `I was born ${daysSinceBirth} days ago!`;

const customDateButton = document.createElement("button");
customDateButton.innerText = "Calculate days since a custom date";
exercise2.appendChild(customDateButton);

customDateButton.addEventListener("click", () => {
    const year = parseInt(prompt("Enter the year (YYYY) after 1970"));
    const month = parseInt(prompt("Enter the month (1-12)"));
    const day = parseInt(prompt("Enter the day (1-31)"));

    if (
        isNaN(year) ||
        isNaN(month) ||
        isNaN(day) ||
        year < 1970 ||
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31
    ) {
        alert("Invalid date");
    } else {
        const customDate = new Date(year, month - 1, day);
        const diffDays = Math.floor(
            (new Date() - customDate) / (1000 * 60 * 60 * 24)
        );
        alert(`${diffDays} days have passed since ${day}/${month}/${year}.`);
    }
});

// Exercise 3
// Using timestamps, find the exact time and date we will be in 80000 hours.
// Write a function to display the time and date for any amount of hours given in the future.
// Create a number input for the hours and listen for keyup events, dynamically display the date in the number of hours given by the input.
const exercise3 = document.createElement("div");
exercise3.classList.add("exercise");
exercise3.innerHTML = `<h2>Exercise 3</h2>`;
const futureText = document.createElement("p");
exercise3.appendChild(futureText);
exercisesContainer.appendChild(exercise3);

const futureDate = new Date(Date.now() + 80000 * 60 * 60 * 1000);
futureText.innerHTML = `In 80000 hours the date and time will be: ${formatDate(
    futureDate
)}<br /><br />Enter the amount of hours:`;

const hoursInput = document.createElement("input");
hoursInput.type = "number";
exercise3.appendChild(hoursInput);

const dynamicResult = document.createElement("p");
exercise3.appendChild(dynamicResult);

hoursInput.addEventListener("input", () => {
    const hours = parseInt(hoursInput.value);
    if (isNaN(hours) || hours < 0) {
        dynamicResult.textContent = "Please enter a positive number.";
    } else {
        const dynamicDate = new Date(Date.now() + hours * 60 * 60 * 1000);
        dynamicResult.textContent = `In ${hours} hours, it will be: ${formatDate(
            dynamicDate
        )}`;
    }
});

// Exercise 4
// Using HTML, CSS (and javascript, of course) reproduce the following picture. This should be centered both horizontaly and 
// vertically in your page. The date should be of today, in your timezone. Refresh the display every seconds (hint), so the 
// time stays exact even when the page stays open for a long time.
// When clicking on the hours, toggle the display in 12-hours format or back to 24-hours format.
const dayElement = document.querySelector(".clock__day");

const dateNumberElement = document.createElement("p");
dateNumberElement.style.color = "#909090";

const monthElement = document.createElement("p");
monthElement.style.color = "#7C7C7C";

const dateContainer = document.querySelector(".clock__day-number");
dateContainer.appendChild(dateNumberElement);
dateContainer.appendChild(monthElement);

const yearElement = document.createElement("p");
const monthContainer = document.querySelector(".clock__month");
monthContainer.appendChild(yearElement);

const hoursElement = document.querySelector(".clock__hours");
const secondsElement = document.querySelector(".clock__seconds");

let is12HourFormat = false;

const refresh = () => {
    const now = new Date();

    const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    dayElement.textContent = daysOfWeek[(now.getDay() + 6) % 7];

    dateNumberElement.textContent = now.getDate();

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    monthElement.textContent = months[now.getMonth()];

    yearElement.textContent = now.getFullYear();

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    if (is12HourFormat && hours > 12) {
        hours -= 12;
    }
    hoursElement.textContent = `${hours}:${minutes}:`;
    secondsElement.textContent = seconds;
};

hoursElement.addEventListener("click", () => {
    is12HourFormat = !is12HourFormat;
    refresh();
});

setInterval(refresh, 1000);
refresh();