const { Client } = require('pg');

// Configuration object for PostgreSQL connection
const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'poot',
    database: 'pinterest',
    port: 5432,
};

class DbConnect {
    // Method to fetch data from the database
    async get_data(queryText, values) {
        const client = new Client(config);
        try {
            await client.connect();
            console.log('Connected to PostgreSQL database');

            const result = await client.query(queryText, values);
            console.log('Query result:', result.rows);

            // Transform the result rows into a specific format
            const data = result.rows.reduce((acc, row, index) => {
                acc[`post_${index + 1}`] = [row.url_to, row.likes];
                return acc;
            }, {});

            await client.end();
            console.log('Connection to PostgreSQL closed');
            return data;
        } catch (err) {
            console.error('Error executing query or closing connection', err);
            await client.end();
            console.log('Connection to PostgreSQL closed');
            throw err;
        }
    }

    // Method to fetch liked posts from the database
    async get_liked(queryText, values) {
        const client = new Client(config);
        try {
            await client.connect();
            console.log('Connected to PostgreSQL database');

            const result = await client.query(queryText, values);
            console.log('Query result:', result.rows);

            // Extract the 'url_to' field from each row
            const data = result.rows.map(row => row.url_to);
            console.log(`Completed push: ${data}`);

            await client.end();
            console.log('Connection to PostgreSQL closed');
            return data;
        } catch (err) {
            console.error('Error executing query or closing connection', err);
            await client.end();
            console.log('Connection to PostgreSQL closed');
            throw err;
        }
    }

    // Method to insert or update data in the database
    async post_data(queryText, queryParams) {
        const client = new Client(config);
        try {
            await client.connect();
            console.log('Connected to PostgreSQL database');

            const result = await client.query({ text: queryText, values: queryParams });
            console.log('Query result:', result);

            await client.end();
            console.log('Connection to PostgreSQL closed');
            return result;
        } catch (err) {
            console.error('Error executing query or closing connection', err);
            await client.end();
            console.log('Connection to PostgreSQL closed');
            throw err;
        }
    }
}

module.exports = DbConnect;
