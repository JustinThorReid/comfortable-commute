import * as mysql from 'mysql';
import { TrainingData } from './tables'

export async function insertTestData(data: TrainingData): Promise<void> {
	const connection = mysql.createConnection(process.env.JAWSDB_URL);
	connection.connect();

	return (new Promise<void>((resolve, reject) => {
		connection.query('Insert into training_data SET ?', data, function(error) {
			connection.end();

			if (error) {
				console.error("Insert error", error)
				reject(error);
				return
			}
			resolve()
		});
	}));
}
