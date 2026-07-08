# System Architecture

## Overview

Finality Arena follows a modular architecture that separates the user interface, application services, protocol logic, cryptographic verification, and storage. This design keeps the protocol reusable, testable, and independent of the frontend.

---

## Architecture

```text
                 Next.js Frontend
                        │
                        ▼
              Application Services
                        │
                        ▼
               Protocol Adapter Layer
        ┌──────────┬──────────┬──────────┐
        ▼          ▼          ▼
 Prediction     Verification   Settlement
   Engine          Engine        Engine
        └──────────┬──────────┘
                   ▼
             Finality SDK
                   ▼
             Storage Layer
        ┌────────┬─────────┬──────────┐
        ▼        ▼         ▼
 Predictions  Settlements Leaderboard
```

---

## Components

### Frontend

Provides the user interface for:

* Viewing matches
* Submitting predictions
* Viewing verification status
* Running settlement
* Viewing leaderboard

---

### Application Services

Coordinates communication between the frontend and protocol layer.

Responsibilities include:

* Match management
* Prediction submission
* Settlement requests
* Leaderboard retrieval

---

### Protocol Adapter

Implements the core business logic.

Modules include:

* Prediction Engine
* Verification Engine
* Settlement Engine
* Protocol Service

---

### Finality SDK

Provides cryptographic verification by:

* Generating verification receipts
* Validating submissions
* Producing verifiable proof

---

### Storage Layer

Stores application data in dedicated repositories:

* Prediction Store
* Settlement Store
* Leaderboard Store

---

## Design Principles

* Modular architecture
* Separation of concerns
* Reusable protocol layer
* Deterministic processing
* Cryptographic verification
* Transparent settlement
* Easy integration with future applications

---

## Data Flow

```text
User
  │
  ▼
Frontend
  │
  ▼
Application Service
  │
  ▼
Protocol Service
  │
  ▼
Prediction Engine
  │
  ▼
Finality Verification
  │
  ▼
Storage
  │
  ▼
Settlement Engine
  │
  ▼
Leaderboard
```

This layered architecture allows the verification protocol to be reused independently of the football prediction interface.
