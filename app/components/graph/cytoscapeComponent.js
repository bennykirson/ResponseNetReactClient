import React from 'react';
import cytoscape from 'cytoscape';
import '../../jquery.qtip.min.js';
import cyqtip from 'cytoscape-qtip';
$.fn.cytoscape = cytoscape;

cyqtip(cytoscape, $);
var CytoscapeComponent = React.createClass({

      shouldComponentUpdate() {
        return false;
      },
      componentWillReceiveProps(nextProps) {
        var layout = nextProps.layout.toLowerCase();
        if (this.props.layout != layout) {
          if (layout == 'concentric') {
            var options = {
              name: 'concentric',

              fit: true, // whether to fit the viewport to the graph
              startAngle: 3 / 2 * Math.PI, // the position of the first node
              minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
              avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
              concentric: function () { // returns numeric value for each node, placing higher nodes in levels towards the centre
                return this.degree();
              },
              levelWidth: function (nodes) { // the variation of concentric values in each level
                return nodes.maxDegree() / 4;
              }
            };

            this.cy.layout(options);
          } else if (layout == 'tree') {
            //First draw the graph in a breadthfirst manner, after that draw it with backtracking
            //avoids random nodes not in the correct position.
            var breadthFirstLayout = this.cy.makeLayout({
              name: 'breadthfirst',
              fit: true, // whether to fit the viewport to the graph
              directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
              circle: false, // put depths in concentric circles if true, put depths top down if false
              avoidOverlap: true,
              ready: () => {
                var numOfNodes = (this.cy.$('node').length);
                var options = {
                  name: 'breadthfirst',
                  fit: true,
                  padding: 30,
                  directed: true,
                  circle: false,
                  avoidOverlap: true,
                  maximalAdjustments: numOfNodes
                };
                this.cy.layout(options);
              }
            });
            breadthFirstLayout.run();

          } else {
            this.cy.layout({name: layout});

          }

        }
        if (nextProps.initiateRemove) {
          this.removeNodes();
        }


      },
      removeNodes(){
        if (this.cy.$(":selected").length > 0) {
          this.cy.remove(":selected");
          var nodes = this.cy.$("node").map((element) => element._private.data);
          var edges = this.cy.$("edge").map((element) => element._private.data);
          this.props.removeNodes(nodes, edges);
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
        var nodes = this.cy.nodes(":selected").map((element) => element._private.data);
        var edges = this.cy.edges(":selected").map((element) => element._private.data);
        this.props.onChange(nodes, edges);
      }
      ,
      attachListeners()
      {
        this.attachContext();
        this.attachQtip();
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

        this.cy.on("cxttap", 'node', (evt) => {
          var node = evt.cyTarget;
          if (!node.selected()) {
            this.cy.$(":selected").unselect();
            node.select();
          }
        });

        this.cy.on("taphold", 'node', (evt)=> {
          var node = evt.cyTarget;
          //2 for edges and nodes +1 for the current node
          var numberToSelect = (node.outdegree()) * 2 + 1;

          var eventNode = node._private;
          //Gather all nodes
          var bfs = this.cy.elements().bfs('#' + eventNode.data.id, function () {
          }, true);
          var i = 0;
          var highlightNextEle = function () {
            if (i < numberToSelect) {
              bfs.path[i].select();
              i++;
              highlightNextEle();
            }
          };
          // kick off first highlight
          highlightNextEle();
        });

      },
      attachQtip(){
        this.cy.elements('node').qtip({
          content: function () {
            return "Common Name:" + this.data('commonName') + '<br /><em>' + "ENSG:" + this.data('ENSG') + '<br /><em>' + "Entrez:" + this.data('Entrez'
                ) + '</em>'

          },
          position: {
            my: 'top left'
          },
          show: {
            event: "mouseover"
          },
          hide: {
            event: "mouseout"
          },
          style: {
            classes: 'qtip-shadow',
            tip: {
              width: 16,
              height: 8
            }
          }
        });
      },
      attachContext(){
        context.init({
              preventDoubleContext: false,
              compress: true

            }
        );
        context.attach('#cytoscapeDiv', [
          {header: 'Graph options'},
          {
            text: 'Change Layout', subMenu: [
            {header: 'Layouts'},
            {
              text: 'Random', action: (e) => {
              e.preventDefault();
              this.props.changeLayout("random");
            }
            },
            {
              text: 'Grid', action: (e) => {
              e.preventDefault();
              this.props.changeLayout('grid');
            }
            },
            {
              text: 'Circle', action: (e) => {
              e.preventDefault();
              this.props.changeLayout('circle');
            }
            },
            {
              text: 'Concentric', action: (e) => {
              e.preventDefault();
              this.props.changeLayout('concentric');
            }
            },
            {
              text: 'Tree', action: (e) => {
              e.preventDefault();
              this.props.changeLayout('tree');
            }
            }
          ]
          },
          {
            text: 'New layer from selected', action: (e) => {
            e.preventDefault();
            this.props.newLayerFromSelected();
          }
          },

          {
            text: 'Get additional TFT', action: (e) => {
            e.preventDefault();
            //  additionalTFT();
          }
          },
          {
            text: 'Remove Nodes', action: (e)=> {
            event.preventDefault();
            this.removeNodes();
          }
          },
          {
            text: 'Save Session', action: (e) => {
            e.preventDefault();
            this.props.saveSession();
          }
          },
          {divider: true},

          {

            text: 'Export graph to GraphML', action: (e) => {
            e.preventDefault();
            this.props.exportToGraphML();
          }

          }

        ]);
      },

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






