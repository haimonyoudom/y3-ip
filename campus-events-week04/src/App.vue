
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import EventList from "./components/EventList.vue";
import { initialEvents } from "./data/events";
import type { CampusEvent } from "./types";

// A reactive copy of the hard-coded events
const events = ref<CampusEvent[]>(initialEvents.map(e => ({ ...e })));

// TODO 1: Store the IDs of booked seats
const STORAGE_KEY = "campus-event-bookings";

function loadBookings(): number[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    if (
      Array.isArray(parsed) &&
      parsed.every(id => typeof id === "number" && Number.isFinite(id))
    ) {
      return parsed;
    }
  } catch {
    // Ignore invalid or corrupted saved data
  }

  return [];
}

const myBookings = ref<number[]>(loadBookings());

// TODO 2: Calculate the total seats booked by me
const bookingCount = computed(() => myBookings.value.length);

// TODO 3: Book an event if seats are available
function onBook(id: number) {
  const event = events.value.find(e => e.id === id);

  if (!event) return;

  if (event.booked < event.capacity) {
    event.booked++;
    myBookings.value.push(id);
  }
}

// TODO 4: Save bookings and restore booked seats
watch(
  myBookings,
  (bookings) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  },
  { deep: true }
);

// Add my previously booked seats back to the event counts
for (const id of myBookings.value) {
  const event = events.value.find(e => e.id === id);

  if (event && event.booked < event.capacity) {
    event.booked++;
  }
}
</script>

<template>
  <main>
    <header>
      <h1>Campus Events</h1>

      <!-- TODO 5: Show the real booking count -->
      <p class="mine">
        You have booked {{ bookingCount }}
        {{ bookingCount === 1 ? "seat" : "seats" }}.
      </p>
    </header>

    <EventList :events="events" @book="onBook" />
  </main>
</template>

<style scoped>
header {
  margin-bottom: 16px;
}

.mine {
  color: #6b7280;
  margin: 0;
}
</style>
