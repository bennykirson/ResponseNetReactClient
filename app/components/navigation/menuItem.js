import React from 'react';
import { Link } from 'react-router';

var MenuItem = React.createClass({
  render() {
    var { item, ...other } = this.props;
    return item.href ? (
        //Link Out of the page
        <a href={item.href} rel="external" title={item.title} className="ui item link">{item.name}</a>
    ) :
      //ChangeContent
        (<Link to={`/${item.link}`} activeClassName="active" className="ui item link">
      {item.name}
    </Link>);


  }
});

export default MenuItem;
