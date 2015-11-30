import React from 'react';
import TreeView from 'react-treeview';
import QTipPopup from '../common/qtipPopup';

const LINK = "http://amigo.geneontology.org/cgi-bin/amigo/term-details.cgi?term=";
var GeneOntologyTab = React.createClass({
      componentWillMount() {

        this.props.getGO();

      },
   componentWillReceiveProps(nextProps){
     this.setState({
       collapsedBookkeeping: []
     });
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
            <div>
              <h4>Click a protein to get its gene ontology annotation<QTipPopup
                  content="Select a group of proteins and the GO annotations will be displayed here" title=""/>
              </h4>

              <div className="vertical-scrollable-tab">
                {GO.map((node, i)=> {
                  var mainCounter=i*5;
                  var helperCounter=1;
                  var counter=mainCounter+helperCounter;

                  const label =
                      <span className="node" onClick={this.handleClick.bind(null, counter)}>
              {node.name}
            </span>;
                  return (
                      <TreeView
                          key={counter}
                          nodeLabel={label}
                          collapsed={!collapsedBookkeeping[counter]}
                          onClick={this.handleClick.bind(null, counter)}>
                        {node.children.map((child, j) => {
                          helperCounter++;
                          var counter=mainCounter+helperCounter;
                          if (child.id === "Description") {
                            const childLabel = <span className="node"
                                                     onClick={this.handleClick.bind(null,counter)}>{child.id}</span>;
                            return (
                                <TreeView
                                    key={counter}
                                    nodeLabel={childLabel}
                                    collapsed={!collapsedBookkeeping[counter]}
                                    onClick={this.handleClick.bind(null, counter)}>
                                  <div className="label"
                                       key={counter}>{child.value}</div>
                                </TreeView>
                            )
                          } else {
                            const childLabel = <span className="node"
                                                     onClick={this.handleClick.bind(null,counter)}>{child.id}</span>;

                            return (
                                <TreeView
                                    key={counter}
                                    nodeLabel={childLabel}
                                    collapsed={!collapsedBookkeeping[counter]}
                                    onClick={this.handleClick.bind(null, counter)}>
                                  {child.value.map((dataSet, k)=> {
                                    var hrefLink = LINK + (dataSet.link).split(':')[1];
                                    var text="- "+dataSet.text;
                                    return (<div className="label"
                                                 key={k}>
                                      <a href={hrefLink} target="_blank">{dataSet.link}</a>
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
            </div>
        )
      }
    })
    ;

export default GeneOntologyTab;