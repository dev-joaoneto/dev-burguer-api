import app from './app.js';
import './database/index.js';
import 'dotenv/config';

const port = process.env.PORT || 3001;
app.listen(port, '0.0.0.0', () => {
	console.log('Server is running on port 3001');
});




