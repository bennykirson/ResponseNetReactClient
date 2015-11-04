import $ from "jquery";
import Task from "data.task";
import R from "ramda";
import request from "superagent";

var serverHandler = "http://netbio.bgu.ac.il/respnet-cgi/CGIHandler.py";
var getXML = R.curry((method, params) => {
    return new Task((reject, result) => {
        var id = new Date();
        request
            .post(serverHandler)
            .send({
                id: id,
                method: method,
                params: R.isArrayLike(params) && params || [params]
            })
            .set("Content-Type", "application/json")
            .accept("text/json")
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    result(res);
                }
            });
    });

});

export default getXML;