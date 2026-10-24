# Week 04: Answers

## 1. Array index as `:key` in EventList

Vue uses the key to decide which component belongs to which item. If the key is the array index, filtering the list changes which event sits at each position, so Vue reuses the card component at that position for a different event. A card's local state, such as an open details panel, then stays at the old position and shows up on the wrong event. With `:key="e.id"` every card keeps its own identity and its own state.

## 2. Why `visible` is a computed and not a function in the template

A computed is cached: Vue recalculates it only when something it depends on changes (`events`, `search`, or `category`). A function called from the template runs again on every re-render of the component, even when the change has nothing to do with filtering, such as a booking in the header. When I type in the search box, `search` changes, so the computed recalculates once and the list updates, and for every other re-render the cached list is reused.

## 3. Why EventCard emits `book` instead of changing `event.booked`

First, props are read-only and data flows one way, from parent to child. If the card changed `event.booked`, Vue would warn, and the change would be hidden inside a child where the parent cannot see it. Second, the parent (App) owns the data and the rules, such as checking that a seat is still free and adding to `myBookings`. The card only says "the user wants to book event 7", which keeps it reusable and easy to test.

## 4. `const { booked } = reactive(event); booked++`

Destructuring copies the current number into a plain local variable. That variable is no longer connected to the reactive object, so changing it does not trigger any update, and the page stays the same. To change the data, I must write to the reactive object itself (`event.booked++`), or use `toRefs` to keep the connection. (A `const` variable also cannot be incremented at all.)

## 5. Where `myBookings` lives

`myBookings` lives in `App.vue`, because App owns the events and is the one that handles `onBook`. The header needs `bookingCount`, and the header is outside both EventList and EventCard, so the state has to sit in their closest common parent. If it were in EventCard, every card would have its own separate list, and if it were in EventList, the header could not read it. This is called lifting state up.