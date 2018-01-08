var AppModel = Backbone.Model.extend({
  defaults: {
    name: 'Hello',
    surname: 'World'
  }
});

var appModel = new AppModel();

var AppView = Backbone.View.extend({
  el: '#app',
  model: appModel,
  template: _.template($('#template').html()),
  events: {
    'click #h1': 'clickHandler'
  },
  initialize: function() {
    console.log('initialize', this.model);

    this.data = this.getData();

    this.render();
  },
  render: function() {
    console.log('render');

    this.$el.html(this.template({
      data: this.data
    }));

    this.listenTo(this.model, 'change', this.changeData);

    return this
  },

  // custom methods
  getData: function() {
    console.log('getData');
    // this.render();
    return this.model.toJSON()
  },
  changeData: function() {
    console.log('changeData');
    this.data = this.getData();
    this.render();
  },
  clickHandler: function() {
    console.log('clickHandler');
    this.model.set({
      name: 'Hey',
      surname: 'John!'
    });
  }
});

var app = new AppView();
