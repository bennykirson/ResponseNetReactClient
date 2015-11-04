import React from 'react';
import ClassNames from 'classnames';

var SemanticButton = React.createClass({
  onClick(value){
    if (this.props.onClick){
      this.props.onClick(value);
    }
  },
  render() {
    var {children ,isDisabled,buttonId,...other}=this.props;
    var classes = ClassNames('ui tiny button', {disabled: isDisabled});

    return (
        <button id={buttonId} className={classes} onClick={this.onClick}>{children}
        </button>

    );
  }
});

export default SemanticButton;
