import { IWeather } from '@/interfaces/IWeather'

const WeatherCard = ({
	temperature,
	description,
	humidity,
	windSpeed,
	icon,
}: IWeather) => {
	return (
		<div className='rounded overflow-hidden shadow-lg mt-4 bg-white p-8'>
			<div className='flex justify-between items-center mb-4'>
				<div className='text-3xl font-bold mr-20'>{temperature} °F</div>

				<img
					src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
					alt={description}
				/>
			</div>

			<div className='text-xl font-bold mb-4 capitalize text-brand-100'>
				{description}
			</div>

			<div className='flex flex-col'>
				<div className='text-lg font-bold mr-4'>Humidity: {humidity}%</div>
				<div className='text-lg font-bold mr-4'>Wind: {windSpeed} mph</div>
			</div>
		</div>
	)
}

export default WeatherCard
