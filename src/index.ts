require('dotenv').config();
import * as request from 'request'
import * as express from 'express'
import { DataRecord } from './tables'

const app = express()

function forecast(time: number = undefined): Promise<DataRecord> {
	let forecastUrl = `${process.env.darksky_host}/forecast/${process.env.darksky_secret}/${process.env.work_lat},${process.env.work_lng}`
	if (time) {
		forecastUrl += `,${time}`
	}
	forecastUrl += `?exclude=minutely,hourly,daily,alerts,flags`

	return new Promise<DataRecord>((resolve, reject) => {
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

			const newRecord: DataRecord = {
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

app.use('/', express.static('static'))

app.listen(process.env.PORT, () => {
	console.log(`listening on ${process.env.PORT}`)
})
