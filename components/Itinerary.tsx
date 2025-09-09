import { poppinsFont, styles } from "@/util/Constants";
import BackgroundLayer from "@/components/BackgroundLayer";
import SectionPageHeadline from "@/components/SectionPageHeadline";
import CalendarIcon from "@/public/calendar_icon.jpg";
import Image from "next/image";

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
          className={poppinsFont.className}
          style={{
            ...poppinsFont.style,
            fontSize: 19,
            fontWeight: 500,
            position: "absolute",
            top: "58%",
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
        {contentText}
      </span>
    </div>
  );
};

const ItineraryContent: React.FC<{
  pageTitle: string;
  daysContent: string[];
}> = ({ pageTitle, daysContent }) => {
  return (
    <div style={styles.sectionPage}>
      <BackgroundLayer addWatermark />
      <div style={styles.sectionPageContent}>
        <SectionPageHeadline title={pageTitle} />
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
      </div>
    </div>
  );
};

export default ItineraryContent;
