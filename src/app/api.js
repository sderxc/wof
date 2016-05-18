var wordApi = wordApi || {};

wordApi = function(game) {
    var _this = this,
        CLIENT_KEY = '8K2rxSUn7xtU21j2pnxp',
        sid = '',
        viewer_id = '12',
        viewer_platform = 0;


    return {
        init: function() {

        },
        prepareData: function(params) {
            var self = this;
            params.viewer_id = viewer_id;
            params.viewer_platform = viewer_platform;
            params.name = 'sderxc';
            function ksort(w) {
                var sArr = [], tArr = [], n = 0;

                for (i in w){
                    tArr[n++] = i;
                }

                tArr = tArr.sort();
                for (var i=0, n = tArr.length; i<n; i++) {
                    sArr[tArr[i]] = w[tArr[i]];
                }
                return sArr;
            }
            //console.log(ksort(params));
            //return self.prepareSig(params);
            return self.prepareSig(ksort(params));
        },
        prepareSig: function(params) {
            var str = viewer_id;
            for (var key in params) {
                str+= key+'='+params[key];
            }
            str+=CLIENT_KEY+sid;
            console.log(str);

            params.sig = md5(str);
            return params;
        },
        updateSid: function(answer){
            //TODO __new_sid
            if (answer.__sid) {
                sid = answer.__sid;
            }
        },
        send: function(params, successCb, errorCb) {
            var self = this;
            params.data = self.prepareData(params.data);
            console.log(params.data);
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