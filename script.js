const baseURL = document.querySelector("#user");
const renderUser = (user) => {
  let result = "";
  user.forEach((element) => {
    if (element.id > 10) {
      return;
    }
    result += ` 
    <tr>
        <td id="td1">${element.id}</td>
        <td id="td2">${element.name}</td>
        <td id="td3">${element.email}</td>
        <td id="td4">${element.username}</td>
        <td id="td5">${element.phone}</td>
        </tr>
        `;
  });
  baseURL.innerHTML = result;
  localStorage.setItem("user", JSON.stringify(user));
};
const fetchData = () => {
  const local = localStorage.getItem("user", JSON.stringify(user));
  const parseList = JSON.parse(local);
  if (!!parseList) {
    renderUser(parseList);
  } else {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        renderUser(user);
      })
      .catch((error) => {
        // alert("Error", error);
      });
  }
};
fetchData();
// ?--------
function sortByValue() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("user");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
sortByValue();
// ?--------

function filterTable() {
  let dropdown, tr, table, name, cells, filter;
  dropdown = document.getElementById("dropdownSelect");
  table = document.querySelector("#user");
  tr = table.getElementsByTagName("tr");
  filter = dropdown.value;
  //
  for (let td of tr) {
    cells = td.getElementsByTagName("td");
    name = cells[2] || null;
    if (filter === "Sort By Age" || !name || filter === name.textContent) {
      td.style.display = "";
    } else {
      td.style.display = "none";
    }
  }
}
// !
function sortTable(n) {
  let table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.querySelector("#user");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 0; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
// !
function sortTableByNumbers(n) {
  let table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.querySelector("#user");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 0; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
