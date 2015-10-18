import React from 'react';
import { Link } from 'react-router';

var MenuItem = React.createClass({
  render() {
    var { item, ...other } = this.props;
    return item.href ? (
        <a href={item.href} title={item.title} className="ui item link">{item.name}</a>
    ) :

        (<Link to={`/${item.link}`} activeClassName="active" className="ui item link">
      {item.name}
    </Link>);


  }
});

export default MenuItem;
