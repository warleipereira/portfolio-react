import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  //http://api.openweathermap.org/data/2.5/weather?lat=-22.936526999999998&lon=-46.5451609&lang=pt&units=metric&appid=60fa8e5781e3bf127b02138692ee700e
  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: '60fa8e5781e3bf127b02138692ee700e',
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

if (location == false) {
  return (
    <Fragment>
      Você precisa habilitar a localização no browser o/
    </Fragment>
  )
} else if (weather == false) {
  return (
    <Fragment>
      Carregando o clima...
    </Fragment>
  )
} else {
  return (
    <Fragment>
      <h3 class="Titulo_cidade">{weather['name']}</h3>
      <h3>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
      <hr/>
      <ul>
        <li>Temperatura atual: {weather['main']['temp']}°</li>
        <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
        <li>Temperatura minima: {weather['main']['temp_min']}°</li>
        <li>Pressão: {weather['main']['pressure']} hpa</li>
        <li>Umidade: {weather['main']['humidity']}%</li>
      </ul>
    </Fragment>
  );
}
}

export default App;