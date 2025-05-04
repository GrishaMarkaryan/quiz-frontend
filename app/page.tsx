"use client";
import { ChangeEvent, useRef, useState } from "react";

type Question = {
  id: number;
  text: string;
  options: {
    id: number;
    text: string;
    isCorrect: boolean;
  }[];
};

export default function Home() {
  const [text, setText] = useState<string>("");
  const [testCreated, setTestCreated] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});

  // Пример данных теста
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "Что нужно вставить в предложение?",
      options: [
        { id: 1, text: "was", isCorrect: false },
        { id: 2, text: "are", isCorrect: false },
        { id: 3, text: "is", isCorrect: true },
      ],
    },
    {
      id: 2,
      text: "Что нужно вставить в предложение?",
      options: [
        { id: 1, text: "was", isCorrect: false },
        { id: 2, text: "are", isCorrect: true },
        { id: 3, text: "am", isCorrect: false },
      ],
    },
  ]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleCreateTest = () => {
    // Здесь могла бы быть логика создания теста на основе введенного текста
    setTestCreated(true);
  };

  const handleAnswerSelect = (questionId: number, optionId: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionId,
    });
  };

  const checkAnswers = () => {
    let correctCount = 0;
    questions.forEach((question) => {
      const selectedOptionId = selectedAnswers[question.id];
      if (selectedOptionId) {
        const selectedOption = question.options.find(
          (opt) => opt.id === selectedOptionId
        );
        if (selectedOption?.isCorrect) correctCount++;
      }
    });
    alert(
      `Вы ответили правильно на ${correctCount} из ${questions.length} вопросов!`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center bg-stone-200 h-svh relative">
      <header className="flex gap-5">
        <div className="flex flex-col items-center py-[30px] text-3xl">
          <div>Тест на основе Искусственного Интеллекта</div>
          <div>
            от <span className="text-fuchsia-800">Why AI</span>
          </div>
        </div>
        <div>
          <div className="absolute right-0 top-0 p-[25px]">
            {" "}
            tg: @whyai_startups{" "}
          </div>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center gap-4 mb-[30px]">
        <div className="w-200 bg-white p-[20px] rounded-2xl">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            placeholder="Введите тему теста или вставьте сюда текст "
            className="w-full border-0 outline-none p-[10px] resize-none min-h-20"
          />
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white p-3 cursor-pointer rounded-xl text-base"
            onClick={handleCreateTest}
          >
            Создать тест
          </button>
        </div>
        {testCreated && (
          <div className="w-full bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-4">
              Тест на тему Present Simple:
            </h2>

            {questions.map((question) => (
              <div key={question.id} className="mb-6 last:mb-0">
                <h3 className="text-lg font-medium mb-2">
                  {question.id}. {question.text}
                </h3>
                <ul className="space-y-2">
                  {question.options.map((option) => (
                    <li key={option.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`q${question.id}-o${option.id}`}
                        name={`question-${question.id}`}
                        checked={selectedAnswers[question.id] === option.id}
                        onChange={() =>
                          handleAnswerSelect(question.id, option.id)
                        }
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`q${question.id}-o${option.id}`}
                        className="text-gray-700 cursor-pointer hover:text-gray-900 text-lg"
                      >
                        {option.text}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <button
              onClick={checkAnswers}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors w-full text-lg"
            >
              Проверить ответы
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
