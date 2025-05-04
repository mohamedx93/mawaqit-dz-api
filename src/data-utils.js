import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { log } from 'console';
import { convertToInternalDate } from './date-utils.js';


// Function to read and parse CSV file
const loadCSVData = async (filePath) => {
    return new Promise((resolve, reject) => {
      const data = [];
      createReadStream(filePath)
        .pipe(parse({ columns: true, trim: true }))
        .on('data', row => data.push(row))
        .on('end', () => {
          resolve(data);
          return data;
        })
        .on('error', error => reject(error));
    });
  };

// Function to get all loaded CSV data
const retrunAllData = (data, req, res) => {
    try {
        if (data.length === 0) {
          return res.status(404).json({ error: 'No data available' });
        }
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
};

const returnRequestedData = (data, req, res) => {
let filteredData = [];
try { 
        const { field, value } = req.params;
        const fieldLC = field.toLowerCase();
        
      // Check if the field is meant to contain a date
      if (fieldLC==='date') {
        
            const convertedDate = convertToInternalDate(value);
            console.log(value);
            console.log(convertedDate); // Add this line to check the value of convertedDate

            filteredData = data.filter(item =>
                item[fieldLC]?.toString() === convertedDate
              ); 
       
      }
      
      // If the field is other than date
      else {
        filteredData = data.filter(item =>
            item[fieldLC]?.toString() === value
          );
        }
        
        if (filteredData.length === 0) {
          return res.status(404).json({ error: 'No matching records found' });
        }
        res.json(filteredData);
      } catch (error) {
        res.status(500).json({ 'Internal server error' : error.message });
      }
};

  
export { loadCSVData, retrunAllData, returnRequestedData };
