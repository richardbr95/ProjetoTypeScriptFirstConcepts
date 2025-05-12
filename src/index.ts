(() => {
  const todo = {
    description: "todo",
    done: false,
  };

  const reminder = {
    description: "reminder",
    date: "15.12.2019",
  };
  interface TaskView {
    render(tasks: Array<Object>): void;
  }

  const taskView: TaskView = {
    render(tasks: Array<Object>) {
      const tasksList = document.getElementById("tasksList");
      while (tasksList?.firstChild) {
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
        tasksList?.appendChild(li);
      });
    },
  };

  const taskController = (view: TaskView = taskView) => {
    const tasks: Array<Object> = [todo, reminder];

    const handleEvent = (event: Event) => {
      event.preventDefault();
      view.render(tasks);
    };

    document
      .getElementById("taskForm")
      ?.addEventListener("submit", handleEvent);
  };

  taskController(taskView);
})();
