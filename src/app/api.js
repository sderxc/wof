var wordApi = wordApi || {};

wordApi = function(game) {
    var _this = this;
    var CLIENT_KEY = '8K2rxSUn7xtU21j2pnxp';
    var sid = '';
    return {
        init: function() {

        },
        prepareSig: function(params) {
            var str = '';
            for (var key in params) {
                str+= key+params[key];
            }
            str+=CLIENT_KEY+sid;

            params.sig = md5(str);
            return params;
        },
        updateSid: function(answer){
            //TODO добавить обработку __new_sid
            if (answer.__sid) {
                sid = answer.__sid;
            }
        },
        send: function(params, successCb, errorCb) {
            var self = this;
            params.data = this.prepareSig(params.data);
            $.post(params.url, params.data, function(data){
                if (data.data) {
                    successCb(data.data);
                    self.updateSid(data);
                } else {
                    errorCb(data);
                }
            });
        }
    };
};