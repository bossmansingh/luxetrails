import Image from "next/image";
import SectionPageHeadline from "@/components/SectionPageHeadline";
import { poppinsFont, styles } from "@/util/Constants";
import BackgroundLayer from "@/components/BackgroundLayer";

const SingleImageAndTextLayout: React.FC<{
  pageTitle: string;
  imageUrl: string;
  highlightText: string;
}> = ({ pageTitle, imageUrl, highlightText }) => {
  return (
    <>
      <div style={styles.sectionPage}>
        <BackgroundLayer addWatermark />
        <div style={styles.sectionPageContent}>
          <SectionPageHeadline title={pageTitle} />
          <Image
            style={{
              marginTop: 50,
              width: "100%",
              height: "auto",
              borderRadius: 8,
              overflow: "clip",
            }}
            src={imageUrl}
            alt="Single Image"
            width={300}
            height={300}
          />
          <span
            className={poppinsFont.className}
            style={{
              ...poppinsFont.style,
              whiteSpace: "pre-wrap",
              display: "block",
              fontWeight: "500",
              padding: 24,
              color: "black",
              fontSize: 18,
              lineHeight: 2,
            }}
          >
            {highlightText}
          </span>
        </div>
      </div>
    </>
  );
};

export default SingleImageAndTextLayout;
