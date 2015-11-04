import React from 'react';
import TreeView from 'react-treeview';
import QTipPopup from '../common/qtipPopup';

const LINK = "http://amigo.geneontology.org/cgi-bin/amigo/term-details.cgi?term=";
var GeneOntologyTab = React.createClass({
      componentWillMount() {
        this.props.getGO();
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
        var {GO,...other}=this.props;
        const collapsedBookkeeping = this.state.collapsedBookkeeping;

        return GO.length === 0 ? (
            <div>
              <h4>Click a protein to get its gene ontology annotation<QTipPopup
                  content="Select a group of proteins and the GO annotations will be displayed here" title=""/>
              </h4>
            </div>
        ) : (
            <aiv>
              <h4>Click a protein to get its gene ontology annotation<QTipPopup
                  content="Select a group of proteins and the GO annotations will be displayed here" title=""/>
              </h4>

              <div className="vertical-scrollable-tab">
                {GO.map((node, i)=> {
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
                          if (child.id === "Description") {
                            const childLabel = <span className="node"
                                                     onClick={this.handleClick.bind(null,j)}>{child.id}</span>;
                            return (
                                <TreeView
                                    key={j}
                                    nodeLabel={childLabel}
                                    collapsed={!collapsedBookkeeping[j]}
                                    onClick={this.handleClick.bind(null, j)}>
                                  <div className="label"
                                       key={j}>{child.value}</div>
                                </TreeView>
                            )
                          } else {
                            const childLabel = <span className="node"
                                                     onClick={this.handleClick.bind(null,j)}>{child.id}</span>;

                            return (
                                <TreeView
                                    key={j}
                                    nodeLabel={childLabel}
                                    collapsed={!collapsedBookkeeping[j]}
                                    onClick={this.handleClick.bind(null, j)}>
                                  {child.value.map((dataSet, k)=> {
                                    var hrefLink = LINK + (dataSet.link).split(':')[1];
                                    var text="- "+dataSet.text;
                                    return (<div className="label"
                                                 key={k}>
                                      <a href={hrefLink}>{dataSet.link}</a>
                                      {text}</div>)
                                  })}
                                </TreeView>
                            )
                          }

                        })}
                      </TreeView>
                  )
                })}
              </div>
            </aiv>
        )
      }
    })
    ;

export default GeneOntologyTab;

/**

 for later !!!!!

 !!!!!!!!!!!!!!!!


 !!!!!!!!!!!!!!
 !!!!!!!!!!!!!!
 **/