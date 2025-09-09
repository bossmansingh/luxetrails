import {
  BrandGreen,
  PageType,
  pageTypes,
  poppinsFont,
  styles,
} from "@/util/Constants";
import BackgroundLayer from "./BackgroundLayer";
import SectionPageHeadline from "./SectionPageHeadline";
import { useMemo } from "react";

const TermsCondition: React.FC<{ contentText: string }> = ({ contentText }) => {
  var selectedPage = useMemo(
    () => pageTypes.find((v) => v.value === PageType.TERMS),
    []
  );
  return (
    <>
      <div style={styles.sectionPage}>
        <BackgroundLayer addWatermark />
        <div style={styles.sectionPageContent}>
          <SectionPageHeadline
            title={selectedPage?.label ?? "TERMS & CONDITIONS"}
          />
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

export default TermsCondition;
