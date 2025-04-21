# ✨ Contributing ✨

Thank you for your interest in contributing to the React JS Quiz App! This document will guide you through the process of adding new quiz topics to our application.

## 📝 How to Contribute a New Quiz Topic

### 1. Quiz Topic Structure

Each quiz topic in our application requires the following components:

  ```json
  {
      "id": "your-quiz-id",
      "title": "Your Quiz Title",
      "icon": "URL to your quiz icon"
  }
  ```

### 2. Required Files

To add a new quiz topic, you'll need to prepare:

1. **Quiz JSON File**
   - Create a new JSON file in `public/data/your-quiz-id.json`
   - Follow this structure for questions:

   ```json
   {
     "quizTitle": "Your Quiz Title",
     "questions": [
       {
         "question": "Your question text here?",
         "choices": [
           "Option 1",
           "Option 2",
           "Option 3",
           "Option 4"
         ],
         "correctAnswer": 0
       }
     ]
   }
   ```

   - Minimum 10 questions required
   - Each question must have 4 choices
   - `correctAnswer` index should be 0-3 (corresponding to the correct choice)

2. **Icon Requirements**
   - SVG format preferred
   - Host on a reliable CDN (we recommend using jsdelivr.net)
   - Icon should be relevant to the quiz topic
   - Size: 48x48px recommended

### 3. Submission Process

1. **Fork the Repository**

   ```bash
   git clone https://github.com/offensive-vk/reactjs-quiz-app.git
   cd reactjs-quiz-app
   ```

2. **Create a New Branch**

   ```bash
   git checkout -b quiz/your-quiz-name
   ```

3. **Add Your Files**
   - Place your quiz JSON file in `public/data/`
   - Update `src/components/Start.jsx` by adding your quiz type to the `quizTypes` array:

   ```jsx
   {
     id: 'your-quiz-id',
     title: 'Your Quiz Title',
     icon: 'https://cdn.jsdelivr.net/gh/your-cdn-path/icon.svg'
   }
   ```

4. **Test Your Changes**
   - Run the application locally
   - Test your quiz thoroughly
   - Ensure all questions and answers are correct
   - Verify the icon displays properly

5. **Create a Pull Request**
   - Push your changes to your fork
   - Create a pull request to our main repository
   - Use the title format: `[New Quiz] Your Quiz Topic Name`
   - Include in the description:
     - Brief description of the quiz topic
     - Number of questions included
     - Screenshot of the quiz icon in the menu
     - Any additional notes or special considerations

### 4. Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Quiz JSON file follows the correct format
- [ ] Minimum 10 questions included
- [ ] All questions have 4 choices
- [ ] Correct answers are properly indexed
- [ ] Icon is properly hosted and accessible
- [ ] Quiz type added to `Start.jsx`
- [ ] All questions are grammatically correct
- [ ] No duplicate questions exist
- [ ] Content is appropriate and relevant

## 🚀 Development Setup

If you want to test your changes locally:

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start development server:

   ```bash
   pnpm run dev
   ```

3. Access the application at `http://localhost:17027`

## ⚖️ Guidelines

1. **Content Quality**
   - Questions should be clear and unambiguous
   - Technical accuracy is crucial
   - Proper grammar and spelling required
   - No offensive or inappropriate content

2. **Formatting**
   - Follow existing code style
   - Use proper indentation
   - Include comments where necessary

3. **Icons**
   - Use professional, relevant icons
   - Ensure consistent style with existing icons
   - Verify icon displays correctly at different sizes

## 🤝 Review Process

1. Maintainers will review your PR within 1-2 weeks.
2. Changes may be requested if needed.
3. Once approved, your quiz will be merged into the main application.

## ❓ Questions?

If you have any questions or need help:

1. Open an [issue](https://github.com/offensive-vk/reactjs-quiz-app/issues/new) for any queries.
2. Comment on your [PR](https://github.com/offensive-vk/reactjs-quiz-app/pulls) for specific questions about your contribution.
3. Contact the maintainers through the project's GitHub issues or mention them in PR.

Thank you for contributing to making our this project better! 🎉

---

<p align="center">
  <i>Happy Contributing! 🚀</i>
</p>
