export default function UserAnswer() {
  return (
    <div className="flex flex-col flex-2 dark:bg-dark-card dark:text-white dark:border dark:border-dark-border text-sm bg-[#fff] rounded-[6px] px-[25px] py-[22px] gap-[20px]">
      <h1 className="text-sm font-semibold">View Comments</h1>
      <div className="dark:bg-dark-highlight bg-light-card p-[25px] rounded-[6px] text-sm leading-6 text-gray-700 dark:text-gray-300">
        <p>
        This is where the user's answer will be displayed. The answer should be well-structured, 
        comprehensive, and provide clear explanations to the question. It should include relevant 
        examples, code snippets if applicable, and follow best practices for the given topic.
        </p>
        <br />
        <p>
        This is where the user's answer will be displayed. The answer should be well-structured, 
        comprehensive, and provide clear explanations to the question. It should include relevant 
        examples, code snippets if applicable, and follow best practices for the given topic.
        </p>
      </div>
    </div>
  );
}
