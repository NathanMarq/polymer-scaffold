
var titleContent = {title: "HEY THERE",
                    subtitle: "welcome to your premade app!"};

module.exports.getData = function(encodedParamsObject, callback){

    var paramsObject = decodeURI(encodedParamsObject);

    if(paramsObject == "header"){
        callback(titleContent);
    }
    else{
        callback(null);
    }
};
