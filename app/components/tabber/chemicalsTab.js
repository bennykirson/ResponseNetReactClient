import React from 'react';
import TreeView from 'react-treeview';
import QTipPopup from '../common/qtipPopup';


var ChemicalsTab = React.createClass({
      componentWillMount() {
        this.props.getChemicals();
      },
      getInitialState() {
        return {
          collapsedBookkeeping: []
        };


      },

      handleClick(i) {
        let [...collapsedBookkeeping] = this.state.collapsedBookkeeping;
        collapsedBookkeeping[i] = !collapsedBookkeeping[i];
        this.setState({collapsedBookkeeping: collapsedBookkeeping});
      },

      render() {
        var {chemicals,...other}=this.props;
        const collapsedBookkeeping = this.state.collapsedBookkeeping;

        return chemicals.length === 0 ? (
            <h4>Click a protein to get the chemicals it interacts with<QTipPopup
                content="Select a group of proteins, then the interacting chemicals will be displayed here" title=""/>
            </h4>
        ) : (

            <div>
              <h4>Click a protein to get the chemicals it interacts with<QTipPopup
                  content="Select a group of proteins, then the interacting chemicals will be displayed here" title=""/>
              </h4>

              <div className="vertical-scrollable-tab">
                {chemicals.map((node, i) => {
                  if (node.children.length === 0) {
                    return (
                        <div className="ui basic teal label" key={node.name}>{node.name} doesn't interact with a
                          chemical
                        </div>
                    )
                  } else {
                    const label =
                        <span className="node" onClick={this.handleClick.bind(null, i)}>
              {node.name}
            </span>;
                    return (
                        <TreeView
                            key={i}
                            nodeLabel={label}
                            collapsed={!collapsedBookkeeping[i]}
                            onClick={this.handleClick.bind(null, i)}>
                          {node.children.map((child, j) => {
                            var newKey = "" + i + "," + j;
                            return (
                                <div className="label"
                                     key={newKey}>{child}</div>
                            )
                          })}
                        </TreeView>
                    )
                  }
                })}
              </div>
            </div>

        )
      }
    })
    ;

export default ChemicalsTab;
