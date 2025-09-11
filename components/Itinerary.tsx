import { cinzelFont, poppinsFont } from "@/util/Constants";
import CalendarIcon from "@/public/calendar_icon.jpg";
import Image from "next/image";
import parse from "html-react-parser";

const CalendarRow: React.FC<{ index: number; contentText: string }> = ({
  index,
  contentText,
}) => {
  return (
    <div
      style={{
        color: "black",
        display: "flex",
        justifyContent: "space-between",
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <Image src={CalendarIcon} alt="Calendar Icon" width={85} height={88} />
        <span
          className={cinzelFont.className}
          style={{
            ...cinzelFont.style,
            fontSize: 19,
            fontWeight: 600,
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#d4af37",
            textAlign: "center",
          }}
        >
          Day {index + 1}
        </span>
      </div>
      <span
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          fontWeight: 500,
          marginLeft: 10,
          fontSize: 22,
          width: "100%",
          justifySelf: "center",
          alignSelf: "center",
          height: "fit-content",
        }}
      >
        {parse(contentText)}
      </span>
    </div>
  );
};

const Itinerary: React.FC<{
  daysContent: string[];
}> = ({ daysContent }) => {
  return (
    <div
      style={{
        marginTop: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      {daysContent.map((value: string, index: number) => (
        <CalendarRow
          key={`${value}_${index}`}
          index={index}
          contentText={value}
        />
      ))}
    </div>
  );
};

export default Itinerary;
