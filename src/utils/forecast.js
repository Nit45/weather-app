const request=require('postman-request')
const forecast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=ac06d4eeb2321ca8de5bf83950d5a647&query=${latitude},${longitude}`
    request({url:url,json:true},(error,response)=>{
     
      if(error){
            callback("unable to find wheather stack api",undefined);}
      else if(response.body.error){
            callback(response.body.error.info,undefined);
      }
      else{
   
          callback(undefined,`.it is currentely ${encodeURIComponent(response.body.current.temperature)} degrees out .it feels like ${encodeURIComponent(response.body.current.feelslike)}degrees out`);
   }
       
}
   
   )
   }
   module.exports={
    'forecast':forecast
}
   