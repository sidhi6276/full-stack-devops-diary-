# 📖 Full Stack DevOps Diary

A production-ready personal diary application built with a complete DevOps pipeline, featuring containerization, automated CI/CD, cloud deployment, and Kubernetes orchestration.

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS](https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

---

## 🌐 Live Links

| Service | URL |
|---------|-----|
| 🌍 Live Application | [http://52.66.23.220:80](http://52.66.23.220:80) |
| ☸️ Kubernetes App | [http://3.110.132.84:8888](http://3.110.132.84:8888) |
| 🔁 Jenkins Dashboard | [http://52.66.23.220:8080](http://52.66.23.220:8080) |
| 🐳 Backend Image | [sidhigoel/diary-backend](https://hub.docker.com/r/sidhigoel/diary-backend) |
| 🐳 Frontend Image | [sidhigoel/diary-frontend](https://hub.docker.com/r/sidhigoel/diary-frontend) |

---

## 🎯 Project Overview

This project demonstrates a real-world DevOps workflow — from writing code to automated deployment on cloud infrastructure. The application allows users to write personal diary entries with mood tracking, while the infrastructure handles automated building, testing, and deployment through a Jenkins CI/CD pipeline and Kubernetes orchestration.

---

## ✨ Features

- ✅ Create, read, update and delete diary entries
- 😊 Mood tracking per entry — Happy, Sad, Neutral, Excited, Angry
- 📅 Date-wise entry sorting
- 🐳 Fully containerized with Docker
- 🔁 Automated CI/CD pipeline with Jenkins
- ☁️ Deployed on AWS EC2
- ☸️ Orchestrated with Kubernetes — namespace isolation, replicas, persistent volumes
- 🗄️ Persistent data storage with MongoDB volumes

---

## 🏗️ System Architecture
```
Developer (Code Push)
        │
        ▼
  GitHub Repository
        │
        ▼
  Jenkins Pipeline
  ┌─────────────────────────────────┐
  │  Stage 1 → Checkout Code        │
  │  Stage 2 → Build Backend Image  │
  │  Stage 3 → Build Frontend Image │
  │  Stage 4 → Push to Docker Hub   │
  │  Stage 5 → Deploy on EC2        │
  └─────────────────────────────────┘
        │
        ▼
  Docker Compose (AWS EC2)          Kubernetes Cluster (Kind)
  ┌───────────────────────┐         ┌───────────────────────────────┐
  │ Nginx Frontend :80    │         │ Namespace: diary-app          │
  │ Node.js Backend :5000 │         │ ├── frontend-deployment (×2)  │
  │ MongoDB :27017        │         │ ├── backend-deployment  (×2)  │
  └───────────────────────┘         │ ├── mongo-deployment    (×1)  │
                                    │ └── mongo-pvc (1Gi storage)   │
                                    └───────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose ODM |
| Web Server | Nginx (Alpine) |
| Containerization | Docker, Docker Compose |
| CI/CD | Jenkins Pipeline |
| Orchestration | Kubernetes (Kind Cluster) |
| Cloud Infrastructure | AWS EC2 (Ubuntu 24.04) |
| Container Registry | Docker Hub |

---

## 📁 Project Structure
```
full-stack-devops-diary/
│
├── backend/
│   ├── models/
│   │   └── Entry.js               # MongoDB Schema & Model
│   ├── routes/
│   │   └── entries.js             # REST API Routes
│   ├── server.js                  # Express Application
│   ├── package.json               # Dependencies
│   └── Dockerfile                 # Backend Container Config
│
├── frontend/
│   ├── index.html                 # Single Page Application
│   └── Dockerfile                 # Nginx Container Config
│
├── k8s/
│   ├── namespace.yml              # diary-app Namespace
│   ├── mongo-pvc.yml              # Persistent Volume Claim
│   ├── mongo-deployment.yml       # MongoDB Deployment
│   ├── mongo-service.yml          # MongoDB ClusterIP Service
│   ├── backend-deployment.yml     # Node.js Deployment (×2 replicas)
│   ├── backend-service.yml        # Backend ClusterIP Service
│   ├── frontend-deployment.yml    # Nginx Deployment (×2 replicas)
│   └── frontend-service.yml       # Frontend NodePort Service
│
├── docker-compose.yml             # Multi-container Orchestration
├── Jenkinsfile                    # CI/CD Pipeline Definition
└── README.md
```

---

## ⚙️ CI/CD Pipeline

The Jenkins pipeline automates the entire build and deployment process:
```
Stage 1 — Checkout      : Verify source code and project files
Stage 2 — Build Backend : Build Node.js Docker image
Stage 3 — Build Frontend: Build Nginx Docker image
Stage 4 — Push to Hub   : Push versioned images to Docker Hub
Stage 5 — Deploy App    : Pull latest images and restart containers
```

Each build is tagged with the Jenkins `BUILD_NUMBER` for version tracking.

---

## ☸️ Kubernetes Setup

The application is orchestrated using a Kind (Kubernetes in Docker) cluster with 1 control plane and 3 worker nodes.

### Cluster Info
```
NAME                        STATUS   ROLES
tws-cluster-control-plane   Ready    control-plane
tws-cluster-worker          Ready    worker
tws-cluster-worker2         Ready    worker
tws-cluster-worker3         Ready    worker
```

### K8s Resources

| Resource | Type | Replicas |
|----------|------|----------|
| frontend-deployment | Deployment | 2 |
| backend-deployment | Deployment | 2 |
| mongo-deployment | Deployment | 1 |
| frontend-service | NodePort :30080 | — |
| backend-service | ClusterIP :5000 | — |
| mongo-service | ClusterIP :27017 | — |
| mongo-pvc | PersistentVolumeClaim 1Gi | — |

### Deploy on Kubernetes
```bash
# Clone the repository
git clone https://github.com/sidhi6276/full-stack-devops-diary-.git
cd full-stack-devops-diary-/k8s

# Apply in order
kubectl apply -f namespace.yml
kubectl apply -f mongo-pvc.yml
kubectl apply -f mongo-deployment.yml
kubectl apply -f mongo-service.yml
kubectl apply -f backend-deployment.yml
kubectl apply -f backend-service.yml
kubectl apply -f frontend-deployment.yml
kubectl apply -f frontend-service.yml

# Check status
kubectl get all -n diary-app

# Access the app
kubectl port-forward -n diary-app service/frontend-service 8888:80 --address=0.0.0.0
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/entries` | Fetch all diary entries |
| `POST` | `/api/entries` | Create a new entry |
| `PUT` | `/api/entries/:id` | Update an existing entry |
| `DELETE` | `/api/entries/:id` | Delete an entry |

### Sample Request
```json
POST /api/entries
{
  "title": "My First Entry",
  "content": "Today was a great day!",
  "mood": "happy"
}
```

---

## 📸 Screenshots

### 🌐 Live Application
![Diary App](screenshot/Screenshot%20(746).png)

---

## 🚀 Getting Started Locally

### Prerequisites
- Docker Desktop installed
- Git installed

### Run with Docker Compose
```bash
# Clone the repository
git clone https://github.com/sidhi6276/full-stack-devops-diary-.git
cd full-stack-devops-diary-

# Start all services
docker-compose up --build

# Access the application
# Frontend : http://localhost:80
# Backend  : http://localhost:5000
```

---

## 🔑 Key Learnings

- Containerizing a multi-service application with Docker and Docker Compose
- Setting up a Jenkins CI/CD pipeline from scratch
- Managing Docker Hub as a container registry
- Deploying and managing applications on AWS EC2
- Handling persistent data storage with Docker named volumes
- Securing credentials using Jenkins Credential Manager
- Kubernetes namespace isolation and resource organization
- Writing Deployment and Service manifests for multi-tier applications
- Managing persistent storage with PersistentVolumeClaims in Kubernetes
- Multi-replica deployments for high availability

---

## 👩‍💻 Author

**Sidhi Goel**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sidhi6276)
[![Docker Hub](https://img.shields.io/badge/Docker_Hub-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/u/sidhigoel)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

> ⭐ If you found this project helpful, please consider giving it a star!
