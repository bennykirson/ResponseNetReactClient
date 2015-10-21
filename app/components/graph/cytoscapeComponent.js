import React from 'react';
import cytoscape from 'cytoscape';
$.fn.cytoscape = cytoscape;

var CytoscapeComponent = React.createClass({

      shouldComponentUpdate() {
        return false;
      },
      componentWillReceiveProps(nextProps) {
        var currentProp1 = this.props.prop1;
        var nextProp1 = nextProps.prop1;
        if (currentProp1 != nextProp1) {
          this.cytoscapeInstance.doSomething();
        }
      },
      componentDidMount() {
        var element = React.findDOMNode(this);
        var styling = [
          {
            selector: 'node',
            style: {
              content: 'data(commonName)',
              'text-valign': 'center',
              'text-outline-width': 1.5,
              'text-outline-color': 'black',
              'font-size': '10',
              // 'background-color': 'red',
              'color': '#fff',
              'border-width': '2px',
              'border-style': 'solid',
              'border-color': 'black'
            }
          },
          {
            selector: 'node[color="0"]',
            style: {
              'background-color': '#E6E6E6',
              'shape': 'rectangle'
            }
          },
          {
            selector: 'node[color="1"]',
            style: {
              'background-color': '#FE9A2E',
              'shape': 'roundrectangle'
            }
          },
          {
            selector: 'node[color="2"]',
            style: {
              'background-color': '#2E9AFE',
              'shape': 'ellipse'
            }
          },
          {
            selector: 'node[color="3"]',
            style: {
              'background-color': '#C2EB95',
              'shape': 'pentagon'
            }
          },
          {
            selector: 'node[color="4"]',
            style: {
              'background-color': '#C2EB95',
              'shape': 'triangle'
            }
          },
          {
            selector: 'node[color="5"]',
            style: {
              'background-color': '#9999999',
              'shape': 'hexagon',
              'color': 'red'
            }
          }, {
            selector: 'node[color="6"]',
            style: {
              'background-color': '#00AEEF',
              'shape': 'heptagon'
            }
          }, {
            selector: 'node[color="7"]',
            style: {
              'background-color': '#C2EB95',
              'shape': 'octagon'
            }
          }, {
            selector: 'node[color="8"]',
            style: {
              'background-color': '#C2EB95',
              'shape': 'star'
            }
          },
          {
            selector: 'edge',
            style: {
              'opacity': 0.666,
              'width': '0.9px',
              'target-arrow-shape': 'triangle',
              'line-color': 'black',
              'target-arrow-color': 'black'
            }

          },
          {
            selector: ':selected',
            style: {
              "overlay-color": "yellow",
              "overlay-padding": 2.5,
              "overlay-opacity": 0.3
            }
          }

        ];


        this.cy = cytoscape({
          container: element,
          elements: this.props.data,
          ready: function () {
          },
          layout: {
            name: 'breadthfirst',
            fit: true, // whether to fit the viewport to the graph
            directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
            circle: false, // put depths in concentric circles if true, put depths top down if false
            avoidOverlap: true, // prevents nœode overlap, may overflow boundingBox if not enough space
            maximalAdjustments: 0 // how many times to try to position the nodes in a maximal way (i.e. no backtracking)

          },

          //initial view point state
          zoom: 1,
          pan: {x: 0, y: 0},
          // interaction options
          minZoom: 1e-50,
          maxZoom: 1e50,
          zoomingEnabled: true,
          userZoomingEnabled: true,
          panningEnabled: true,

          userPanningEnabled: true,
          boxSelectionEnabled: true, // Create a box and select multiple nodes/edges
          //rendering options
          styleEnabled: true,
          motionBlur: false,
          style: styling

        });

        this.attachListeners();


      },
      onChangeSelection()
      {
        this.props.onChange(this.cy.$(":selected"));
      }
      ,
      attachListeners()
      {
        //Batch all selected elements into 1 event
        var selectTimeout;
        this.cy.on('select', () => {
          clearTimeout(selectTimeout);
          selectTimeout = setTimeout(() => {
            this.onChangeSelection();
          }, 100);
        });

        //Batch all unselected elements into 1 event
        var unSelectTimeout;

        this.cy.on('unselect', () => {
          clearTimeout(unSelectTimeout);
          unSelectTimeout = setTimeout(()=> {
            this.onChangeSelection();
          }, 100);
        });

      }
      ,

      render()
      {
        var {data,...other}=this.props;
        return (
            <div id="cytoscapeDiv"/>
        );
      }
    })
    ;


export default CytoscapeComponent;






