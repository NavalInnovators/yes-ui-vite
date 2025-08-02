export default function TopicNameLabel({ topicName }) {
  return (
    <div className="flex w-fit items-center dark:bg-dark-more-highlighted dark:text-dark-text-muted relative justify-center gap-[5px] font-light bg-[rgba(230,230,230,1)] text-[14px] px-[15px] py-[4px] rounded-[10px]">
      <p>{topicName}</p>
    </div>
  );
}
