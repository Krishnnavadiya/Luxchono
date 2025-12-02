# Design Decisions

This document explains the rationale behind the software design for Luxchono — how the architecture improves maintainability, testability, and scalability, and where key design principles are applied.

## A. How the Design Improves on a Basic Version

- Introduced layered thinking (Controller → Service → Repository)
  - Controllers focus on HTTP and orchestration; heavy business logic is consolidated and reusable rather than embedded in route handlers.
  - Repository concerns are encapsulated by Mongoose models, enabling data‑access abstraction and future replacement without impacting controllers.
- Improved modularity
  - Feature‑oriented folders for routers, controllers, models, middleware, and utilities reduce coupling and simplify navigation.
- Added DTO mindset to avoid exposing entities directly
  - Responses normalize and shape data (e.g., product pipelines map image documents to URLs and compute ratings), preventing direct exposure of internal schema.
- Improved naming, structure, and folders
  - Clear separation: `router/`, `controller/`, `model/`, `middleware/`, `util/`, `config/` conveys responsibilities and boundaries.
- Added interfaces for loose coupling (JS/TS equivalent abstractions)
  - Utility modules (JWT, transporter, cloudinary, error) act as interfaces between framework/services and application code.
- Improved readability and removed code duplication
  - Shared aggregation pipelines, centralized error handling, reusable utility functions, and role/status constants eliminate repetition.

## B. Applied Design Principles

- SOLID
  - Single Responsibility Principle (SRP)
    - Error handler centralizes HTTP error mapping: `luxchono-backend/src/middleware/error.js:3–8`
    - JWT creation/verification isolated: `luxchono-backend/src/util/jwt_token.js:4–10`
    - Email sending via a dedicated transporter: `luxchono-backend/src/util/transporter.js:4–10`
    - Cloudinary upload/destroy abstracted: `luxchono-backend/src/util/cloudinary.js:13–27`
  - Open/Closed Principle (OCP)
    - Product aggregation extended via `productPipeline` without changing consumers: `luxchono-backend/src/controller/product_controller.js:5–63`
  - Dependency Inversion Principle (DIP)
    - External integrations (JWT, Nodemailer, Cloudinary, Razorpay) accessed through thin utility layers configured via environment.

- Separation of Concerns
  - Routers mount feature scopes; controllers handle request lifecycles; models encapsulate data mapping; middleware handles cross‑cutting concerns.
    - Public routes: `luxchono-backend/src/router/router.js:12–18`
    - Admin routes: `luxchono-backend/src/router/admin_router.js:20–34`
  - Database connection isolated: `luxchono-backend/src/database/index.js:4–12`

- DRY (Don’t Repeat Yourself)
  - Shared constants for roles, methods, statuses: `luxchono-backend/src/config/string.js:1–27`
  - Reusable product aggregation: `luxchono-backend/src/controller/product_controller.js:5–63` and exported for reuse: `luxchono-backend/src/controller/product_controller.js:177`
  - Centralized error responses: `luxchono-backend/src/middleware/error.js:3–8`

- KISS (Keep It Simple)
  - Uniform JSON envelopes for success/error increase predictability and simplify client handling.
  - Clear, flat routing hierarchy avoids over‑engineering.

- Dependency Injection (via configuration)
  - Razorpay keys: `luxchono-backend/src/config/razorpay_config.js:3–6`
  - Mail credentials: `luxchono-backend/src/util/transporter.js:4–10`
  - Cloudinary credentials: `luxchono-backend/src/util/cloudinary.js:7–11`
  - JWT secret: `luxchono-backend/src/util/jwt_token.js:2`

- Interface Segregation (pragmatic JS/TS)
  - Separate routers per domain (product, cart, order, wishlist, rating, address) prevent monolithic interfaces: `luxchono-backend/src/router/router.js:12–18`
  - Admin router groups admin‑only endpoints under `/admin`: `luxchono-backend/src/router/admin_router.js:20–34`

## C. Key Refactorings and Quality Improvements

- Extracted product view shaping into `productPipeline`
  - Maps image document array to URL array, enriches with rating/review counts, and denormalizes brand/category lookups: `luxchono-backend/src/controller/product_controller.js:5–63`
  - Exported for reuse across controllers: `luxchono-backend/src/controller/product_controller.js:177`
- Centralized error handling
  - Removed ad‑hoc try/catch response formatting in favor of a single middleware: `luxchono-backend/src/middleware/error.js:3–8`
- Consolidated configuration and constants
  - Roles, statuses, and payment metadata moved to `config/string.js`: `luxchono-backend/src/config/string.js:1–27`
  - External service configuration via environment variables for Razorpay/Mail/Cloudinary (reduces hard‑coding and eases environment changes).
- Moved integrations to utility modules
  - JWT utilities: `luxchono-backend/src/util/jwt_token.js:4–10`
  - Email transporter: `luxchono-backend/src/util/transporter.js:4–10`
  - Cloudinary helpers: `luxchono-backend/src/util/cloudinary.js:13–27`
- Improved controller focus
  - Payment verification flow updates order/payment status, clears cart, decrements stock, and redirects without embedding low‑level APIs directly: `luxchono-backend/src/controller/order_controller.js:303–332`
- Reduced duplication in admin asset management
  - Brand image/icon update uses shared Cloudinary helpers and publicId lifecycle: `luxchono-backend/src/controller/admin/brand_controller.js:46–78`

## D. Core Flow Sequences

- Authentication (User Login)
  - Client posts `{ email, password }` → `login`: `luxchono-backend/src/controller/auth_controller.js:87–112`
  - Server verifies credentials, creates JWT, returns token → saved as `lw-token` in `localStorage` (frontends attach via `prepareHeaders`): `luxchono-watch/src/api/Utils.js:2–8`, `Luxchono-Admin-frontend/src/api/Utils.ts:5–11`

- Product Browse and Details
  - Client fetches product list → `/product` using RTK Query: `luxchono-watch/src/api/Product.js:16–23`
  - Server aggregates via `productPipeline` and returns shaped DTO.
  - Product details fetch → `/product/:id`: `luxchono-watch/src/api/Product.js:51–59`, server resolves similar products and ratings: `luxchono-backend/src/controller/product_controller.js:127–176`

- Wishlist
  - Toggle wishlist → `/wishlist/add-remove-wishlist` with JWT: `luxchono-watch/src/api/Product.js:25–33`
  - Get wishlist IDs and products: `luxchono-watch/src/api/Product.js:35–50`

- Cart Operations
  - Add/update/remove items → cart endpoints (JWT protected) with quantities; server maintains counts and totals: `luxchono-backend/src/controller/cart_controller.js`
  - Cart totals calculated via aggregation and loop: `luxchono-backend/src/controller/cart_controller.js:82–117`

- Order and Payment
  - Pre‑order calculation: server composes items, totals, discount, delivery estimate: `luxchono-backend/src/controller/order_controller.js:125–189`
  - Payment order (Razorpay) → order creation and checkout; verification confirms payment, updates status, cleans cart, decrements stock, and redirects: `luxchono-backend/src/controller/order_controller.js:303–332`
  - Cancellation flow updates status and notifies via email/notification: `luxchono-backend/src/controller/order_controller.js:381–420`

## E. DTOs (Representative Shapes)

- Auth Login (Request/Response)
  - Request: `{ email: string, password: string }`
  - Response: `{ statusCode: 200, success: true, token: string, message: string }`

- Product List (Response)
  - Response: `{ statusCode: 200, success: true, data: { products: Array< ProductView > } }`
  - `ProductView` includes `{ _id, name, price, dummyPrice, image: string[], brand, category[], rating, totalReviews }` from aggregation: `luxchono-backend/src/controller/product_controller.js:5–63`

- Product Details (Response)
  - Response: `{ statusCode: 200, success: true, data: { product: ProductView, similarProduct: ProductView[], ratings: Array<{ star, comment, user: { email, username } }> } }` (`luxchono-backend/src/controller/product_controller.js:127–176`)

- Cart Summary (Response)
  - Response: `{ statusCode: 200, success: true, data: { cartProducts, cartTotalAmount, cartDiscountAmount, cartPaymentAmount } }` (`luxchono-backend/src/controller/cart_controller.js:82–117`)

- Pre‑Order Calculation (Response)
  - Response: `{ statusCode: 200, success: true, data: { orderProducts, totalAmount, discountAmount, paymentAmount, deliveryDate } }` (`luxchono-backend/src/controller/order_controller.js:165–189`)

- Payment Verification (Redirect)
  - Redirects on success to frontend with `orderId` query param; on failure returns `{ statusCode: 400, success: false, message }` (`luxchono-backend/src/controller/order_controller.js:303–332`)

## F. Environment & Configuration as DI

- Backend uses environment for credentials and endpoints
  - JWT: `JWT_SECRET_KEY` consumed by `jwt_token`: `luxchono-backend/src/util/jwt_token.js:2`
  - Razorpay: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`: `luxchono-backend/src/config/razorpay_config.js:3–6`
  - Email: `MAIL_EMAIL`, `MAIL_PASSWORD`: `luxchono-backend/src/util/transporter.js:4–10`
  - Cloudinary: `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_CLOUD_NAME`: `luxchono-backend/src/util/cloudinary.js:7–11`
  - Database: `DB_CONNECT` used by connector: `luxchono-backend/src/database/index.js:4–12`

## Summary

The architecture emphasizes clear boundaries, reusable utilities, centralized error handling, and configuration‑driven integrations. These choices apply SRP, DRY, and Separation of Concerns, preparing the codebase for growth (adding formal services, DTOs, and repository abstractions) with minimal friction.
