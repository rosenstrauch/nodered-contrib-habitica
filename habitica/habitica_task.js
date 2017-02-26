var Habitica = require('habitica');
var api = new Habitica({

});

module.exports = function (RED) {
    function scoreTaskNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.userid = this.credentials.userid;
        this.apikey = this.credentials.apikey;
        this.taskid = config.taskid;

        this.on('input', function (msg) {


            api.setOptions({
                id: this.userid,
                apiToken: this.apikey
            });


            return api.post('/tasks/' + this.taskid + '/score/up').then((resolve) => {

                console.log('tried to post to '+ this.taskid);

            }).catch((err) => {
                if (err instanceof Habitica.ApiError) {
                // likely a validation error from
                // the API request
                console.log(err.message);
            } else if (err instanceof Habitica.UnknownConnectionError) {
                // either the Habitica API is down
                // or there is no internet connection
                console.log(err.originalError);
            } else {
                // there is something wrong with your integration
                // such as a syntax error or other problem
                console.log(err)
            }
        });



    });
    }

    RED.nodes.registerType("score-task", scoreTaskNode, {
        credentials: {
            userid: {type: "text"},
            apikey: {type: "password"}
        }
    });
}
