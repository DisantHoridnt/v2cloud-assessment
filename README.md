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

## Commit Tree
![Commit Tree Visualization](images/commitTree.png)