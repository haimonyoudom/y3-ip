1.	You refresh the browser on /events/2 and the page loads. Which program answered that request in development, and what must the production server do so it still works after deployment?

> In development, the Vite dev server answers the browser request and serves the app. In production, the server must serve `index.html` for app routes like `/events/2`, so Vue Router can show the correct page instead of a 404 error.

2.	The guard stops students from opening /events/new. Can a student still create an event? How, and what must stop them?

> Yes, a student could still try to create an event by sending a request directly to the API, without using the page. The backend must check the user's permissions and reject requests from students, because a router guard only protects the frontend.

3.	EventDetailPage loads its event in a watch on the id with immediate: true, not in onMounted. What bug would onMounted alone cause?

>If we only use `onMounted`, the event loads when the page first opens, but it may not reload when the ID changes while reusing the same component. Watching the ID makes sure the page fetches the correct event whenever the route ID changes.

4.	Why does EventsPage use storeToRefs(store) instead of const { events } = store?

>We use `storeToRefs(store)` to keep properties like `events` reactive when we take them out of the store. If we just write `const { events } = store`, we can lose reactivity when the store property changes.
