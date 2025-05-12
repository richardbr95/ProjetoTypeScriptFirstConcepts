"use strict";
(() => {
    const todo = {
        description: "todo",
        done: false,
    };
    const reminder = {
        description: "reminder",
        date: "15.12.2019",
    };
    const taskView = {
        render(tasks) {
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
                const textNode = document.createTextNode(JSON.stringify(taks));
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(li);
            });
        },
    };
    const taskController = (view = taskView) => {
        var _a;
        const tasks = [todo, reminder];
        const handleEvent = (event) => {
            event.preventDefault();
            view.render(tasks);
        };
        (_a = document
            .getElementById("taskForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", handleEvent);
    };
    taskController(taskView);
})();
