# Custom Schema for Quiz

We can upload custom questions for the quiz by following an strict json schema pattern. The questions schema will be inside an array of objects that each is a question with four properties namely `quizTitle`, `question`, `answer` and `options` which is an array of string to choose from the quiz.

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
            "correctAnswer": "correct option index"
        },
        { ... }
    ]
}
```
