require('dotenv').config();
import * as request from 'request'
import * as express from 'express'
import * as bodyparser from 'body-parser';
import { Forecast, TrainingData, Transport, Clothes } from './tables'
import * as db from './database'

const app: express.Application = express()
app.use(bodyparser.json())

function forecast(time: number = undefined): Promise<Forecast> {
	let forecastUrl = `${process.env.darksky_host}/forecast/${process.env.darksky_secret}/${process.env.work_lat},${process.env.work_lng}`
	if (time) {
		forecastUrl += `,${time}`
	}
	forecastUrl += `?exclude=minutely,hourly,daily,alerts,flags`

	return new Promise<Forecast>((resolve, reject) => {
		request({
			url: forecastUrl,
			method: 'GET',
			json: true
		}, (error, _response, body) => {
			if (error || !body || !body.currently) {
				reject()
				return
			}

			const currently = body.currently

			const newRecord: Forecast = {
				time: currently.time,
				precipType: currently.summary,
				latitude: parseFloat(process.env.work_lat),
				longitude: parseFloat(process.env.work_lng),
				dewPoint: currently.dewPoint,
				humidity: currently.humidity,
				pressure: currently.pressure,
				windSpeed: currently.windSpeed,
				windGust: currently.windGust,
				windBearing: currently.windBearing,
				cloudCover: currently.cloudCover,
				uvIndex: currently.uvIndex,
				visibility: currently.visibility,
				ozone: currently.ozone,
				precipProbability: currently.precipProbability,
				precipIntensity: currently.precipIntensity,
				precipIntensityError: currently.precipIntensityError || 0,
				temperature: currently.temperature,
				feelsTemperature: currently.apparentTemperature
			}

			resolve(newRecord)
		})
	})
}

app.get('/api/forecast/now', async (_req, res) => {
	try {
		const result = await forecast()
		res.send(result)
	} catch (err) {
		console.error("Forcast error", err)
	}
})

function mapTransport(text: string): Transport {
	switch (text) {
		case "walk": {
			return Transport.Walk
		}
		case "ride": {
			return Transport.Ride
		}
		case "drive": {
			return Transport.Drive
		}
		case "home": {
			return Transport.Home
		}
	}

	console.error("Unknown transport type", text)
	return -1
}

function mapClothes(text: string): Clothes {
	switch (text) {
		case "shorts": {
			return Clothes.Shorts
		}
		case "pants": {
			return Clothes.Pants
		}
		case "jacket": {
			return Clothes.Jacket
		}
		case "parka": {
			return Clothes.Parka
		}
	}

	console.error("Unknown transport type", text)
	return -1
}

app.post('/api/submit', async (req, res) => {
	const forecast = req.body.forecast
	const options = req.body.options

	const newData: TrainingData = {
		time: forecast.time,
		precipType: forecast.precipType,
		latitude: forecast.latitude,
		longitude: forecast.longitude,
		dewPoint: forecast.dewPoint,
		humidity: forecast.humidity,
		pressure: forecast.pressure,
		windSpeed: forecast.windSpeed,
		windGust: forecast.windGust,
		windBearing: forecast.windBearing,
		cloudCover: forecast.cloudCover,
		uvIndex: forecast.uvIndex,
		visibility: forecast.visibility,
		ozone: forecast.ozone,
		precipProbability: forecast.precipProbability,
		precipIntensity: forecast.precipIntensity,
		precipIntensityError: forecast.precipIntensityError,
		temperature: forecast.temperature,
		feelsTemperature: forecast.feelsTemperature,
		umbrella: options.umbrella || false,
		rainjacket: options.rainjacket || false,
		transport: mapTransport(options.transport),
		clothes: mapClothes(options.clothes)
	}

	try {
		await db.insertTestData(newData)
		res.statusCode = 200
		res.send()
	} catch (err) {
		console.error("Submit error", err)
		res.statusCode = 500
		res.send()
	}
})

app.use('/', express.static('static'))

app.listen(process.env.PORT, () => {
	console.log(`listening on ${process.env.PORT}`)
})
