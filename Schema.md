# Custom Schema for Quiz

We can upload custom questions for the quiz by following an strict json schema pattern. The questions schema will be inside an array of objects that each is a question with four properties namely `quizTitle`, `question`, `correctAnswer` and `choices` which is an array of string to choose from the quiz.

```json
{
    "quizTitle": "Title of Your Quiz",
    "questions": [
        {
            "question" : "Question?",
            "choices": [
                "Option 0",
                "Option 1",
                "Option 2",
                "Option 3"
            ],
            "correctAnswer": "correct option"
        },
        { ... }
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
      "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
      ],
      "correct": 0,
      "explanation": "Optional explanation for the correct answer"
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

   - **options** (array)
     - Array of 4 possible answers
     - Must contain exactly 4 options
     - Each option should be unique

   - **correct** (number)
     - Index of the correct answer (0-3)
     - Corresponds to the index in the options array

   - **explanation** (string, optional)
     - Explanation of why the answer is correct
     - Helpful for learning purposes

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
      "correctAnswer": 0,
      "explanation": "In JavaScript, arrays are actually objects, so typeof [] returns 'object'"
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
   - All options must be unique within each question
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
2. ❌ Incorrect number of options
3. ❌ Invalid correct answer index
4. ❌ Duplicate questions or options
5. ❌ Malformed JSON
6. ❌ Improper file encoding

## Best Practices

1. ✅ Keep questions clear and concise
2. ✅ Provide helpful explanations
3. ✅ Use consistent formatting
4. ✅ Include a mix of difficulty levels
5. ✅ Test thoroughly before submitting

For more information on contributing new quizzes, please refer to the [CONTRIBUTING.md](./CONTRIBUTING.md) file.
