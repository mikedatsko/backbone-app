
var app = app || {};

(function () {
  'use strict';

  app.Todo = Backbone.Model.extend({
    defaults: {
      title: '',
      checked: false
    },
    toggle: function () {
      this.save({
        checked: !this.get('checked')
      });
    }
  });
})();

(function () {
  'use strict';

  var Todos = Backbone.Collection.extend({
    model: app.Todo,
    localStorage: new Backbone.LocalStorage('todos-backbone'),
    completed: function () {
      return this.where({completed: true});
    },
    remaining: function () {
      return this.where({completed: false});
    },
    nextOrder: function () {
      return this.length ? this.last().get('order') + 1 : 1;
    },
    comparator: 'order'
  });

  app.todos = new Todos();
})();

(function ($) {
  'use strict';

  app.AddView = Backbone.View.extend({
    el: '#todo_add',
    template: _.template($('#template-add').html()),
    events: {
      'keypress .new-todo': 'addTodo',
      'click #add_todo': 'addTodo'
    },

    initialize: function () {
      console.log('initialize', app.todos);
      this.render();
      return this;
    },

    render: function () {
      console.log('render');
      this.$el.html(this.template());
      return this;
    },

    addTodo: function() {
      console.log('addTodo', this.$el.find('#todo_input'));
      var $input = this.$el.find('#todo_input');
      app.todos.create({
        title: $input.val(),
        checked: false
      });
      $input.val('');
    }
  });
})(jQuery);

(function ($) {
  'use strict';

  app.ListView = Backbone.View.extend({
    el: '#todo_items',
    template: _.template($('#template-list').html()),
    initialize: function () {
      console.log('initialize', app.todos);

      this.listenTo(app.todos, 'add', this.addTodo);

      app.todos.fetch({reset: true});
      this.render();
      return this;
    },

    render: function () {
      console.log('render', app.todos.toJSON());
      this.$el.html(this.template({
        todos: app.todos.toJSON()
      }));
      return this;
    },

    addTodo: function (todo) {
      console.log('addTodo', todo);
      this.render();
    }
  });
})(jQuery);

(function ($) {
  'use strict';

  app.AppView = Backbone.View.extend({
    el: '#app',
    initialize: function () {
      console.log('initialize');
      this.render();
      return this;
    },

    render: function () {
      console.log('render');
      this.addView = new app.AddView();
      this.listView = new app.ListView();

      this.$el.append(this.addView.render().$el);
      this.$el.append(this.listView.render().$el);
      return this;
    }
  });
})(jQuery);

$(function () {
  'use strict';
  console.log('app:', app);
  new app.AppView();
});