# Custom Schema for Quiz

We can upload custom questions for the quiz by following a strict JSON schema pattern. The questions schema will be inside an array of objects that each is a question with three properties namely `question`, `choices` (array of options), and `correctAnswer` (index of the correct option).

```json
{
    "quizTitle": "Title of Your Quiz",
    "questions": [
        {
            "question": "Question?",
            "choices": [
                "Option 0",
                "Option 1",
                "Option 2",
                "Option 3"
            ],
            "correctAnswer": 0
        }
    ]
}
```

## Basic Structure

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

### Required Fields

1. **quizTitle** (string)
   - The title of your quiz
   - Should be descriptive and relevant to the topic
   - Example: "JavaScript Fundamentals"

2. **questions** (array)
   - An array containing question objects
   - Minimum 10 questions required
   - Each question must have all required properties

3. For each question object:
   - **question** (string)
     - The actual question text
     - Must end with a question mark
     - Should be clear and unambiguous

   - **choices** (array)
     - Array of 4 possible answers
     - Must contain exactly 4 options
     - Each option should be unique

   - **correctAnswer** (number)
     - Index of the correct answer (0-3)
     - Corresponds to the index in the choices array

## Example Question

```json
{
  "quizTitle": "JavaScript Basics",
  "questions": [
    {
      "question": "What is the output of console.log(typeof [])?",
      "choices": [
        "object",
        "array",
        "undefined",
        "null"
      ],
      "correctAnswer": 0
    }
  ]
}
```

## Validation Rules

1. **File Format**
   - Must be valid JSON
   - File name should match the quiz ID (e.g., `javascript.json`)
   - UTF-8 encoding required

2. **Content Rules**
   - Questions must be unique within the quiz
   - All choices must be unique within each question
   - Questions should be technically accurate
   - Content must be appropriate and professional

3. **Formatting**
   - No HTML tags in questions or answers
   - Proper capitalization and punctuation
   - Code snippets should use proper formatting
   - Special characters must be properly escaped

## Testing Your Schema

Before submitting:

1. Validate your JSON using a JSON validator
2. Test the quiz in the development environment
3. Verify all questions and answers work correctly
4. Ensure the correct answer index matches the intended option

## Common Issues to Avoid

1. ❌ Missing required fields
2. ❌ Incorrect number of choices
3. ❌ Invalid correctAnswer index
4. ❌ Duplicate questions or choices
5. ❌ Malformed JSON
6. ❌ Improper file encoding

## Best Practices

1. ✅ Keep questions clear and concise
2. ✅ Use consistent formatting
3. ✅ Include a mix of difficulty levels
4. ✅ Test thoroughly before submitting

For more information on contributing new quizzes, please refer to the [CONTRIBUTING.md](./contributing.md) file.
