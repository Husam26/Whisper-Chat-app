// lib/utils.js
import { format } from 'date-fns';

export const formatDate = (date) => {
  return format(new Date(date), 'MMMM dd, yyyy, hh:mm a'); // Example format: January 25, 2025, 02:30 PM
};
