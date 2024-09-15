let userForm = document.getElementById("form");

// Retrieve entries from localStorage
let retEnt = () => {
    let ent = localStorage.getItem("form");
    if (ent) {
        return JSON.parse(ent); // Parse the localStorage entry
    } else {
        return []; // Return an empty array if no data is found
    }
    //return ent;
};

let data = retEnt(); // Initialize data from localStorage

// Display the table of entries
const dispEnt = () => {
    const entries = retEnt();
  

    // Map through the entries and create table rows
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.tc}</td>`;

        const row = `<tr> ${nameCell} ${emailCell} ${dobCell} ${passwordCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    
    const table = `<table class="table-auto w-full">
    <thead>
      <tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Dob</th>
        <th class="px-4 py-2">Password</th>
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
    const password = document.getElementById("pass").value;
    const dob = document.getElementById("dob").value;
    const tc = document.getElementById("tc").checked;

    let userData = {
        name,
        email,
        password,
        dob,
        tc
    };

    if(!validAge()){
        alert("Age must between 18 and 55");
        return;
    }
    let data = retEnt();
    data.push(userData); // Add new user data to the array
    localStorage.setItem("form", JSON.stringify(data)); // Store the data in localStorage
    dispEnt(); // Refresh the display
}


const validAge = () =>{
    const dobInput  = document.getElementById("dob").value;
    if(!dobInput){
        return false;
    }
    let today = new Date();
    let dob = new Date(dobInput);
    let ageDiff = today.getFullYear() - dob.getFullYear();
    return (ageDiff>=18 && ageDiff<=55);
     
}
// Add submit event listener to the form
userForm.addEventListener("submit", getInfo);

// Display any existing entries when the page loads
dispEnt();
