var Project = React.createClass({
  getDefaultProps: function() {
    return {
      src: ''
    }
  },
  render: function() {
    return (
      <div>
        <h1 className="title">A Project</h1>
      </div>
    );
  }
});
var TogglProjectList = React.createClass({
  getDefaultProps: function() {
    return {
      src: ''
    }
  },
  render: function() {
    return (
      <div>
        <h1 className="title">Some Toggl data will go here</h1>
      </div>
    );
  }
});

React.render(<TogglProjectList />, document.body);
//# sourceMappingURL=components.js.map