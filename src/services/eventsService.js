import axios from 'axios';

// Mock data for development
const mockEvents = [
  {
    id: 1,
    name: "Summer Music Festival",
    location: "Central Park",
    date: "May 15, 2024",
    time: "4:00 PM - 10:00 PM",
    latitude: 40.7829,
    longitude: -73.9654,
    rating: 4.7,
    reviewCount: 128
  },
  {
    id: 2,
    name: "Aqua Adventure",
    location: "Wildlife Sanctuary",
    date: "June 10, 2024",
    time: "10:00 AM - 6:00 PM",
    latitude: 40.7855,
    longitude: -73.9588,
    rating: 4.5,
    reviewCount: 95
  }
];

export const fetchEvents = async () => {
  try {
    // Try real API first
    const response = await axios.get('https://events-api-ydqd.onrender.com/api/events');
    return response.data || mockEvents; // Fallback to mock if empty
  } catch (error) {
    console.error('Using mock data due to API error:', error);
    return mockEvents; // Fallback to mock data
  }
};