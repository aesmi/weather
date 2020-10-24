import React from "react";
import "./App.css";
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./app_component/weather.component";
import Form from "./app_component/form.component";
import Clock from "./app_component/clock.component";

//api call to api.openweathermap.org/data/2.5/weather?q=London
const API_Key = "8942bbfb16ded7a4ef8518381e05f9a0";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      icon: undefined,
      main: undefined,
      celcius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  getWeatherIcon(icon, rangeID) {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeID >= 700 && rangeID <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeID == 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }

  calCelcius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if (city && country) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`
      );
      const response = await api_call.json();
      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        celcius: this.calCelcius(response.main.temp),
        temp_max: this.calCelcius(response.main.temp_max),
        temp_min: this.calCelcius(response.main.temp_min),
        description: response.weather[0].description,
        error: false,
      });
      this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
      console.log(response);
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="App">
        {
          //<div style={{left: '50%', display: 'flex'}}><Clock /></div>}
        }
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celcius={this.state.celcius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
