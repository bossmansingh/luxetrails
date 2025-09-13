import { InclusionExclusionModel, ParagraphText } from "@/util/Constants";
import SectionPageHeadline from "@/components//SectionPageHeadline";

const textStyle = {
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
      <ParagraphText style={textStyle} text={content.inclusion} />
      <div style={{ width: "100%", height: "100%" }}>
        <SectionPageHeadline
          title="EXCLUSIONS"
          customStyle={{ marginTop: 80 }}
        />
        <ParagraphText style={textStyle} text={content.exclusion} />
      </div>
    </>
  );
};

export default InclusionExclusion;
