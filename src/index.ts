(() => {
  enum NotificationPlataform {
    SMS = "SMS",
    EMAIL = "EMAIL",
    PUSH_NOTIFICATION = "PUSH_NOTIFICATION",
  }

  enum ViewMode {
    TODO = "TODO",
    REMINDER = "REMINDER",
  }

  const UUID = (): string => {
    return Math.random().toString(32).substring(2, 9);
  };

  const DateUtils = {
    tomorrow(): Date {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    },
    today(): Date {
      return new Date();
    },

    formatDate(date: Date): string {
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    },
  };
  interface Task {
    id: string;
    dateCreated: Date;
    dateUpdated: Date;
    description: string;
    render(): string;
  }
  class Todo implements Task {
    id: string = UUID();
    dateCreated: Date = DateUtils.today();
    dateUpdated: Date = DateUtils.today();
    description: string = "";

    done: boolean = false;

    constructor(description: string) {
      this.description = description;
    }

    render(): string {
      return `
      ---> Todo <---
      description: ${this.description}
      done: ${this.done}
      
      `;
    }
  }

  class Reminder implements Task {
    id: string = UUID();
    dateCreated: Date = DateUtils.today();
    dateUpdated: Date = DateUtils.today();
    description: string = "";

    date: Date = DateUtils.tomorrow();
    notification: Array<NotificationPlataform> = [NotificationPlataform.EMAIL];

    constructor(
      description: string,
      date: Date,
      notification: Array<NotificationPlataform>
    ) {
      this.description = description;
      this.date = date;
      this.notification = notification;
    }

    render(): string {
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
    getTodo(form: HTMLFormElement): Todo {
      const todoDescription = form.todoDescription.value;
      form.reset();
      return new Todo(todoDescription);
    },
    getReminder(form: HTMLFormElement): Reminder {
      const reminderNotification = [
        form.notifications.value as NotificationPlataform,
      ];
      const reminderDate = new Date(form.reminderDate.value);
      const reminderDescription = form.reminderDescription.value;
      form.reset();
      return new Reminder(
        reminderDescription,
        reminderDate,
        reminderNotification
      );
    },
    render(tasks: Array<Task>, mode: ViewMode) {
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
        const textNode = document.createTextNode(taks.render());
        li.appendChild(textNode);
        tasksList?.appendChild(li);
      });

      const todoSet = document.getElementById("todoSet");
      const reminderSet = document.getElementById("reminderSet");

      if (mode === ViewMode.TODO) {
        todoSet?.setAttribute("style", "display: block");
        todoSet?.removeAttribute("disabled");
        reminderSet?.setAttribute("style", "display: none");
        reminderSet?.setAttribute("disabled", "true");
      } else {
        reminderSet?.setAttribute("style", "display: block");
        reminderSet?.removeAttribute("disabled");
        todoSet?.setAttribute("style", "display: none");
        todoSet?.setAttribute("disabled", "true");
      }
    },
  };

  const taskController = (view = taskView) => {
    const tasks: Array<Task> = [];
    let mode: ViewMode = ViewMode.TODO;

    const handleEvent = (event: Event) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      switch (mode as ViewMode) {
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
      switch (mode as ViewMode) {
        case ViewMode.TODO:
          mode = ViewMode.REMINDER;
          break;
        case ViewMode.REMINDER:
          mode = ViewMode.TODO;
          break;
      }
      view.render(tasks, mode);
    };

    document
      .getElementById("toggleMode")
      ?.addEventListener("click", handleToggleMode);

    document
      .getElementById("taskForm")
      ?.addEventListener("submit", handleEvent);
  };

  taskController(taskView);
})();
