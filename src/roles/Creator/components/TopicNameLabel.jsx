export default function TopicNameLabel({ topicName }) {
    return (
      <div className="flex w-fit justify-center items-center dark:bg-dark-more-highlighted dark:text-dark-text-muted relative gap-[5px] font-light bg-[rgba(230,230,230,1)] text-xs px-[10px] py-[2px] rounded-[6px]">
        <p>{topicName}</p>
      </div>
    );
  }
  