var states = [
  { id: 1, name: "Maharashtra", country_name: "India" },
  { id: 2, name: "Karnataka", country_name: "India" },
  { id: 3, name: "Tamil Nadu", country_name: "India" },
  { id: 4, name: "West Bengal", country_name: "India" },
  { id: 5, name: "Gujarat", country_name: "India" },
  { id: 6, name: "Ontario", country_name: "Canada" },
  { id: 7, name: "Quebec", country_name: "Canada" },
  { id: 8, name: "British Columbia", country_name: "Canada" },
  { id: 9, name: "Alberta", country_name: "Canada" },
  { id: 10, name: "Manitoba", country_name: "Canada" },
  { id: 11, name: "New South Wales", country_name: "Australia" },
  { id: 12, name: "Victoria", country_name: "Australia" },
  { id: 13, name: "Queensland", country_name: "Australia" },
  { id: 14, name: "Western Australia", country_name: "Australia" },
  { id: 15, name: "Tasmania", country_name: "Australia" },
];

let country = document.getElementById("country_section");

// state state Filter section
country.addEventListener("change", (values) => {
  let statesFilter = states.filter(
    (v) => v.country_name == values.target.value,
  );

  let stateOptions = `<option value="" class="changOpt">Select State</option>`;
  statesFilter.forEach((i) => {
    stateOptions += `<option value='${i.name}' class="changOpt">${i.name}</option>`;
  });

  document.querySelector("#state_section").innerHTML = stateOptions;
});

// End State filter section

// start formState filter section
let editIndex = null;

let formSubmit = document.querySelector("#form");
let changeBtn = document.querySelector("#changeBtn");
let nameError = document.querySelector(".nameError p");
let emailError = document.querySelector(".emailError");
let phoneError = document.querySelector(".phoneError");
let countryError = document.querySelector(".countryError");
let stateError = document.querySelector(".stateError");

formSubmit.addEventListener("submit", (v) => {
  v.preventDefault();
  let hasError = false;
  if (v.target.name.value.trim() == "") {
    nameError.innerText = `Name is required`;
    nameError.style.color = "red";
    hasError = true;
  } else {
    nameError.innerText = " ";
  }
  if (v.target.email.value.trim() == "") {
    emailError.innerText = `email is required`;
    emailError.style.color = "red";
    hasError = true;
  } else {
    emailError.innerText = " ";
  }

  if (v.target.mobile.value.trim() == "") {
    phoneError.innerText = `Phone is required`;
    phoneError.style.color = "red";
    hasError = true;
  } else {
    phoneError.innerText = " ";
  }
  if (v.target.country_section.value == "") {
    countryError.innerText = `Country is required`;
    countryError.style.color = "red";
    hasError = true;
  } else {
    countryError.innerText = " ";
  }

  if (v.target.state_section.value == "") {
    stateError.innerText = `State is required`;
    stateError.style.color = "red";
    hasError = true;
  } else {
    stateError.innerText = " ";
  }

  if (hasError) {
    return;
  }

  let getUserValue = JSON.parse(localStorage.getItem("USERINFO")) ?? [];

  let userInfo = {
    name: v.target.name.value,
    email: v.target.email.value,
    mobile_number: v.target.mobile.value,
    country_name: v.target.country_sections.value,
    state_name: v.target.state_sections.value,
  };

  if (editIndex === null) {
    getUserValue.push(userInfo);
  } else {
    getUserValue[editIndex] = userInfo;
    editIndex = null;
    changeBtn.innerText = "Submit";
  }
  localStorage.setItem("USERINFO", JSON.stringify(getUserValue));

  tables();
  formSubmit.reset();
});

// End formState filter section

// start a table section
function tables() {
  let tbody = document.querySelector("tbody");
  let getUserValue = JSON.parse(localStorage.getItem("USERINFO")) ?? [];

  if (getUserValue.length > 0) {
    let tableVlues = "";
    getUserValue.forEach((v, i) => {
      tableVlues += ` <tr align="center">
                <td>${i + 1}</td>
                <td>${v.name}</td>
                <td>${v.email}</td>
                <td>${v.mobile_number}</td>
                <td>${v.country_name}</td>
                <td>${v.state_name}</td>
                <td><button class="editBtn" onClick='editBtn(${i})'>Edit</button></td>
                <td><button class='delBtn' onClick='deletebtn(${i})'>Delete</button></td>
                
            </tr>
`;
    });
    tbody.innerHTML = tableVlues;
  } else {
    let noFoundSection = ` <tr>
                <td colspan="8">No Found result!</td>
                </tr>`;
    tbody.innerHTML = noFoundSection;
  }
}
tables();
// End a table section

// start a delete section
function deletebtn(index) {
  if (confirm("Are you sure you want to delete")) {
    let getUserValue = JSON.parse(localStorage.getItem("USERINFO")) ?? [];
    getUserValue.splice(index, 1);
    localStorage.setItem("USERINFO", JSON.stringify(getUserValue));

    tables();
  }
}
// End a delete section

// Start a edit section
function editBtn(editValue) {
  let getUserValue = JSON.parse(localStorage.getItem("USERINFO")) ?? [];
  let editInfo = getUserValue[editValue];
  document.querySelector("#name_Section").value = editInfo.name;
  document.querySelector("#email_section").value = editInfo.email;
  document.querySelector("#mobile_section").value = editInfo.mobile_number;
  document.querySelector("#country_section").value = editInfo.country_name;

  let statesFilter = states.filter(
    (v) => v.country_name == editInfo.country_name,
  );

  let stateOptions = `<option value="" class="changOpt">Select State</option>`;
  statesFilter.forEach((i) => {
    stateOptions += `<option value='${i.name}' class="changOpt">${i.name}</option>`;
  });

  document.querySelector("#state_section").innerHTML = stateOptions;
  document.querySelector("#state_section").value = editInfo.state_name;

  editIndex = editValue;

  changeBtn.innerText = "Update";
  tables();
}
// End a edit section
