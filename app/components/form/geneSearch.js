import React from 'react';
import Search from 'semantic-ui-search';
import SemanticUiApi from 'semantic-ui-api';

$.fn.search = Search;
$.fn.api = SemanticUiApi;

var GeneSearch = React.createClass({

  changeResponseToSemanticJSON(results) {
    if (results != "undefined") {
      for (var i = 0; i < results.hits.length; i++) {
        results.hits[i]['title'] = results.hits[i]['symbol'];
        results.hits[i]['description'] = results.hits[i]['name'];
      }
    }
    var newResults = {};
    newResults["results"] = results.hits;

    return newResults;
  },
  componentDidUpdate() {
    $(React.findDOMNode(this)).search('refresh');
  },

  componentDidMount() {

    var element = React.findDOMNode(this);

    $(element)
        .search({
          minCharacters: 2,
          apiSettings: {

            url: "http://mygene.info/v2/query/?q=" +
            "symbol:{query} OR symbol: {query}* OR name:{query}* OR alias: {query}* OR summary:{query}* OR {query}*" +
            "&species=4932,559292,9606&fields=name,symbol,taxid,entrezgene,type_of_gene&limit=20",
            onResponse: (response) => {
              return this.changeResponseToSemanticJSON(response);

            }
          },
          onSelect: (value) => {
            this.props.onChange(value.symbol);
            $(element).search('set value', '');

          }
        }
    );
  },

  render() {
    var { defaultText, id, ...other } = this.props;
    return (
        <div id={id} className="ui scrolling search">
          <div className="ui icon input">
            <input className="prompt" type="text" placeholder={defaultText}/>
            <i className="search icon"></i>
          </div>
          <div className="results"></div>
        </div>
    );
  }
});

export default GeneSearch;

