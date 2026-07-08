# Protocol Flow

## Overview

The Finality Arena protocol processes every prediction through a deterministic verification pipeline. Each stage ensures the prediction is authentic, verifiable, and eligible for automated settlement.

---

## End-to-End Flow

```text
User
 │
 ▼
Select Match
 │
 ▼
Submit Prediction
 │
 ▼
Create Prediction Object
 │
 ▼
Canonical Serialization
 │
 ▼
Generate Cryptographic Digest
 │
 ▼
Digital Signature
 │
 ▼
Replay Protection Check
 │
 ▼
Finality Verification
 │
 ▼
Store Prediction
 │
 ▼
Match Ends
 │
 ▼
Admin Submits Final Score
 │
 ▼
Settlement Engine
 │
 ▼
Calculate Points
 │
 ▼
Update Leaderboard
```

---

## Step 1 — Prediction Submission

The user selects a match and submits a predicted score.

The system creates a prediction containing:

* Match ID
* Player information
* Predicted outcome
* Wallet address
* Timestamp
* Metadata

---

## Step 2 — Verification

Before acceptance, the prediction passes through several verification stages:

* Canonical serialization
* Digest generation
* Digital signature
* Replay protection
* Finality verification

Only valid predictions continue through the pipeline.

---

## Step 3 — Storage

Verified predictions are securely stored together with:

* Prediction data
* Signature
* Verification receipt
* Digest
* Status

---

## Step 4 — Settlement

After the official match result is available:

1. The administrator submits the final score.
2. The settlement engine compares every prediction with the official result.
3. Correct predictions are identified.
4. Points are calculated.
5. Settlement records are generated.

---

## Step 5 — Leaderboard

The leaderboard is updated automatically using settlement results.

Rankings are calculated deterministically from verified predictions, ensuring transparency and consistency.

---

## Protocol Guarantees

The protocol provides:

* Tamper-resistant predictions
* Deterministic verification
* Replay protection
* Transparent settlement
* Verifiable leaderboard updates

Every prediction follows the same workflow, ensuring consistent and auditable processing from submission to final scoring.
