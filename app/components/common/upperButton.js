import React from 'react';

var defaultClassName = 'icon large';

var UpperButton = React.createClass({

  render() {
    var { icon, onClick, label, ...other } = this.props;
    var className = 'circular blue ui icon button';
    var iconName='icon large '+icon;
    return (
        <div {... other } className={className} onClick={onClick} title={label}>
          <i className={iconName}></i>
        </div>
    );
  }
});

export default UpperButton;
