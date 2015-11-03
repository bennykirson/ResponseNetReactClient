import React from 'react';
import LayersRow from '../table/layersRow';

var LayersTab = React.createClass({
  handleFilterChange(e){
    var target=e.target.value;
    this.props.handleFilterChange(target);

  },
  render() {
    var {layers,...other}=this.props;
    console.log(layers);

    var content=[];
    for (var key in layers) {
      var currentRow= <LayersRow name={key}/>;
        content.push(currentRow);
    }

      return (
        <div>
          <table className="ui celled striped selectable table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Nodes</th>
              <th>Edges</th>
            </tr>
            </thead>
            <tbody>
            {content}
            

            </tbody>
          </table>


          <div className="grouped fields" onChange={this.handleFilterChange}>
            <label>Filter By</label>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" value="symmetric"name="example2"/>
                <label>Show Symmetric Difference</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" value="intersection" name="example2"/>
                <label>Show Intersection</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" value="union"name="example2" defaultChecked="checked"/>
                <label>Show Union</label>
              </div>
            </div>
          </div>
        </div>
    );
  }
});

export default LayersTab;
