/** Joe1.js */

import MaterialUI from '../index';

var Joe1 = React.createClass({

  render: function(){
    console.log('render was called!');
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

export default Joe1;