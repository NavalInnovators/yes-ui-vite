import { useContext } from "react";
import QuestionContext from "../context/QuestionContext";
import InfoLabel from "../../../components/InfoLabel";
import StarRating from "../../../components/StarRating";

export default function UserAnswer() {
  const { question } = useContext(QuestionContext);

  if (!question) {
    return <div className="p-[20px]">Loading...</div>;
  }

  return (
    <div className="dark:bg-dark-card dark:text-white dark:border dark:border-dark-border flex flex-col flex-1 px-[25px] py-[22px] gap-[20px] bg-[#fff] rounded-[10px]">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h1 className="text-sm">User's Answer</h1>

        <InfoLabel value={question?.answers_submitted_by_user} />
      </div>

      {/* User's Submitted Answer Section */}
      <div className="dark:bg-dark-highlight dark:border dark:border-dark-border dark:text-white flex flex-col font-light text-sm bg-light-card rounded-[6px]">
        {/* Rated Stars */}
        <div className="flex items-center justify-between border-b-[1px] p-[25px] border-light-border dark:border-dark-border pb-[15px]">
          <p className="bg-[oklch(98.5%_0.09_101.54)] text-xs text-yellow-700 w-fit py-[2px] px-[10px] rounded-[7px]">
            {question?.stars} Star
          </p>

          <StarRating
            defaultRating={Math.round(question?.stars)}
            size={17}
            fixed={true}
          />
        </div>

        {/* Submitted Answer */}
        <div className="p-[25px] overflow-y-scroll custom-scrollbar">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta itaque
          praesentium adipisci, vero iure omnis atque nobis perspiciatis
          doloremque magni, velit amet vel. Doloremque, ipsa magnam molestiae
          sunt dolor nihil aut inventore ex, sed quod reprehenderit! Illo
          explicabo pariatur distinctio magnam, magni ullam quod laborum
          accusantium doloremque earum eaque perspiciatis! Ratione consectetur
          neque in itaque, fugiat odit enim, sint dolorum maxime inventore
          expedita modi commodi voluptate ducimus eos beatae tempora rerum? Eum
          et mollitia labore repellat eveniet. Ipsum, pariatur esse eaque animi
          nostrum amet commodi reprehenderit earum, at eius obcaecati itaque
          molestiae nam temporibus iure suscipit enim ipsam vel reiciendis
          nesciunt delectus minima nihil dicta? Doloremque ab minima magni cum
          nemo alias maiores a totam, voluptates maxime architecto sequi ut
          rerum eveniet? Accusamus laudantium commodi illo tempora rem
          voluptatibus consectetur ratione iste ut? Consequuntur error a dicta
          quas eaque ut molestiae consectetur quod.
        </div>
      </div>
    </div>
  );
}
