"use strict";
(() => {
    let NotificationPlataform;
    (function (NotificationPlataform) {
        NotificationPlataform["SMS"] = "SMS";
        NotificationPlataform["EMAIL"] = "EMAIL";
        NotificationPlataform["PUSH_NOTIFICATION"] = "PUSH_NOTIFICATION";
    })(NotificationPlataform || (NotificationPlataform = {}));
    let ViewMode;
    (function (ViewMode) {
        ViewMode["TODO"] = "TODO";
        ViewMode["REMINDER"] = "REMINDER";
    })(ViewMode || (ViewMode = {}));
    const UUID = () => {
        return Math.random().toString(32).substring(2, 9);
    };
    const DateUtils = {
        tomorrow() {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        today() {
            return new Date();
        },
        formatDate(date) {
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        },
    };
    class Todo {
        constructor(description) {
            this.id = UUID();
            this.dateCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = "";
            this.done = false;
            this.description = description;
        }
        render() {
            return `
      ---> Todo <---
      description: ${this.description}
      done: ${this.done}
      
      `;
        }
    }
    class Reminder {
        constructor(description, date, notification) {
            this.id = UUID();
            this.dateCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = "";
            this.date = DateUtils.tomorrow();
            this.notification = [NotificationPlataform.EMAIL];
            this.description = description;
            this.date = date;
            this.notification = notification;
        }
        render() {
            return `
      ---> Reminder  <---
      description: ${this.description}
      date: ${DateUtils.formatDate(this.date)}
      plataform: ${this.notification.join(",")}

      `;
        }
    }
    const todo = new Todo("todo");
    const reminder = new Reminder("Reminder Criado com Classe", new Date(), [
        NotificationPlataform.EMAIL,
    ]);
    const taskView = {
        getTodo(form) {
            const todoDescription = form.todoDescription.value;
            form.reset();
            return new Todo(todoDescription);
        },
        getReminder(form) {
            const reminderNotification = [
                form.notifications.value,
            ];
            const reminderDate = new Date(form.reminderDate.value);
            const reminderDescription = form.reminderDescription.value;
            form.reset();
            return new Reminder(reminderDescription, reminderDate, reminderNotification);
        },
        render(tasks, mode) {
            const tasksList = document.getElementById("tasksList");
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            if (!tasksList) {
                console.error("Element with ID 'tasksList' not found.");
                return;
            }
            tasksList.style.display = "block";
            tasks.forEach((taks) => {
                const li = document.createElement("LI");
                const textNode = document.createTextNode(taks.render());
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(li);
            });
            const todoSet = document.getElementById("todoSet");
            const reminderSet = document.getElementById("reminderSet");
            if (mode === ViewMode.TODO) {
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute("style", "display: block");
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.removeAttribute("disabled");
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute("style", "display: none");
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute("disabled", "true");
            }
            else {
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute("style", "display: block");
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.removeAttribute("disabled");
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute("style", "display: none");
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute("disabled", "true");
            }
        },
    };
    const taskController = (view = taskView) => {
        var _a, _b;
        const tasks = [];
        let mode = ViewMode.TODO;
        const handleEvent = (event) => {
            event.preventDefault();
            const form = event.target;
            switch (mode) {
                case ViewMode.TODO:
                    tasks.push(view.getTodo(form));
                    break;
                case ViewMode.REMINDER:
                    tasks.push(view.getReminder(form));
                    break;
            }
            view.render(tasks, mode);
        };
        const handleToggleMode = () => {
            switch (mode) {
                case ViewMode.TODO:
                    mode = ViewMode.REMINDER;
                    break;
                case ViewMode.REMINDER:
                    mode = ViewMode.TODO;
                    break;
            }
            view.render(tasks, mode);
        };
        (_a = document
            .getElementById("toggleMode")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", handleToggleMode);
        (_b = document
            .getElementById("taskForm")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", handleEvent);
    };
    taskController(taskView);
})();
