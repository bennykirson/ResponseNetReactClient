import React,{findDOMNode} from 'react';
import ClassNames from 'classnames';

var SemanticInputFile = React.createClass({
  onSelect(e){
    e.preventDefault();
    var file = findDOMNode(this.refs.fileInput).files;
    console.log(file);
    if (file.length > 0) {
      this.props.onSelect(file);
    } else {
      this.props.onSelect(false);
    }
  },
  render() {
    var {isDisabled,isPositive,buttonId,buttonTag,fileName,location,...other}=this.props;
    var classes = ClassNames('ui icon file-button button', {disabled: isDisabled, positive: isPositive});
    return (
        <div className={classes} id={buttonId}>
          <i className="file outline icon"/> {buttonTag}
          <input type="file" ref="fileInput"
                 onChange={this.onSelect}
                 className="ui file"/>
          {fileName && <div className="ui label">{fileName}</div> }

        </div>

    );
  }
});

export default SemanticInputFile;
