import { InclusionExclusionModel, poppinsFont } from "@/util/Constants";
import SectionPageHeadline from "@/components//SectionPageHeadline";

const textStyle = {
  ...poppinsFont.style,
  width: "100%",
  height: "auto",
  marginTop: 20,
  whiteSpace: "pre-wrap",
  display: "block",
  fontWeight: "500",
  padding: 24,
  color: "black",
  fontSize: 18,
  lineHeight: 2,
};
const InclusionExclusion: React.FC<{
  content: InclusionExclusionModel;
}> = ({ content }) => {
  return (
    <>
      <span
        className={poppinsFont.className}
        dangerouslySetInnerHTML={{ __html: content.inclusion }}
        style={textStyle}
      />
      <div style={{ width: "100%", height: "100%" }}>
        <SectionPageHeadline
          title="EXCLUSIONS"
          customStyle={{ marginTop: 80 }}
        />
        <span
          className={poppinsFont.className}
          dangerouslySetInnerHTML={{ __html: content.exclusion }}
          style={textStyle}
        />
      </div>
    </>
  );
};

export default InclusionExclusion;
