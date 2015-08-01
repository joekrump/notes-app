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