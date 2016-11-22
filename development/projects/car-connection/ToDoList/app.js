function TodosController() {
    this.estimates = [0, 1, 2, 3, 5, 8];

    this.todos = [{
        name: "Learn angular",
        estimate: 8,
        done: true},
    {
        name: "Install java",
        estimate: 2,
        done: false},
    {
        name: 'Uninstall ruby',
        estimate: 3,
        done: false}];
}

TodosController.prototype = {
    addTodo: function() {
        if (this.todoName === "") {
            return false;
        }

        this.todos.push({
            name: this.todoName,
            estimate: this.todoEstimate,
            done: false
        });

        this.todoName = '';
        this.todoEstimate = 0;
    }
};

function TodoEditorController() {
    this.editorEnabled = false;
}

TodoEditorController.prototype = {
    enableEditor: function() {
        this.editorEnabled = true;

        this.todoName = this.todo.name;
        this.todoEstimate = this.todo.estimate;
    },

    disableEditor: function() {
        this.editorEnabled = false;
    },

    save: function() {
        if (this.todoName === "") {
            return false;
        }

        this.todo.name = this.todoName;
        this.todo.estimate = this.todoEstimate;

        this.disableEditor();
    }
};