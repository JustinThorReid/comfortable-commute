export interface DataRecord {
	id?: number;
	time: number;
	latitude: number;
	longitude: number;
	dewPoint: number;
	humidity: number;
	pressure: number;
	windSpeed: number;
	windGust: number;
	windBearing: number;
	cloudCover: number;
	uvIndex: number;
	visibility: number;
	ozone: number;
	precipProbability: number;
	precipType: string;
	precipIntensity: number;
	precipIntensityError: number;
	temperature: number;
	feelsTemperature: number;
}

export interface DataOutput {
	id?: number;
	name: string;
}

export interface DataFeedback {
	id?: number;
	inputId: number;
	outputId: number;
	value: boolean;
}
