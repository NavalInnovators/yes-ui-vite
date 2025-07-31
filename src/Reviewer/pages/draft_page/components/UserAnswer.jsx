import { useContext } from "react";
import QuestionContext from "../context/QuestionContext";
import InfoLabel from "../../../components/InfoLabel";
import StarRating from "../../../components/StarRating";

export default function UserAnswer() {
  const question = useContext(QuestionContext);

  return (
    <div className="flex flex-col p-[30px] gap-[20px] bg-[#fff] rounded-[10px]">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h1 className="text-[18px]">User's Answer</h1>

        <InfoLabel value={question.answers_submitted_by_user} />
      </div>

      {/* User's Submitted Answer Section */}
      <div className="flex flex-col font-light text-[17px] bg-light-card rounded-[8px]">
        {/* Rated Stars */}
        <div className="flex items-center justify-between border-b-[1px] px-[30px] py-[20px] border-light-border pb-[15px]">
          <p className="bg-yellow-100 text-[15px] text-yellow-600 w-fit py-[2px] px-[15px] rounded-[7px]">
            {question.stars} Star
          </p>

          <StarRating
            defaultRating={Math.round(question.stars)}
            size={25}
            fixed={true}
          />
        </div>

        {/* Submitted Answer */}
        <div className="py-[26px] px-[30px] h-[320px] overflow-y-scroll custom-scrollbar">
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
          quas eaque ut molestiae consectetur quod. Voluptas minus deleniti
          officiis beatae reprehenderit eveniet provident illum, dolore officia
          iusto accusamus, exercitationem debitis veritatis asperiores omnis
          dolores voluptatem ab repudiandae laborum tempore suscipit, optio
          error modi. Expedita nulla perspiciatis accusamus fugit deserunt eum
          esse a fuga neque asperiores labore facere hic qui atque beatae eaque
          sunt ut ratione incidunt minus, id mollitia unde veniam dolorem!
          Quisquam laborum, corporis voluptate rerum quibusdam accusantium aut
          neque saepe earum dolores delectus accusamus itaque molestias iure
          velit, repudiandae sapiente cum modi, porro ullam amet magni. Sit aut
          vero alias nobis rerum animi natus porro omnis? Officia, odit,
          corrupti in consequatur aliquid fugit perferendis, voluptatum
          doloremque omnis unde quos eum mollitia commodi dolorum facere iure
          recusandae. Cumque voluptatem minima a provident quas illo ex incidunt
          officiis aspernatur quia corrupti impedit nostrum perferendis, libero,
          aperiam, pariatur nobis? Enim fuga voluptatibus, sit quo voluptatem
          autem, commodi aut itaque dicta ab aliquam impedit assumenda velit
          nesciunt earum, debitis dolorem dolore reprehenderit harum ullam.
        </div>
      </div>
    </div>
  );
}
