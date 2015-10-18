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

export default {
    getXMLFromString: getXMLFromString,
    getSessionsFromXML: getSessionsFromXML
}