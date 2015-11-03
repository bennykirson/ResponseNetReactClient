import $ from "jquery";
import {mapObjIndexed} from 'ramda';
/**
 * (when loading a session from server, this is a list of all sessions)
 * @param sessionXML XML representing the sessions names and stuff
 * @returns array of session names
 */
function getSessionsFromXML(sessionXML) {
  var ans = [];
  var sessions = $(sessionXML).find("Sessions");
  $(sessions[0]).find("Session").each(function () {
    var session = {};
    $(this).find("Name").each(function () {
      session.name = this.textContent;
    });		//Job Name
    $(this).find("Email").each(function () {
      session.email = this.textContent;
    });		//Username
    $(this).find("ID").each(function () {
      session.id = this.textContent;
    });			//GUID
    ans.push(session);
  });
  return ans;
}

function getXMLFromString(formattedGraphMLString) {
  try {
    var xmlDocument;
    if (window.DOMParser) {
      var parser = new DOMParser();
      xmlDocument = parser.parseFromString(formattedGraphMLString, "text/xml");
    }
    else // Internet Explorer
    {
      xmlDocument = new ActiveXObject("Microsoft.XMLDOM");
      xmlDocument.async = "false";
      xmlDocument.loadXML(formattedGraphMLString);
    }
  }
  catch (error) {
    alert(error.toString());
  }
  return xmlDocument;
}

function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getJSONFromGraphML(formattedGraphMLString) {
  console.log(formattedGraphMLString);

  var elesJson = {nodes: [], edges: []};
  var dataSchema = {nodes: [], edges: []};

//Building the dataScheme of the graph mapping keys with attributes to nodes or edges
  $(formattedGraphMLString).find("key").each(function () {
    var key = {};
    key.name = $(this).attr("attr.name");
    key.type = $(this).attr("attr.type");
    $(this).attr("for") === "nodes" ? dataSchema.nodes.push(key) : dataSchema.edges.push(key);
  });
  $(formattedGraphMLString).find("node").each(function () {
    var key = {data: {id: $(this).attr("id")}};

    $(this).find("data").each(function () {
      var attrName = $(this).attr("key");
      key.data[attrName] = $(this).text();
    });
    elesJson.nodes.push(key);
  });
  $(formattedGraphMLString).find("edge").each(function () {
    var key = {data: {source: $(this).attr("source"), target: $(this).attr("target")}};
    var data = $(this).find("data").each(function () {
      var attrName = $(this).attr("key");
      key.data[attrName] = $(this).text();
    });
    elesJson.edges.push(key);
  });
  console.log("Schema");
  console.log(dataSchema);
  console.log("data");
  console.log(elesJson);

  return {schema: dataSchema, elements: elesJson};

}
function getFilesFromXML(xml) {
  var files = [];

  $(xml).find("property").each(function () {
    var key = {
      links: {link: "netbio.bgu.ac.il" + $(this).attr("value"), value: $(this).attr("id")}
    };
    files.push(key);

  });
  for (var i = 0; i < files.length; i++) {
    var name = files[i].links.value;
    switch (name) {
      case "target.txt":
      {
        files[i].contents = {link: "", value: "The target-set file"};
        break;
      }
      case "source.txt":
      {
        files[i].contents = {link: "", value: "The source-set file"};
        break;
      }
      case "cytoscapeEdges.csv":
      {
        files[i].contents = {
          link: "",
          value: "This files contains the number of times nodes came up in randomization runs"
        };
        break;
      }
      case "nodes.txt":
      {
        files[i].contents = {link: "", value: "This file contains all the edges in csv format"};
        break;
      }
      case "nodesData.csv":
      {
        files[i].contents = {
          link: "",
          value: "This file contains a list of the nodes selected to be in source/target set in the renomination's"
        };
        break;
      }
      default:
      {
        files[i].contents = {
          link: "",
          value: ""
        };
        break;
      }
    }
  }
  return files;

}
function getSummaryFromXML(xml) {
  var summary = [];
  $(xml).find("property").each(function () {
    var key = {property: {link: "", value: $(this).attr("id")}, valueColumn: {link: "", value: $(this).attr("value")}};
    summary.push(key);
  });
  return summary;

}
function getChemicalsFromXML(xml) {
  console.log("inside getChemicalsFromXML");
  console.log(xml);
  var data = [];
  $(xml).find("node").each(function () {
    var key = {id: $(this).attr("id")};
    var children = [];
    $(this).find("stitch").each(function () {
      children.push($(this).text());
    });
    key["children"] = children;
    data.push(key);
  });
  return data;

}
function getGraphMLFromData(schema, elements) {
  var ans = "<graph>";
  schema.nodes.map((node) => {
    node = "<key for=\"nodes\" id=\"" + node.name + "\" attr.name=\"" + node.name + "\" attr.type=\"" + node.type + "\" ></key>";
    ans = ans + node;
  });
  schema.edges.map((edge) => {
    edge = "<key for=\"edges\" id=\"" + edge.name + "\" attr.name=\"" + edge.name + "\" attr.type=\"" + edge.type + "\" ></key>";
    ans = ans + edge;
  });
  elements.nodes.map((obj)=> {
    var node = obj.data;
    var xmlNode = "<node id=\"" + node.id + "\">";
    for (var key in node) {
      if (key !== "id") {
        if (node.hasOwnProperty(key)) {
          xmlNode = xmlNode + "<data key=\"" + key + "\">" + node[key] + "</data>";
        }
      }
    }
    xmlNode = xmlNode + "</node>";
    ans = ans + xmlNode;
  });
  elements.edges.map((obj)=> {
    var edge = obj.data;
    var xmlEdge = "<edge source=\"" + edge.source + "\" target=\"" + edge.target + "\">";
    for (var key in edge) {
      if (key !== "source" && key !== "target") {
        if (edge.hasOwnProperty(key)) {
          xmlEdge = xmlEdge + "<data key=\"" + key + "\">" + edge[key] + "</data>";
        }
      }
    }
    xmlEdge = xmlEdge + "</edge>";
    ans = ans + xmlEdge;
  });
  ans = ans + "</graph></graphml>";
  return ans;
}
function getGeneOntologyFromXML(xml) {
  console.log("inside GO function");
  console.log(xml);

  var data = [];
  $(xml).find("node").each(function () {
    var key = {name: $(this).attr("id")};
    var children = [];
    $(this).find("set").each(function () {
      var setName = $(this).attr("name");
      var setKey = {};
      var innderData = [];
      switch (setName) {
        case "Description":
        {
          $(this).find("go").each(function () {
            setKey["id"] = setName;
            setKey["value"] = $(this).text();
          });
          break;
        }
        case "Biological Process":
        {
          setKey["id"] = setName;
          $(this).find("go").each(function () {
            innderData.push({link: $(this).attr("id"), text: $(this).text()});
          });
          setKey["value"] = innderData;
          break;
        }
        case "Cellular Component":
        {
          setKey["id"] = setName;
          $(this).find("go").each(function () {
            innderData.push({link: $(this).attr("id"), text: $(this).text()});
          });
          setKey["value"] = innderData;
          break;
        }
        case "Mulecular Function":
        {
          setKey["id"] = setName;

          $(this).find("go").each(function () {
            innderData.push({link: $(this).attr("id"), text: $(this).text()});
          });
          setKey["value"] = innderData;
          break;
        }
        default:
        {
          console.log("default in getGeneOntologyFromXML case");
        }

      }
      children.push(setKey);
    });
    key["children"] = children;
    data.push(key);


  });
  console.log(data);
  return data;
}


export default {

  generateGUID: generateGUID,
  getGeneOntologyFromXML: getGeneOntologyFromXML,
  getGraphMLFromData: getGraphMLFromData,
  getChemicalsFromXML: getChemicalsFromXML,
  getSummaryFromXML: getSummaryFromXML,
  getFilesFromXML: getFilesFromXML,
  getJSONFromGraphML: getJSONFromGraphML,
  getXMLFromString: getXMLFromString,
  getSessionsFromXML: getSessionsFromXML
}