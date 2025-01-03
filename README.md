# V2 Cloud VM Management Dashboard

## Key Features

- **VM Lifecycle Management**: Create, view, and manage virtual machines effortlessly
- **SSH Key Management**: Secure and flexible SSH key handling
- **Responsive UI**: Modern, clean interface built with React and Tailwind CSS
- **Quick Configuration**: Instant VM updates with minimal friction

## Prerequisites

- Docker
- Docker Compose

## Quick Start

### Installation

```bash
git clone https://github.com/DisantHoridnt/v2cloud-assessment.git
cd v2cloud-assessment
```

### Running the Application

```bash
docker-compose up --build
```

🌐 Access the dashboard at: `http://localhost:8000/`

## Demo Videos

Experience the dashboard's features through these demonstration videos:

### 🎥 Feature Demonstrations

1. there was an issue with the build in this first video. In this video, you can see that it is not possible to save ssh to a vm that doesnt have one.
    - [▶️ Watch Demo #1](https://drive.google.com/file/d/13FTynGnsIHh9Xae0-B7pfDmMUNolCdm-/preview)

2. I quickly caught this bug and fixed it. Here is the video demonstrating that specific fix:
    - [▶️ Watch Demo #2](https://drive.google.com/file/d/1C1RLCj49lDl9be0soLVdt1C2ZNKqxWlm/preview)

3. Final Video which is a merge between Demo #1 and Demo #2:
    - [▶️ Watch Complete Demo Video](https://drive.google.com/file/d/1WvUxnowj6lLEjjC6eOJAKITI0iw51T2d/preview)    

## Technical Stack

- **Backend**: Django REST Framework
- **Frontend**: React
- **Styling**: Tailwind CSS
- **Containerization**: Docker

***

## Architectural Reasoning

<strong><mark>I went with a Django and React stack, Django gives us everything we need on the backend - a good ORM, built-in auth, and security, while letting us expose REST APIs through DRF.
On the frontend, React - its component model and hooks make state management straightforward, plus the ecosystem is massive which speeds up development.</mark></strong>

<strong><mark>I containerized everything with Docker, splitting the Django API (port 8000) and Webpack dev server (3000) into separate containers. This keeps things clean and makes both local development and deployment relatively easy.</mark></strong>

<strong><mark>For the database, I am using SQLite - I did consider using postgres as you can see in my commit history, it was an overkill. There was no need to overcomplicate things with a separate database server right now. That's why I went with the available sqlite option.</mark></strong>

<strong><mark>The API follows REST principles with clear endpoints and standard HTTP methods, while Django's serializers handle all our validation and data transformation needs.
The frontend is structured around a main VMGrid component with nested Controls and VMCard components - keeping things modular and maintainable.
I am using Tailwind CSS which has been great for rapid UI development and keeping our bundle size in check.</mark></strong>

<strong><mark>For development tooling, Webpack handles all our bundling and hot reloading, while Babel ensures our modern JS/JSX works everywhere. I've also put a strong emphasis on error handling throughout the stack, with proper try-catch blocks and validation on both client and server sides.</mark> </strong>

> At its core, we've got a clean client-server architecture where our React frontend talks to our Django backend over REST/HTTP using JSON. The data flow is straightforward - when you hit the API, it goes through Django views, gets validated by our serializers, hits the models layer, and then gets stored in SQLite. We've containerized everything using Docker, with Django running on port 8000 and Webpack on 3000, sharing a network that makes local development a breeze.
> For the UI, we took a component-driven approach centered around the VMGrid as our root container. Think of it as a smart orchestrator that manages two main parts: the Controls section up top and the VMCard list below. The Controls handle all your global interactions - there's a search bar for quick VM filtering, server location filters (montreal/washington/singapore), and sorting options for things like name or resource usage. Each VM is represented by a VMCard component that packs all the essential info in a dense but readable format. We kept the hierarchy shallow and focused on making common operations like searching and filtering feel instant and natural.
>The whole UI is built to be responsive and efficient - we're using React's state management through hooks to handle all the data and user interactions, while Tailwind CSS gives us the flexibility to make everything look clean and consistent without writing custom CSS. It's a pragmatic approach that prioritizes usability while keeping the codebase maintainable.

> The main container uses a responsive grid layout that adapts from one to three columns depending on screen size, with some nice padding and spacing to keep things breathable. For the VM cards themselves, we kept it clean with white backgrounds, subtle shadows, and a smooth hover effect that gives users that nice tactile feedback.
>All our interactive elements - buttons, inputs, filters - follow the same pattern: comfortable padding for easy clicking, clear hover states, and a consistent color scheme based on blue for primary actions. We made sure everything scales properly on mobile first, then enhances for larger screens. The typography follows a clear hierarchy: slightly larger, semibold text for headers, regular size for body content, and smaller text for things like status badges and metadata.
>One thing I'm particularly happy with is how we handled the interactive states. Every clickable element has this subtle but immediate feedback - a slight background shift, a gentle grow effect, or a smooth underline animation. Error states are immediately obvious with red borders and backgrounds, while success states use green. The whole UI just feels snappy and responsive, but we kept the animations subtle - quick 200ms transitions that don't get in the way.
>The best part about using Tailwind this way is that we get all this polish without writing any custom CSS. Everything's composed from utility classes, which keeps our bundle size tiny and makes it super easy for any developer to jump in and maintain consistent styling across the app.

---

## Commit Tree
![Commit Tree Visualization](images/commitTree1.png)