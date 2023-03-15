const form = document.querySelector("form");
const input = form.querySelector("input[type='text']");
const date = form.querySelector("input[type='date']");
const ul = document.querySelector("ul");

function addTask(e) {
	e.preventDefault();
	if (input.value !== "") {
		const li = document.createElement("li");
		const taskText = document.createElement("span");
		const deadline = document.createElement("span");
		const checkBox = document.createElement("input");
		const editButton = document.createElement("button");
		const deleteButton = document.createElement("button");

		taskText.textContent = input.value;
		deadline.textContent = date.value;
		checkBox.type = "checkbox";
		editButton.textContent = "Edit";
		editButton.classList.add("edit");
		deleteButton.textContent = "Delete";
		deleteButton.classList.add("delete");

		li.appendChild(checkBox);
		li.appendChild(taskText);
		li.appendChild(deadline);
		li.appendChild(editButton);
		li.appendChild(deleteButton);
		ul.appendChild(li);

		input.value = "";
		date.value = "";
	}
}

function editTask(e) {
    const li = e.target.parentNode;
    const taskText = li.querySelector("span");
    const deadline = li.querySelector("span:nth-of-type(2)");
    const editButton = li.querySelector("button.edit");
    const deleteButton = li.querySelector("button.delete");
    const checkBox = li.querySelector("input[type='checkbox']");
    const input = document.createElement("input");
    const dateInput = document.createElement("input");
    const saveButton = document.createElement("button");
    input.type = "text";
input.value = taskText.textContent;
dateInput.type = "date";
dateInput.value = deadline.textContent;
saveButton.textContent = "Save";
saveButton.classList.add("edit");

li.insertBefore(input, taskText);
li.insertBefore(dateInput, deadline);
li.insertBefore(saveButton, editButton);
li.removeChild(taskText);
li.removeChild(deadline);
li.removeChild(editButton);
li.removeChild(deleteButton);

saveButton.addEventListener("click", function() {
	if (input.value !== "") {
		taskText.textContent = input.value;
		deadline.textContent = dateInput.value;
		li.insertBefore(checkBox, taskText);
		li.insertBefore(taskText, dateInput);
		li.insertBefore(deadline, saveButton);
		li.insertBefore(editButton, deleteButton);
		li.removeChild(input);
		li.removeChild(dateInput);
		li.removeChild(saveButton);
	}
});
}


function deleteTask(e) {
const li = e.target.parentNode;
ul.removeChild(li);
}

function toggleDone(e) {
const li = e.target.parentNode;
li.classList.toggle("done");
}

form.addEventListener("submit", addTask);
ul.addEventListener("click", function(e) {
if (e.target.tagName === "BUTTON") {
if (e.target.classList.contains("delete")) {
deleteTask(e);
} else {
editTask(e);
}
} else if (e.target.tagName === "INPUT") {
toggleDone(e);
}
});