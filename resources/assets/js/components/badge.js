/** badge.js */

var Badge = React.createClass({

  render: function(){
    return (
        <div>
          <h1 className="title">Testing</h1>
          <div className="card">
            <a className="waves-effect waves-light btn-large" href="#">Wave</a>
          </div>
        </div>
    );
  }
});

export default Badge;