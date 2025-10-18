# Task Manager Mobile App

A simple React Native mobile application demonstrating CRUD (Create, Read, Update, Delete) operations with modern development practices.

## Features

✅ **Create** - Add new tasks with title and description
✅ **Read** - View all tasks in a clean, organized list
✅ **Update** - Edit existing tasks and toggle completion status
✅ **Delete** - Remove tasks with confirmation dialog
✅ **Persistence** - Data saved locally using AsyncStorage
✅ **Dark Mode** - Automatic theme adaptation with proper contrast
✅ **Custom Icon** - Professional app icon with task management theme
✅ **Modern UI** - Clean, professional design with consistent styling

## Tech Stack

- **React Native** 0.72.6
- **TypeScript** for type safety
- **AsyncStorage** for local data persistence
- **React Hooks** (useState, useEffect)
- **FlatList** for efficient list rendering

## Screenshots & Demo

### 📱 App Features Showcase

<div align="center">

|             Dark Mode Support             |                  Task Management                  |              Edit Functionality              |                   Delete Confirmation                   |
| :---------------------------------------: | :------------------------------------------------: | :------------------------------------------: | :-----------------------------------------------------: |
| ![Dark Mode](screenshots/app-dark-mode.png) | ![Task List](screenshots/app-with-tasks-current.png) | ![Edit Task](screenshots/app-editing-task.png) | ![Delete Dialog](screenshots/app-delete-confirmation.png) |
|        Automatic dark/light theme        |           Create, view, and manage tasks           |          Edit existing tasks inline          |              Safe delete with confirmation              |

</div>

### ✨ Key Features Demonstrated

- **🌙 Dark Mode Support** - Automatically adapts to system theme with proper contrast
- **📝 Complete CRUD Operations** - Create, Read, Update, Delete with intuitive UI
- **✅ Task Status Management** - Toggle completion with visual feedback
- **🎨 Professional UI/UX** - Clean, modern design with consistent styling
- **💾 Data Persistence** - Tasks saved locally using AsyncStorage
- **🔒 Safe Operations** - Confirmation dialogs for destructive actions
- **📱 Native Performance** - Built with React Native for smooth interactions

## Quick Start

### Option 1: Docker (Recommended - No Setup Required!)

**Prerequisites:** Docker installed on your system

1. **Clone and navigate to the project:**

   ```bash
   cd /home/anish/Documents/Code/mobileApp
   ```
2. **Run with Docker Compose:**

   ```bash
   docker compose up -d
   ```
3. **Open your browser:**

   ```
   http://localhost:3000
   ```
4. **Stop the application:**

   ```bash
   docker compose down
   ```

### Option 2: Native React Native

**Prerequisites:**

- Node.js (>= 16)
- React Native CLI
- Android Studio (for Android) or Xcode (for iOS)

1. **Install dependencies:**

   ```bash
   npm install
   ```
2. **Start Metro bundler:**

   ```bash
   npm start
   ```
3. **Run on device/emulator:**

   For Android:

   ```bash
   npm run android
   ```

   For iOS:

   ```bash
   npm run ios
   ```

### Option 3: Web Version (Quick Demo)

1. **Start local web server:**

   ```bash
   cd web && python3 -m http.server 3000
   ```
2. **Open browser:**

   ```
   http://localhost:3000
   ```

## Building & Deployment

### 🐳 Docker Build & Deployment

#### Build Docker Image

```bash
# Build the Docker image
docker build -t task-manager-app .

# Run the container
docker run -d -p 3000:3000 --name task-manager task-manager-app

# View logs
docker logs task-manager

# Stop and remove container
docker stop task-manager && docker rm task-manager
```

#### Docker Compose (Recommended)

```bash
# Build and run with compose
docker compose up --build -d

# View logs
docker compose logs -f

# Stop and cleanup
docker compose down
```

### 📱 Android APK Build

#### Prerequisites for APK Build

- **Java 17** (OpenJDK recommended)
- **Android SDK** with Build Tools
- **Node.js** (>= 16)
- **React Native CLI**

#### Environment Setup

```bash
# Set Java 17 (adjust path as needed)
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Set Android SDK path
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### Build Debug APK

```bash
# Install dependencies
npm install

# Build debug APK
cd android
./gradlew assembleDebug

# APK location: android/app/build/outputs/apk/debug/app-debug.apk
```

#### Build Release APK

```bash
# Clean previous builds
cd android
./gradlew clean

# Build release APK
./gradlew assembleRelease

# APK location: android/app/build/outputs/apk/release/app-release.apk
```

#### Install APK on Device/Emulator

```bash
# Install debug APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Install release APK
adb install android/app/build/outputs/apk/release/app-release.apk

# Launch app
adb shell am start -n com.taskmanagerapp/.MainActivity
```

### 🚀 Production Deployment Options

#### 1. Web Version (Docker)

```bash
# Production build with Docker
docker build -t task-manager-prod .
docker run -d -p 80:3000 --name task-manager-prod task-manager-prod
```

#### 2. Android Distribution

- **Debug APK**: For testing and development
- **Release APK**: For production distribution
- **Google Play Store**: Upload release APK for public distribution
- **Firebase App Distribution**: For beta testing

#### 3. CI/CD Pipeline Example

```yaml
# .github/workflows/build.yml
name: Build APK
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Java 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
      - name: Build APK
        run: |
          npm install
          cd android && ./gradlew assembleRelease
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-release.apk
          path: android/app/build/outputs/apk/release/app-release.apk
```

## Code Structure

```
mobileApp/
├── App.tsx              # Main React Native component
├── web/
│   └── index.html      # Web version of the app
├── package.json         # React Native dependencies
├── web-package.json     # Web version package info
├── Dockerfile          # Docker container configuration
├── docker-compose.yml  # Docker Compose setup
├── .dockerignore       # Docker ignore file
├── index.js            # React Native entry point
├── app.json            # App configuration
├── metro.config.js     # Metro bundler config
├── babel.config.js     # Babel configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

## Key Implementation Details

### CRUD Operations

- **Create**: `addTask()` - Generates unique ID and adds to state
- **Read**: Tasks displayed via FlatList with real-time updates
- **Update**: `updateTask()` and `toggleTask()` for editing and status changes
- **Delete**: `deleteTask()` with confirmation dialog

### Data Persistence

Uses AsyncStorage to persist tasks between app sessions:

- `loadTasks()` - Retrieves saved tasks on app start
- `saveTasks()` - Automatically saves when tasks change

### State Management

Simple React state management with TypeScript interfaces:

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}
```

## Development Notes

This app was built to demonstrate:

- Clean, maintainable React Native code
- Proper TypeScript usage
- CRUD operation implementation
- Local data persistence
- Modern UI/UX practices
- Professional code structure

A comprehensive example of modern mobile development practices.

## Deployment Benefits

### 🐳 Docker Advantages

✅ **Zero Setup** - Just run `docker compose up -d`
✅ **Consistent Environment** - Works the same everywhere
✅ **Professional Deployment** - Shows DevOps knowledge
✅ **Easy Sharing** - Send the repo, run one command
✅ **Production Ready** - Includes health checks and proper configuration

### 📱 APK Distribution Benefits

✅ **Native Performance** - Full React Native capabilities
✅ **Offline Functionality** - Works without internet connection
✅ **Device Integration** - Access to native Android features
✅ **Professional Distribution** - Ready for Google Play Store
✅ **Easy Installation** - Single APK file for direct install

### 🚀 Multiple Deployment Options

- **Web Version**: Instant demo via browser
- **Docker Container**: Professional web deployment
- **Android APK**: Native mobile distribution
- **Development Build**: For testing and debugging

### 🎯 **Technical Features**

- **React Native Development** - Cross-platform mobile app development
- **TypeScript Integration** - Type-safe JavaScript development
- **State Management** - React hooks and local storage integration
- **UI/UX Design** - Modern, responsive design with dark mode support
- **CRUD Operations** - Complete data management functionality
- **Mobile Development** - Native Android app with custom icon
- **DevOps Integration** - Docker containerization and deployment
- **Version Control** - Clean Git workflow with meaningful commits
- **Documentation** - Comprehensive setup and build instructions

### 🚀 **Development Practices**

- **Clean Code Architecture** - Well-structured, maintainable codebase
- **Professional Git History** - Meaningful commits with proper messages
- **Multiple Deployment Options** - Web, Docker, and native mobile
- **Comprehensive Documentation** - Clear setup and build instructions
- **Visual Documentation** - Screenshots and feature demonstrations
- **Production Readiness** - Release builds and deployment strategies

### 📱 **Project Highlights**

- **Full-Stack Capability** - Frontend, mobile, and deployment
- **Modern Tech Stack** - Latest React Native and TypeScript
- **Professional UI** - Dark mode, custom icons, smooth interactions
- **Enterprise Practices** - Docker, CI/CD examples, proper documentation
- **Open Source Ready** - MIT license, contributing guidelines

## 📄 License

MIT License - Feel free to use this code for your own projects.

## 🤝 Contributing

This project welcomes contributions! Feel free to:

- Report bugs or issues
- Suggest new features
- Submit pull requests
- Use as a learning resource

Built with ❤️ for the developer community.
