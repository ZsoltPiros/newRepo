var isItDoneValidation = (num) => {
  var result;
  if (num === 0) {
    result = "";
  } else {
    result = "checkedBox";
  }
  return result;
}
var addButton = document.querySelector("#addButton");
// xhr requests

var getTaskList = () => {
  var result;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/todos');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      result = JSON.parse(xhr.response);
      renderTheList(result);
      selectCheckBoxes();
      selectGarbageCans();
    }
  }
}

var addTask = (data) => {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/todos');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    name: data
  }));
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log(JSON.stringify(xhr.response));
    }
  }
  getTaskList();
}

var updateTask = (id) => {
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', 'http://localhost:3000/todos');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    id: id
  }));
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log(JSON.stringify(xhr.response));
    }
  }
  getTaskList();
}

var deleteTask = (id) => {
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', 'http://localhost:3000/todos');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    id: id
  }));
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log(JSON.stringify(xhr.response));
    }
  }
  getTaskList();
}

var inputField = document.querySelector("#todoInput");

addButton.addEventListener("click", () => {
  addTask(inputField.value);
});
inputField.addEventListener("click", () => {
  inputField.value = "";
});
inputField.addEventListener("keypress", (e) => {
  var key = e.which || e.keyCode;
  if (key === 13) {
    addTask(event.target.value);
    event.target.value = "";
  }
});

// rendering part

var renderTheList = (listItemObjectList) => {
  var listFrame = document.querySelector('ul');
  listFrame.innerHTML = "";
  for (var i = 0; i < listItemObjectList.length; i++) {
    console.log(listItemObjectList[i]);
    listFrame.innerHTML += "<li><div class='taskHolder'><p>" + listItemObjectList[i]["name"] + "</p><div class='buttons'><div id=" + listItemObjectList[i]["id"] + " class='" + isItDoneValidation(listItemObjectList[i]["done"]) + " checkBox'></div><div id=" + listItemObjectList[i]["id"] + " class='garbageCan'></div></div></div></li>";
  }
}
getTaskList();
// ==================Targeting after rendering list==================//
var selectCheckBoxes = () => {
  var result = [];
  document.querySelectorAll('.checkBox').forEach((e) => {
    e.addEventListener('click', () => {
      updateTask(e.getAttribute("id"));
    });
    result.push(e);
  });
  return result;
}

var selectGarbageCans = () => {
  var result = [];
  document.querySelectorAll(".garbageCan").forEach((e) => {
    e.addEventListener('click', () => {
      $(e.parentElement.parentElement.parentElement).fadeOut(500, () => {
        deleteTask(e.getAttribute("id"));
      });
    });
    result.push(e);
  });
  return result;
}