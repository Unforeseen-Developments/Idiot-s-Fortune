const { promises: fs } = require('fs');
const path = require('path');

// Path to the data file (relative to the function's execution context)
const dataFilePath = path.join(__dirname, '..', 'data.json');

// Helper function to read and parse JSON file
async function readData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or has errors, return default values
    return { yes: 0, no: 0, noResponse: 0 };
  }
}

// Helper function to write the data to the JSON file
async function writeData(data) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true; // Indicate success
  } catch (error) {
    console.error('Error writing data:', error);
    return false; // Indicate failure
  }
}

exports.handler = async (event) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*', // Allow from any origin, for testing.  Restrict this in production!
        'Access-Control-Allow-Headers': 'Content-Type',
    };


    if (event.httpMethod === 'OPTIONS') {
        // Preflight request.  Return 200 OK with CORS headers.
        return {
            statusCode: 200,
            headers,
            body: '',
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405, // Method Not Allowed
            headers,
            body: 'Method Not Allowed',
        };
    }

    try {
        const { action } = JSON.parse(event.body); // Get the action from request body

        if (!action || !['yes', 'no', 'noResponse'].includes(action)) {
            return {
                statusCode: 400, // Bad Request
                headers,
                body: 'Invalid action',
            };
        }

        let data = await readData(); // Read current data
        data[action]++; // Increment the counter

        const writeSuccess = await writeData(data); // Write updated data

        if (!writeSuccess) {
            return {
                statusCode: 500,  // Internal Server Error
                headers,
                body: 'Failed to update statistics.',
            };
        }
        return {
            statusCode: 200, // OK
            headers,
            body: JSON.stringify(data), // Return the updated data
        };

    } catch (error) {
        console.error('Error processing request:', error);
        return {
            statusCode: 500, // Internal Server Error
            headers,
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};