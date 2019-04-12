//Taking Elements from html
const itemInput = document.getElementById("itemInput");
const addbtn = document.getElementById("add");
const completed = document.getElementById("completed");
const feedback = document.querySelector(".feedback");

// creating array for local storage
let itemData = [];

// listening to addbtn element
addbtn.addEventListener("click", buttonClicked);
itemInput.addEventListener("keydown", enterBtn);

// creating function enterBtn
function enterBtn(e) {
  if (e.code === "Enter") {
    buttonClicked(e);
  }
}

// creating buttonClicked function
function buttonClicked(event) {
  event.preventDefault();
  const value = itemInput.value;

  if (value === "") {
    // calling showfeedback function
    showfeedback("! Please enter a valid item", "danger");
  } else {
    // calling addItemtodo function
    addItemtodo(value);
    itemInput.value = "";
  }
}

//showfeedback function
function showfeedback(text, action) {
  feedback.classList.add("showItem", `alert-${action}`);
  feedback.innerHTML = `<p>${text}</p>`;

  //SetTimeout function to remove feedback after required time
  setTimeout(function () {
    feedback.classList.remove("showItem", `alert-${action}`);
  }, 3000);
}
// addItemtodo function
function addItemtodo(value) {
  const todo = document.getElementById("todo");

  todo.classList.add("row");

  const div1 = document.createElement("div");
  div1.classList.add("col-md-12");

  const ul = document.createElement("ul");
  ul.classList.add("list-group");

  div1.appendChild(ul);

  const li = document.createElement("li");
  li.classList.add("list-group-item", "px-5", "my-2");

  ul.appendChild(li);

  const input = document.createElement("input");
  input.classList.add("form-check-input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", "inputCheck");

  //adding Eventlistner on input element
  input.addEventListener("change", completed);

  //function Completed
  function completed(e) {
    e.preventDefault();
    const item = this.parentNode.parentNode.parentNode;
    const parent = item.parentNode;
    const id = parent.id;
    const checked = input.checked;
    // Check whether the item should be in completed list  or re-added todo list
    var target;
    if (checked === true) {
      if (id === "todo") {
        target = document.getElementById("completed");
      }
    } else {
      target = document.getElementById("todo");
    }
    console.log(parent);
    console.log(item);
    console.log(target);
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[6]);
  }

  li.appendChild(input);

  const h4 = document.createElement("h4");
  h4.classList.add("px-3", "pt-1");
  h4.innerText = value;

  li.appendChild(h4);

  const div2 = document.createElement("div");
  div2.classList.add("buttons");

  li.appendChild(div2);

  const a1 = document.createElement("a");
  a1.setAttribute("href", "#");
  a1.classList.add("edit-btn", "mx-2", "item-icon");

  //adding eventlistener on edit button
  a1.addEventListener("click", editBtn);
  //calling the function editBtn
  function editBtn(e) {
    e.preventDefault();
    const item = this.parentNode.parentNode.parentNode;
    const parent = item.parentNode;
    const h4 = this.parentNode.parentNode.childNodes[1];
    let itemValue = h4.value;
    console.log(itemValue);
  }

  const i1 = document.createElement("i");
  i1.classList.add("far", "fa-edit");
  a1.appendChild(i1);

  const a2 = document.createElement("a");
  a2.setAttribute("href", "#");
  a2.classList.add("delete-btn", "item-icon");

  //adding Eventlistner on remove button
  a2.addEventListener("click", removeItem);

  //removeItem function
  function removeItem(e) {
    e.preventDefault();
    const item = this.parentNode.parentNode.parentNode.parentNode;
    const parent = item.parentNode;
    parent.removeChild(item);
  }

  const i2 = document.createElement("i");
  i2.classList.add("far", "fa-times-circle");
  a2.appendChild(i2);

  div2.appendChild(a1);
  div2.appendChild(a2);
  todo.insertBefore(div1, todo.childNodes[0]);
}