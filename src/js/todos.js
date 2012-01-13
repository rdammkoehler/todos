Todo = Backbone.Model.extend({
  defaults: {
    stuff: "win life",
    done: false
  }
});

TodoCollection = Backbone.Collection.extend({
  model: Todo
});

Todos = new TodoCollection();

AddTodoView = Backbone.View.extend({
  el : "#new-todo",
  initialize: function() {
    _.bindAll(this);
  },
  events: { 
    "keydown" : "addTodo"  
  },
  addTodo : function(e) {
    if (e.keyCode == 13) {
      var todoText = $(this.el).val();
      Todos.add({stuff: todoText});
      $(this.el).val("")
    }
  }
});

TodoListView = Backbone.View.extend({
  el: "#todo-list",
  collection: Todos,
  initialize: function() {
    _.bindAll(this);
    this.collection.bind("add", this.addOneTodo);
  },
  addOneTodo: function(todo) {
    $(this.el).append(new TodoView({model: todo}).render());
  }
});

TodoView = Backbone.View.extend({
  tagName: "li",
  template: _.template($("#item-template").html()),
  initialize: function() {
    _.bindAll(this);
    this.model.bind("change:done", this.updateDoneStatus);
  },
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this.el;
  },
  updateDoneStatus: function(todo, done) {
    $(this.el).toggleClass("done", done);
  },
  events: {
    "click .check": "markDone"
  },
  markDone: function() {
    if (this.model.get("done")) {
      this.model.set({done:false});
    } else {
      this.model.set({done:true});
    }
  }
});

AllTodos = new TodoListView();
AddTodo = new AddTodoView();

