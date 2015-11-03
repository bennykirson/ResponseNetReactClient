import React,{findDOMNode} from 'react';

var GraphInputFile = React.createClass({
  onSelect(e){
    e.preventDefault();
    var file = findDOMNode(this.refs.fileInput).files;
    console.log(file);
    if (file.length > 0) {
      this.props.onSelect(file);
    }else{
      this.props.onSelect(false);
    }
  },
  render() {
    var {children,...other}=this.props;
    return (
        <button className="ui tiny teal button file-button">{children}
          <input type="file" ref="fileInput"
                 onChange={this.onSelect}
                 className="ui file"/>
        </button>


    );
  }
});

export default GraphInputFile;
