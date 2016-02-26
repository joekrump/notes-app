let React = require('react');
let ReactDOM = require('react-dom');
import {Entity} from 'draft-js';
class MediaComponent extends React.Component {
  render() {
    const {block, foo} = this.props;
    const data = Entity.get(block.getEntityAt(0)).getData();
    // Return a <figure> or some other content using this data.
  }
}