const request=require('postman-request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoibml0ZXNoMTIzNDUiLCJhIjoiY2tiMzF2NWd2MDFyYTJzbzJtNmpnZnRsOCJ9.31_hCyUzwxipuyGChY6pVg&limit=1'

    request({url:url,json:true},(error,response)=>{

        if(error){
            callback("unable to find data",undefined);
        }
        else if(response.body.features.length==0){
            callback("no data find in the request",undefined)
        }
        else{
            const coordinate={
                latitude:response.body.features[0].geometry.coordinates[1],
                longitude:response.body.features[0].geometry.coordinates[0],
                place_discription:response.body.features[0].place_name
            }
            callback(undefined,coordinate)

        }

    })

}
module.exports={
    'geocode':geocode
}