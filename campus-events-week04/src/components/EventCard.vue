<script setup lang="ts">
import { computed } from "vue";
import type { CampusEvent } from "../types";
import { formatDate, seatsLeft } from "../format";

// TODO 1: declare a prop `event` of type CampusEvent (defineProps)
const props = defineProps({
  CampusEvent: Event
})
// TODO 2: declare an event `book` that sends the event id (defineEmits)
const emits = defineEmits([])
// TODO 3: computed values
//   left       -> seats left (use seatsLeft)
//   isFull     -> no seat left
//   almostFull -> 1 to 5 seats left
</script>

<template>
  <!-- TODO 4: replace the hard-coded text with the event's data (use formatDate) -->
  <!-- TODO 5: add the class "full" on <article> when the event is full -->
  <article class="card">
    <p class="category">workshop</p>
    <h2>Git Workshop</h2>
    <p class="meta">Wed 4 Nov, 13:30 · Lab 3</p>

    <!-- TODO 6: when full, show only <p class="badge">Full</p>.
         Otherwise show "N seats left" ("1 seat left" for one seat),
         with the class "warn" when almost full. Use v-if / v-else. -->
    <p class="seats">3 seats left</p>

    <!-- TODO 7: disable the button when full; on click, emit "book" with the event id -->
    <button>Book a seat</button>
  </article>
</template>

<style scoped>
.card { background: white; border-radius: 10px; padding: 16px; display: flex; flex-direction: column; gap: 6px; }
.card.full { opacity: 0.7; }
h2 { font-size: 1.1rem; margin: 0; }
.category { text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; color: #3178c6; margin: 0; }
.meta { color: #6b7280; margin: 0; }
.seats, .badge { margin: 0; font-weight: 600; }
.warn { color: #d73a49; }
.badge { color: white; background: #d73a49; align-self: flex-start; padding: 2px 10px; border-radius: 999px; }
button { margin-top: auto; align-self: flex-start; }
</style>
