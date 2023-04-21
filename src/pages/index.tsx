import { ChangeEvent, useEffect, useState } from 'react'

import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import SearchBar from '@/components/SearchBar'
import { useDebounce } from '../utils'

import Alert from '@/components/Alert'
import Footer from '@/components/Footer'
import GetStarted from '@/components/GetStarted'
import WeatherCard from '@/components/WeatherCard'
import { IWeather } from '@/interfaces/IWeather'

const Home = () => {
	const [query, setQuery] = useState('')
	const [weather, setWeather] = useState<IWeather>()
	const [error, setError] = useState(null)
	const [loader, setLoader] = useState(false)
	const debouncedQuery = useDebounce(query, 500)

	useEffect(() => {
		async function fetchWeather() {
			setLoader(true)
			setWeather(undefined)

			await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${debouncedQuery}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_APP_ID}`
			)
				.then(res => res.json())
				.then(data => {
					if (data) {
						if (data?.cod !== 200) {
							setError(data?.message || 'Error')
							setWeather(weather)
						} else {
							setWeather({
								temperature: data.main.temp,
								description: data.weather[0]?.description,
								humidity: data.main?.humidity,
								windSpeed: data.wind?.speed,
								icon: data.weather[0]?.icon,
							})
							setError(null)
						}
					}
				})
				.catch((e: any) => {
					setError(e)
				})
			setLoader(false)
		}
		if (debouncedQuery) {
			fetchWeather()
		}
	}, [debouncedQuery])

	const onQuery = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery((e.target as HTMLInputElement).value)
		setWeather(undefined)
		setError(null)
	}

	const onQueryClear = () => {
		setQuery('')
	}

	const onDismiss = () => {
		setError(null)
	}

	return (
		<Layout>
			<div className='isolate bg-white'>
				<Banner
					message="Get ready to learn how to build weather app with our YouTube tutorial! We can't wait to share it with you."
					link='https://www.youtube.com/@codeofrelevancy?utm_source=weather-app&utm_medium=banner&utm_campaign=promotion'
				/>

				<Header />

				<main>
					<div className='relative px-6 lg:px-8'>
						<div className='mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40'>
							<h1 className='mb-5 text-4xl font-bold tracking-tight sm:text-center sm:text-6xl'>
								Weather
							</h1>

							<SearchBar
								query={query}
								onQuery={onQuery}
								onQueryClear={onQueryClear}
							/>

							<div className='mt-8 flex gap-x-4 sm:justify-center'>
								<Loader status={loader} />

								{query && weather && !loader && <WeatherCard {...weather} />}

								{query && !loader && error && (
									<Alert error={error} onDismiss={onDismiss} />
								)}
							</div>
						</div>
					</div>
				</main>
			</div>

			<GetStarted />

			<Footer />
		</Layout>
	)
}

export default Home
