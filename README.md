# Task Management Full-Stack

Here is a professional, high-impact README.md in English, designed to highlight your seniority in both Software Architecture and DevOps.

This README is structured to impress recruiters by focusing on the "Why" and "How" of your technical decisions.
🚀 Task Management Full-Stack

A robust, enterprise-grade task management platform built with a focus on Software Architecture, Scalability, and Developer Experience (DX). This project demonstrates a complete lifecycle from a high-performance .NET backend to a highly reactive Next.js frontend, all containerized and ready for Kubernetes.
🛠 Tech Stack

    Frontend: Next.js 14+ (App Router), TypeScript, Tailwind CSS.

    Backend: .NET Core (C#), Java/Quarkus (Polyglot compatible services).

    Infrastructure: Docker, Kubernetes (K8s), Jenkins (CI/CD), Azure.

    State & Auth: JWT, useSyncExternalStore, Axios Interceptors.

✨ Key Features & Architecture
🏛 Frontend Engineering

    Custom Hook Architecture: Complete separation of business logic from UI components, ensuring high maintainability and testability.

    Reactive State Management: Utilizes useSyncExternalStore for reliable state synchronization across browser tabs.

    Advanced UX Patterns: * Debouncing: Optimized search inputs to prevent API flooding.

        Graceful Degradation: Native Next.js loading.tsx and error.tsx (Error Boundaries) for a resilient user experience.

        Persistence: Persistent focus and state during asynchronous data fetching.

    Form Management: Integrated with react-hook-form for complex validation and server-side error mapping.

🔐 Security & Resilience

    Server-side Protection: Route protection implemented via Next.js Middleware, preventing unauthorized content flashes by validating sessions on the server.

    Global Error Handling: Centralized Axios Interceptors for automated 401 (Unauthorized) redirection and 500 (Internal Server Error) toast notifications.

    Identity Management: Secure authentication flow with JWT and protected cookie storage.

🐳 DevOps & Deployment

    Multi-stage Docker Builds: Highly optimized Docker images (Node-alpine) for minimal footprint and fast deployment cycles.

    K8s Ready: Configured for Kubernetes environments with non-root user security and environment variable injection via build arguments.

    Scalable Infra: Designed to be deployed on Azure via Jenkins CI/CD pipelines.

📁 Project Structure

    src/
    ├── .
    ├── app
    │   ├── auth
    │   │   ├── login
    │   │   └── register
    │   ├── main
    │   ├── task
    │   │   ├── create
    │   │   └── [id]
    │   │       └── update
    │   └── user
    │       ├── profile
    │       └── update
    ├── core
    │   ├── api
    │   ├── const
    │   ├── dto
    │   │   ├── task
    │   │   └── user
    │   ├── entities
    │   ├── enums
    │   ├── exceptions
    │   ├── interfaces
    │   ├── res
    │   └── service
    │       ├── auth
    │       ├── task
    │       └── user
    └── shared
    ├── components
    │   ├── btn
    │   ├── btnDelete
    │   ├── btnFunc
    │   ├── btnRedirect
    │   ├── btnSubmit
    │   ├── btnUpdate
    │   ├── customDoneRadio
    │   ├── customPrioritySelect
    │   ├── customSpanError
    │   ├── customTextarea
    │   ├── drawer
    │   │   ├── btn
    │   │   └── ui
    │   ├── dropdown
    │   ├── errorState
    │   ├── footer
    │   ├── input
    │   ├── internalError
    │   ├── load
    │   ├── loadForm
    │   ├── logo
    │   ├── main
    │   ├── modal
    │   ├── navbar
    │   ├── notFound
    │   ├── pagination
    │   ├── passwordInput
    │   └── showTask
    ├── hooks
    │   └── user
    └── types

Prerequisites

    Node.js 20+

    Docker (Optional for containerization)

    Access to the [.NET Backend API]

Author

Anderson – Back-End Software Developer specialized in .NET, Java, and modern Web Ecosystems.