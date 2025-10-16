<script setup lang="ts">
import { ref, onMounted } from 'vue';
import http from "@/http.ts";

const locations = ref([]);
const selectedLocation = ref('');
const checkInDate = ref('');
const checkOutDate = ref('');
const adults = ref(1);
const children = ref(0);
const searchResults = ref(null); // To store and display search results

const fetchLocations = async () => {
  try {
    const response = await http.get('/locations');
    locations.value = response.data.cities;
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
};

const searchHotels = async () => {
  try {
    const response = await http.get('listings', {
      params: {
        city: selectedLocation.value,
        check_in: checkInDate.value,
        check_out: checkOutDate.value,
        adults: adults.value,
        children: children.value,
      },
    });
    searchResults.value = response.data; // Store the response data
  } catch (error) {
    console.error('Error fetching listings:', error);
    searchResults.value = { error: 'Failed to fetch listings' }; // Handle errors
  }
};

onMounted(fetchLocations);
</script>

<template>
  <div>
    <h1>Find Your Hotel</h1>
    <form @submit.prevent="searchHotels">
      <div>
        <label for="location">Location:</label>
        <select id="location" v-model="selectedLocation" required>
          <option value="" disabled>Select a location</option>
          <option v-for="location in locations" :key="location" :value="location">
            {{ location }}
          </option>
        </select>
      </div>
      <div>
        <label for="check-in">Check-in:</label>
        <input id="check-in" v-model="checkInDate" type="date" required />
      </div>
      <div>
        <label for="check-out">Check-out:</label>
        <input id="check-out" v-model="checkOutDate" type="date" required />
      </div>
      <div>
        <label for="adults">Adults:</label>
        <input
          id="adults"
          v-model.number="adults"
          type="number"
          min="1"
          required
        />
      </div>
      <div>
        <label for="children">Children:</label>
        <input
          id="children"
          v-model.number="children"
          type="number"
          min="0"
        />
      </div>
      <button type="submit">Search Hotels</button>
    </form>
    <div v-if="searchResults">
      <h2>Search Results:</h2>
      <pre>{{ JSON.stringify(searchResults, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
form {
  margin-bottom: 20px;
}
form div {
  margin-bottom: 10px;
}
</style>