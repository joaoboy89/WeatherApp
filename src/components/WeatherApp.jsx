import { useState } from "react"


export const WeatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather?q='
    const Api_KEY = 'a9c212103be911258201789d5c3a63c6'

    const [city, setCity] = useState('')
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);


    const handleChangeCity = (e) => {
        setCity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (city.length > 0) {
            fetchWeather()
        }
    }

    const fetchWeather = async () => {
        try {
            const response = await fetch(`${urlBase}${city}&appid=${Api_KEY}`)
            const data = await response.json()
            setData(data)
        } catch (error) {
            console.log('sucedio un error de tipo: ', error)
            setError('Hubo un error al obtener el clima. Por favor, intenta nuevamente.')
        }
    }
/*clave api google con missabores AIzaSyAF13L9KfBsUs0xkuuezxxDwAR3pq0ZFKg */
    return (
        <div className='contenedor'>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    value={city}
                    onChange={handleChangeCity}
                />
                <button type="submit"> Search
                </button>
            </form>
            {
                data 
                ? <div className="contenedor">
                    <h2>{data.name}</h2>
                    <p>temperature: {parseInt(data?.main?.temp - 273 )}°C</p>
                    <p>Condition: {data.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/>
                    </div>
                : error
            }

        </div>
    )
}
