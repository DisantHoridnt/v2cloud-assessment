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

Watch these demo videos to see the dashboard in action:

### VM Creation and Management Demo
<div align="center">
  <iframe
    width="700"
    height="400"
    src="https://drive.google.com/file/d/13FTynGnsIHh9Xae0-B7pfDmMUNolCdm-/preview"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

### SSH Key Management Demo
<div align="center">
  <iframe
    width="700"
    height="400"
    src="https://drive.google.com/file/d/1C1RLCj49lDl9be0soLVdt1C2ZNKqxWlm/preview"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

## Technical Stack

- **Backend**: Django REST Framework
- **Frontend**: React
- **Styling**: Tailwind CSS
- **Containerization**: Docker