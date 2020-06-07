const express=require('express')
const path=require('path')
const hbs=require('hbs')
const app=express()


const forecastFile=require('../src/utils/forecast')
const geocodeFile=require('../src/utils/geocode')

const publicDirPath=path.join(__dirname,"../public")
app.use(express.static(publicDirPath))
app.set("views", path.join(__dirname, "../templets/views"));
const partialPath=path.join(__dirname,'../templets/partials')
app.set('view engine','hbs')
hbs.registerPartials(partialPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:"weather",
        name:"nitesh agarwal"
    })
})
app.get('/wheather',(req,res)=>{

    if(!req.query.address){
         return res.send({
            error:"address must be provided"
        });
    }
    geocodeFile.geocode(req.query.address,(error,geoCodeData)=>{
                  if(error){
                      return res.send(error)
                  }
                
                  forecastFile.forecast(geoCodeData.latitude,geoCodeData.longitude,(error,forecastData)=>{
                    if(error){
                        return res.send(error)
                    }
                    res.send({
                        forecast:forecastData,
                        location:geoCodeData.place_discription,
                        address:req.query.address
                    });
                  
                  })

    })
  

})
app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        title:"to help call on 8949142488",
        name:"nitesh agarwal"
    })
})
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        msg:"to help call on 8949142488",
        name:"nitesh-agarwal"
    })
})
app.get('/products',(req,res)=>{
    
    if(!req.query.search){
      return res.send({
            error:"please provide the search parameter"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404pagenotfound',{
        msg:'404 help page not found'
       })
   
  
})

app.get('*',(req,res)=>{
    res.render('404pagenotfound.hbs',{
     msg:'404 page not found'
    })

})


app.listen(3000,()=>{
    console.log("server is running on 3000")
})
