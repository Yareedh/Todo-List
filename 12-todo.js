let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
          <div class="row mb-2">
            <div class="col">${name}</div>
            <div class="col">${dueDate}</div>
            <div class="col">
              <button class="btn btn-info js-edit-todo-button" onclick="openEditModal(${index})">
                <i class="fas fa-pen"></i>
              </button>
              <button class="btn btn-danger js-delete-todo-button" onclick="deleteTodo(${index})">Delete</button>
            </div>
          </div>`;
    todoListHTML += html;
  });

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;
}

document.querySelector(".js-add-todo-button").addEventListener("click", () => {
  addTodo();
});

document.querySelectorAll(".form-control").forEach((input) => {
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });
});

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  if (name && dueDate) {
    todoList.push({
      name,
      dueDate,
    });

    inputElement.classList.remove("is-invalid");
    dateInputElement.classList.remove("is-invalid");

    inputElement.value = "";
    dateInputElement.value = "";
    renderTodoList();
    saveTodoList();
  } else {
    if (!name) {
      inputElement.classList.add("is-invalid");
    } else {
      inputElement.classList.remove("is-invalid");
    }

    if (!dueDate) {
      dateInputElement.classList.add("is-invalid");
    } else {
      dateInputElement.classList.remove("is-invalid");
    }
  }
}

function openEditModal(index) {
  const editNameInput = document.getElementById("editName");
  const editDueDateInput = document.getElementById("editDueDate");

  editNameInput.value = todoList[index].name;
  editDueDateInput.value = todoList[index].dueDate;

  const modal = new bootstrap.Modal(document.getElementById("editModal"), {});
  modal.show();

  document.getElementById("editModal").dataset.index = index;
}

function saveEditedTodo() {
  const index = document.getElementById("editModal").dataset.index;
  const newName = document.getElementById("editName").value;
  const newDueDate = document.getElementById("editDueDate").value;

  if (newName && newDueDate) {
    todoList[index].name = newName;
    todoList[index].dueDate = newDueDate;
    saveTodoList();
    renderTodoList();
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("editModal")
    );
    modal.hide();
  } else {
    alert("Both fields are required!");
  }
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  saveTodoList();
  renderTodoList();
}

function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
