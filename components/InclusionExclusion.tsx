import { poppinsFont } from "@/util/Constants";
import SectionPageHeadline from "./SectionPageHeadline";

const InclusionExclusion: React.FC<{
  inclusion: string;
  exclusion: string;
}> = ({ inclusion, exclusion }) => {
  return (
    <>
      <span
        className={poppinsFont.className}
        style={{
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
        }}
      >
        {inclusion}
      </span>
      <div style={{ width: "100%", height: "100%" }}>
        <SectionPageHeadline
          title="EXCLUSIONS"
          customStyle={{ marginTop: 80 }}
        />
        <span
          className={poppinsFont.className}
          style={{
            ...poppinsFont.style,
            marginTop: 20,
            whiteSpace: "pre-wrap",
            display: "block",
            fontWeight: "500",
            padding: 24,
            color: "black",
            fontSize: 18,
            lineHeight: 2,
          }}
        >
          {exclusion}
        </span>
      </div>
    </>
  );
};

export default InclusionExclusion;
