# 🌟 Quizzly

## 🚀 Overview

**Quizzly** is a web application designed to test the knowledge of Frontend, Backend, and Web Developers. Built using **ReactJS** and **Vite**, this application provides a seamless and interactive quiz experience. The app features a **start page**, a **quiz interface**, and a **results page**, all styled with **Bootstrap** for a modern look.

## ✨ Features

- 📝 **Interactive Quiz**: Users can answer multiple-choice questions about React.js.
- ✅ **Real-time Feedback**: Immediate feedback on selected answers with visual indicators.
- 📊 **Score Calculation**: Users receive a score based on their performance.
- 📱 **Responsive Design**: The app is fully responsive and works on various devices.

## 🛠 Core Languages & Technologies

This app leverages the power of the following core languages and technologies:

- 🌐 **HTML**: Structure and layout of the application.
- 🎨 **CSS**: Styling, including Bootstrap for responsiveness and custom styles for uniqueness.
- ⚙️ **JavaScript**: Logic and interactivity for the quiz features.
- 🗂 **JSON**: Data format for storing quiz questions and answers.

Additionally, the app integrates these technologies:

- ⚛️ **React**: A JavaScript library for building user interfaces.
- 🌟 **Vite**: A blazing-fast development environment.
- 🖌 **Bootstrap**: A popular CSS framework for a cohesive design.
- 🔗 **React Bootstrap**: React components built with Bootstrap.

## 🔑 Dependencies

### Production Dependencies

- ⚛️ **react**: ^18.3.1 - Core React library
- 🏗 **react-dom**: ^18.3.1 - React DOM manipulation
- 🛣 **react-router-dom**: ^7.5.1 - Routing and navigation
- 🎨 **bootstrap**: ^5.3.5 - CSS framework for styling
- 🔗 **react-bootstrap**: ^2.10.9 - Bootstrap components for React

### Development Dependencies

- ⚡ **vite**: ^6.3.2 - Build tool and development server
- 🔌 **@vitejs/plugin-react**: ^4.4.1 - React plugin for Vite
- 📘 **@types/react**: ^18.3.20 - TypeScript definitions for React
- 📗 **@types/react-dom**: ^18.3.6 - TypeScript definitions for React DOM
- 🛡 **eslint**: ^9.25.0 - Code linting
- 🔍 **eslint-plugin-react**: ^7.37.5 - React specific linting rules
- 🔎 **eslint-plugin-react-hooks**: ^5.2.0 - Linting for React hooks
- 🎯 **eslint-plugin-react-refresh**: ^0.4.19 - React Refresh support for ESLint
- 📝 **react-markdown**: ^10.1.0 - Markdown rendering
- 🖼 **html2canvas**: ^1.4.1 - Screenshot and image generation
- 🛡 **react-error-boundary**: ^5.0.0 - Error handling for React components

## ⚙️ Installation & Setup

1. **Clone the repository**:

   ```bash
   $ git clone https://github.com/offensive-vk/reactjs-quiz-app.git
   ```

2. **Navigate to the project directory**:

   ```bash
   $ cd reactjs-quiz-app
   ```

3. **Install dependencies** (using pnpm):

   ```bash
   $ pnpm install
   ```

4. **Start development server**:

   ```bash
   $ pnpm run dev
   ```

5. **Build for production**:

   ```bash
   $ pnpm run build
   ```

6. **Preview production build**:

   ```bash
   $ pnpm run preview
   ```

## 🔧 Scripts

- `dev`: Runs the development server on port 17027
- `build`: Creates a production build with sourcemaps
- `preview`: Previews the production build in debug mode
- `optimize`: Runs Vite optimization
- `lint`: Runs ESLint for code quality checks
- `clean`: Cleans the dist directory
- `all`: Runs build and optimize commands sequentially

## 💻 System Requirements

- Node.js 22.x or higher (based on Dockerfile)
- pnpm 10.x or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Version Information

- **Current Version**: 2025.4.0
- **Node Engine**: >=22.0.0 (based on Dockerfile)
- **Package Manager**: pnpm@10.0.0

## 🎮 Development Configuration

The project includes additional configuration files:

- **deno.json**: Contains formatting rules and task definitions
  - Uses 4-space indentation
  - Line width: 80 characters
  - Single quotes preferred
  - Tab-based indentation
  - Excludes node_modules and dist directories

- **Dockerfile**:
  - Based on Node 22 Alpine
  - Exposes port 17027
  - Uses pnpm for package management
  - Includes optimization and build steps

## 🎮 Usage

- 🟢 **Start the Quiz**: Click the on any quiz type on the homepage.
- ❓ **Answer Questions**: Select an answer for each question and proceed to the next.
- 📜 **View Results**: After completing the quiz, view your score and restart if desired.

## 🖼 Crucial Files

Here are the files critical for the application's functionality:

- **📋 package.json**: Lists all dependencies and scripts.
- **⚙️ vite.config.js**: Configuration for Vite.
- **📂 src/context/dataContext.jsx**: Manages the state and logic for the quiz.
- **🗂 public/quiz.json**: Contains the default quiz questions and answers.
- **🗂 public/data/*.json**: Contains all of the quiz questions and answers.

## Custom Questions / Answer

You can also use your own quiz questions and answers. Have a look at the [Schema](./Schema.md).

## 🧑‍💻 Authors

This project was developed by **Mahak & Vedansh** as part of our BCA-VI Semester (Full Stack) *major project* for Software Project Management. 🌟

## 🪪 License

This project is licensed under the MIT License. See the [LICENSE](./license) file for details.

## 🔄 Updates and Versioning

- We use Semantic Versioning (SemVer)
- Major version updates may include breaking changes
- Minor versions add functionality in a backward-compatible manner
- Patch versions include backward-compatible bug fixes

---

<p align="center">
  <i>&copy; <a href="https://github.com/the-mehak/">Mehak</a> & <a href="https://github.com/offensive-vk/">Vedansh</a> 2024 - Present</i><br>
  <i>Licensed under <a href="https://github.com/offensive-vk/ReactQuizApp/tree/master/LICENSE">MIT</a></i><br>
  <a href="https://github.com/TheHamsterBot"><img src="https://i.ibb.co/4KtpYxb/octocat-clean-mini.png" /></a><br>
  <kbd>Thanks for visiting 😊</kbd>
</p>
