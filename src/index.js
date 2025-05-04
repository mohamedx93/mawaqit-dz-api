import express from 'express';
import cors from 'cors';
import { loadCSVData, retrunAllData, returnRequestedData } from './data-utils.js';
import { convertToInternalDate } from './date-utils.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Store parsed CSV data in memory
let csvData = [];



// API Routes
app.get('/api/data', (req, res) => {
    retrunAllData(csvData, req,res);
});

// Get data by field value
app.get('/api/data/:field/:value', (req, res) => {
  returnRequestedData(csvData, req, res);
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    csvData = await loadCSVData('data/mawaqit.csv');
    console.log('CSV data loaded successfully');
  } catch (error) {
    console.error('Error loading CSV data:', error);
  }
});