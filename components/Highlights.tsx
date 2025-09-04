import Image from "next/image";
import SectionPageHeadline from "@/components/SectionPageHeadline";
import { poppinsFont, styles } from "@/util/Constants";
import BackgroundLayer from "@/components/BackgroundLayer";

const Highlights: React.FC<{ imageUrl: string; highlightText: string }> = ({
  imageUrl,
  highlightText,
}) => {
  return (
    <>
      <div style={styles.sectionPage}>
        <BackgroundLayer addWatermark />
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: 80,
          }}
        >
          <SectionPageHeadline title={"HIGHLIGHTS"} />
          <Image
            style={{
              marginTop: 50,
              width: "100%",
              objectFit: "cover",
              borderRadius: 8,
            }}
            src={imageUrl}
            alt="Highlight Image"
            width={300}
            height={300}
            objectFit="cover"
          />
          <span
            className={poppinsFont.className}
            style={
              (poppinsFont.style,
              {
                whiteSpace: "pre-wrap",
                display: "block",
                fontWeight: "500",
                padding: 24,
                color: "black",
                fontSize: 18,
                lineHeight: 2,
              })
            }
          >
            {highlightText}
          </span>
        </div>
      </div>
    </>
  );
};

export default Highlights;
