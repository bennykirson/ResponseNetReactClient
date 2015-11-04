import React from 'react';
import MenuItem from './menuItem';
import InjectionText from '../common/injectionText'

var MenuWrapper = React.createClass({
  render() {
    var { items ,injectionText} = this.props;
    var content = items.map((item, i) => <MenuItem key={ i } item={ item } />);
    return (
        <div className="ui vertical menu">
          <div className="header item">
            <h1 className="ui header">Welcome</h1>
            <InjectionText >
             {injectionText}
            </InjectionText>
          </div>
          { content }
        </div>
    );
  }
});

export default MenuWrapper;
