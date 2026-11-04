
# Week 06 Answers

### 1. HTTP DELETE Idempotency

Yes, `DELETE` is still idempotent. Idempotency means that executing a request multiple times results in the same server side-state as executing it once, regardless of the HTTP response status code returned. After the first `DELETE /events/2` (returning 204), event 2 is gone; sending the request a second time (returning 404) leaves the server in that exact same state without altering any additional resources.

### 2. CORS and Browser vs. cURL

The **web browser** running the Vue application is what blocks the response when CORS is not configured. Browsers enforce the Same-Origin Policy for security, refusing to let front-end scripts read cross-origin responses unless explicit CORS headers are returned by the server. Tools like `curl` bypass this entirely because they are non-browser HTTP clients that do not enforce the Same-Origin Policy.

### 3. Dependency Injection in NestJS

The **NestJS Dependency Injection (DI) container** creates the instance of `EventsService`. It instantiates the service automatically during application startup when resolving module dependencies before injecting it into `EventsController`. By default, NestJS providers are singletons, meaning exactly **one** instance of `EventsService` is created and shared across the application.

### 4. DTO Validation and Whitelisting

The line `forbidNonWhitelisted: true` in `src/setup.ts` inside `new ValidationPipe(...)` is what refuses the request with a `400 Bad Request`. Without this line (assuming `whitelist: true` remains active), NestJS would quietly strip and delete `"booked": 50` from the request body during validation instead of rejecting the request. If `whitelist: true` were also removed, the unwhitelisted `booked` property would pass straight through to the controller and service payload.

### 5. Domain Logic Layer Placement

Business rules like "not enough seats" belong in `BookingsService` because it acts as the central source of truth for core application logic across all entry points. Placing this check only in the Vue form allows clients to bypass validation by sending raw HTTP requests directly to the API. Keeping it out of `BookingsController` ensures the rule remains reusable across different controllers, CLI tools, or background queues without duplicating validation logic.
