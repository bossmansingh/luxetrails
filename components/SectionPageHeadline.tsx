import { BrandGreen, cinzelFont, styles } from "@/util/Constants";
import { CSSProperties } from "react";

const HeaderLine: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: BrandGreen,
        width: "100%",
        height: "8px",
        borderRadius: "8px",
      }}
    />
  );
};
const SectionPageHeadline: React.FC<{
  title: string;
  customStyle?: CSSProperties;
}> = ({ title, customStyle }) => {
  return (
    <div style={customStyle}>
      <HeaderLine />
      <h1
        className={cinzelFont.className}
        style={{ ...cinzelFont.style, ...styles.headerTitle }}
      >
        {title}
      </h1>
      <HeaderLine />
    </div>
  );
};

export default SectionPageHeadline;
