import { BrandGreen, poppinsFont, styles } from "@/util/Constants";
import BackgroundLayer from "./BackgroundLayer";
import SectionPageHeadline from "./SectionPageHeadline";

const TermsConditionContent: React.FC<{ contentText: string }> = ({
  contentText,
}) => {
  return (
    <>
      <div style={styles.sectionPage}>
        <BackgroundLayer addWatermark />
        <div style={styles.sectionPageContent}>
          <SectionPageHeadline title={"TERMS & CONDITIONS"} />
          <span
            className={poppinsFont.className}
            style={{
              ...poppinsFont.style,
              whiteSpace: "pre-line",
              display: "block",
              fontWeight: 500,
              paddingTop: 24,
              paddingBottom: 24,
              color: BrandGreen,
              fontSize: 22,
              lineHeight: 2,
            }}
          >
            {contentText}
          </span>
        </div>
      </div>
    </>
  );
};

export default TermsConditionContent;
