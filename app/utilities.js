import $ from "jquery";
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

function getJSONFromGraphML(formattedGraphMLString) {
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

  return elesJson;

}
function getFilesFromXML(xml) {
  var files = [];
  $(xml).find("property").each(function () {
    var key = {links: {link: "netbio.bgu.ac.il" + $(this).attr("value"), value: $(this).attr("id")}};
    files.push(key);
  });
  files[0].contents = {link: "", value: "The target-set file"};
  files[1].contents = {link: "", value: "The source-set file"};
  files[2].contents = {link: "", value: "This files contains the number of times nodes came up in randomization runs"};
  files[3].contents = {link: "", value: "This file contains all the edges in csv format"};
  files[4].contents = {
    links: "",
    value: "This file contains a list of the nodes selected to be in source/target set in the renomination's"
  };
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
function getChemicalsFromXML(xml){

}
export default {
  getChemicalsFromXML:getChemicalsFromXML,
  getSummaryFromXML: getSummaryFromXML,
  getFilesFromXML: getFilesFromXML,
  getJSONFromGraphML: getJSONFromGraphML,
  getXMLFromString: getXMLFromString,
  getSessionsFromXML: getSessionsFromXML
}