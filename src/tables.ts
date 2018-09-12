export enum Clothes {
	Shorts = 1,
	Pants,
	Jacket,
	Parka
}

export enum Transport {
	Walk = 1,
	Ride,
	Drive,
	Home
}

export interface Forecast {
	time: Date;
	latitude: number;
	longitude: number;
	dewPoint?: number;
	humidity?: number;
	pressure?: number;
	windSpeed?: number;
	windGust?: number;
	windBearing?: number;
	cloudCover?: number;
	uvIndex?: number;
	visibility?: number;
	ozone?: number;
	precipProbability?: number;
	precipType?: string;
	precipIntensity?: number;
	precipIntensityError?: number;
	temperature?: number;
	feelsTemperature?: number;
}

export interface TrainingData extends Forecast {
	id?: number;
	clothes: Clothes;
	transport: Transport;
	umbrella: boolean;
	rainjacket: boolean;
}
