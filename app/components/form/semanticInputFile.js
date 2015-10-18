import React,{findDOMNode} from 'react';
import ClassNames from 'classnames';

var SemanticInputFile = React.createClass({
  onSelect(e){
    e.preventDefault();
    var file = findDOMNode(this.refs.fileInput).files;
    console.log(file);
    if (file.length > 0) {
      this.props.onSelect(true);
    }else{
      this.props.onSelect(false);
    }
  },
  render() {
    var {isDisabled,isPositive,buttonId,buttonTag,...other}=this.props;
    var classes = ClassNames('ui icon file-button button', {disabled: isDisabled, positive: isPositive});

    return (
        <div className={classes} id={buttonId}>
          <i className="file outline icon"></i> {buttonTag}
          <input type="file" ref="fileInput"
                 onChange={this.onSelect}
                 className="ui file"/>
        </div>

    );
  }
});

export default SemanticInputFile;
