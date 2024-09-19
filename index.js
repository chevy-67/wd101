document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    const mindate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    const maxdate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];

    const dob = document.getElementById("dob");
    dob.setAttribute("min", mindate);
    dob.setAttribute("max", maxdate);
    dispEnt();
});

let userForm = document.getElementById("form");

// Retrieve entries from localStorage
let retEnt = () => {
    let ent = localStorage.getItem("form");
    if (ent) {
        return JSON.parse(ent);
    } else {
        return [];
    }
};

let data = retEnt(); // Initialize data from localStorage

// Display the table of entries
const dispEnt = () => {
    const entries = retEnt();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.tc}</td>`;

        const row = `<tr> ${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class="table-auto w-full">
    <thead>
      <tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">Dob</th>
        <th class="px-4 py-2">Accepted terms?</th>
      </tr>
    </thead>
    <tbody>${tableEntries}</tbody>
    </table>`;

    document.getElementById("user_entries").innerHTML = table;
}

// Handle form submission
function getInfo(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const tc = document.getElementById("tc").checked;

    let userData = {
        name,
        email,
        password,
        dob,
        tc
    };

    if (!validAge()) {
        alert("Age must be between 18 and 55");
        return;
    }
    if (!validemail(email)) {
        alert("Please enter a valid email");
        return;
    }

    let data = retEnt();
    data.push(userData);
    localStorage.setItem("form", JSON.stringify(data)); // Store in localStorage
    dispEnt(); // Refresh the display
}

// Validate the age
const validAge = () => {
    const dobInput = document.getElementById("dob").value;
    if (!dobInput) {
        return false;
    }
    let today = new Date();
    let dob = new Date(dobInput);
    let ageDiff = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        ageDiff--;
    }

    return ageDiff >= 18 && ageDiff <= 55;
}

// Validate the email format
const validemail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Add submit event listener to the form
userForm.addEventListener("submit", getInfo);

// Display any existing entries when the page loads
dispEnt();
