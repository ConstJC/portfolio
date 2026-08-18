"use client"

const STARTER_QUESTIONS = [
  "What services do you offer?",
  "Can I see some of your projects?",
  "How long does a project usually take?",
  "How can I get in touch?",
]

interface StarterQuestionsProps {
  onSelect: (question: string) => void
}

export default function StarterQuestions({ onSelect }: StarterQuestionsProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="text-sm text-text2">Ask me anything about Jay&apos;s work, or try one of these:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {STARTER_QUESTIONS.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => onSelect(question)}
            className="rounded-full border border-border2 bg-card2 px-3 py-1.5 text-xs text-text cursor-pointer hover:border-primary-border hover:bg-primary-light hover:text-primary"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}
