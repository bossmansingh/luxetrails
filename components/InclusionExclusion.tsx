import { InclusionExclusionModel, TextToPoints } from "@/util/Constants";
import SectionPageHeadline from "@/components//SectionPageHeadline";

const InclusionExclusion: React.FC<{
  content: InclusionExclusionModel;
}> = ({ content }) => {
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
