/*
* İki adet status durumu bulunmakta bunlar success ve error durumlarıdır.
* */
module.exports = function (){
    return `
    function success(data){
        return {
            message:"success",
            data:data
        }   ;
    }
    function error(data,code,msg){
        return {
            message:msg,
            code:code,
            data:data
        };
    }
    `;
}