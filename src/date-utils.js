import { supportedFormats } from './date-formats.js';
import { parseISO, parse as parseDate, isValid, format } from 'date-fns';


/**
 * Checks if a query field is a date and validates its format
 * @param {any} value - The value is potential date to be validated
 * @returns {date} - Parsed date if the value value is in valid format or null if not
 */
const validDateHandler = (value) => {
  
  let parsedDate=null;

  for (const formatString of supportedFormats) {
    const potentialDate = parseDate(value, formatString, new Date());
    if (isValid(potentialDate)) {
      parsedDate = potentialDate;
      break;
    }}
    return parsedDate;
};

/**
 * Converts a date to internal format
 * @param {Date} date - Date object to convert
 * @returns {string} Date in internal format (dd/MM/yyyy)
 */
const convertToInternalDate = (date) => {
    const parsedDate = validDateHandler(date);
      if (!parsedDate) {
            throw new Error('Invalid date provided. Please provide a valid date in one of the supported formats.');
          }
  return format(parsedDate, 'dd/MM/yyyy');
};
export { validDateHandler, convertToInternalDate };
