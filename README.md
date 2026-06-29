# RFQ-QCR

**RFQ-QCR** is an MVP platform for managing the full Request for Quote (RFQ) lifecycle—from drafting and finalizing RFQs to collecting insurer responses and comparing quotes.

## Overview

The platform helps users turn customer inputs (policy documents, asset details, requirements, and more) into structured RFQs, send them to insurers, and analyze returned quotes in one place.

## MVP Scope

The MVP is organized into five parts:

### Part 1: Setup

- **Connect an LLM account** — Users connect their preferred LLM provider to power AI-assisted drafting and analysis.
- **Add RFQ templates** — Users can create and manage RFQ templates that serve as starting points for new requests.

### Part 2: Input & Draft

- **Collect inputs** — Users provide source material in multiple formats, including:
  - Excel
  - PDF
  - Plain text
  - Email
- **Supported input types** include (but are not limited to):
  - Previous policy documents
  - Asset details
  - Customer requirements
- **Analyze and draft** — The system analyzes the uploaded inputs and generates a draft RFQ.
- **Template assistance** — AI may suggest or apply RFQ templates as reference when creating the draft.

### Part 3: Review & Finalize

- **Edit the draft** — Users can review and modify the draft RFQ before submission.
- **Finalize** — Once satisfied, users finalize the RFQ for distribution.

### Part 4: Distribution

- **Email to insurers** — Finalized RFQs can optionally be emailed to one or more insurers.

### Part 5: Quote Comparison

- **Process insurer responses** — When insurers reply, the software reads and parses their responses.
- **Update quote comparison** — Parsed data is used to update a quote comparison view.
- **Export and share** — Quote comparisons can be:
  - Previewed in the app
  - Downloaded as PDF
  - Shared with customers

## Workflow

```
Setup (LLM + Templates)
        ↓
Upload inputs → AI analyzes → Draft RFQ
        ↓
User edits → Finalize RFQ
        ↓
Email to insurers (optional)
        ↓
Insurer responses → Quote comparison → Preview / PDF / Share
```

## Status

This repository is in early MVP development. Implementation of the five parts above is planned or in progress.
