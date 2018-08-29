require('dotenv').config();
import * as request from 'request'
import { DataRecord } from './tables'

const CURRENT_URL = `${process.env.darksky_host}/forecast/${process.env.darksky_secret}/${process.env.work_lat},${process.env.work_lng}?exclude=minutely,hourly,daily,alerts,flags`
console.log(CURRENT_URL)

request({
	url: CURRENT_URL,
	method: 'GET',
	json: true
}, (error, response, body) => {
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

	console.log(newRecord)
})
