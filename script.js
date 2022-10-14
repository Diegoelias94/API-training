let dataGlobal;
let temperature;

function weather(){
    switch(true){
        case (temperature < 0):
            document.getElementById("span").innerHTML = "Freezing";
            document.getElementById("sub-span").innerHTML = "Stay in bed, dude!";
            break;
        case (temperature >= 0 && temperature < 10):
            document.getElementById("span").innerHTML = "Chilly";
            document.getElementById("sub-span").innerHTML = "Put on layers!";
            break;
        case (temperature >= 10 && temperature < 20):
            document.getElementById("span").innerHTML = "Cool";
            document.getElementById("sub-span").innerHTML = "Chill and go do something!";
            break;
        case (temperature >= 20 && temperature < 25):
            document.getElementById("span").innerHTML = "Warm";
            document.getElementById("sub-span").innerHTML = "Take it easy and drink some water!";
            break;
        case (temperature >= 25 && temperature < 30):
            document.getElementById("span").innerHTML = "Way Too Warm";
            document.getElementById("sub-span").innerHTML = "Jump in the nearest pool!";
            break;
        case (temperature >= 30):
            document.getElementById("span").innerHTML = "Hot as Fuck";
            document.getElementById("sub-span").innerHTML = "Sit under your AC, my god!";
            break;
    }
}

const getData = async () => {
  const response = await fetch("http://api.ipstack.com/check?access_key=ad8fb292b4d6566bc42390186ae0090c");
  const data = await response.json();
  dataGlobal = data;
  return data;
};

(async () => {
  await getData();
  console.log(dataGlobal.longitude + " " + dataGlobal.latitude);
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${dataGlobal.latitude}%2C${dataGlobal.longitude}?unitGroup=metric&key=PWGSFXBQZER8UU98UNPZ7WKGN&contentType=json`, {
    "method": "GET",
    "headers": {
    }
    })
  .then(response => {
    return response.json();
  }).then(data => {
      // Work with JSON data here
      console.log(data.currentConditions.feelslike);
      temperature = data.currentConditions.feelslike;
      weather();
      return temperature;
  }).catch(err => {
    console.error(err);
  });
})();



