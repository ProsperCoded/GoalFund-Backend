# GoalFund - Transparent Contribution & Fund Management

## Project Overview

GoalFund is a web-based application for community-based financial contributions. It enables organizers to create goals, manage deposits via a virtual account, and ensure transparency through proof verification.

## Key Features

- **Virtual Account Deposits:** Contributors deposit via a shared portal link.
- **Proof of Accomplishment:** Withdrawals require proof, reviewed by contributors.
- **Confirmation System:** Contributors confirm proof legitimacy (thresholds apply).
- **Expected Participant Tracking:** For closed contributions, track expected vs. actual deposits.

## Technical Overview

- Backend: NestJS API, PostgreSQL database.
- Frontend: React application.
- Payments: Squad API, GTBank Virtual Account.
- Proof Storage: Cloudinary.
- Real-time updates: Socket.io

## Important Considerations

- Deposits require name and email.
- Withdrawals require confirmed proof.
- The current location is Nigeria.

This project Users Drizzle ORM
