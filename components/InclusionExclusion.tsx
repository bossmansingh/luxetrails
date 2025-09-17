import {
  InclusionExclusionModel,
  poppinsFont,
  renderMarkdown,
  TextToPoints,
} from "@/util/Constants";
import SectionPageHeadline from "@/components//SectionPageHeadline";
import { useMemo } from "react";

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
  const inclusionPoints = useMemo(() => {
    return content.inclusion.split("\n").filter((v) => v.length > 0);
  }, [content.inclusion]);
  const exclusionPoints = useMemo(() => {
    return content.exclusion.split("\n").filter((v) => v.length > 0);
  }, [content.exclusion]);
  return (
    <>
      <TextToPoints text={content.inclusion} />
      <div style={{ width: "100%", height: "100%" }}>
        <SectionPageHeadline
          title="EXCLUSIONS"
          customStyle={{ marginTop: 80 }}
        />
        <TextToPoints text={content.exclusion} />
      </div>
    </>
  );
};

export default InclusionExclusion;
