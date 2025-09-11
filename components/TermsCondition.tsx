import { BrandGreen, poppinsFont } from "@/util/Constants";
import parse from "html-react-parser";

const TermsCondition: React.FC<{ contentText: string }> = ({ contentText }) => {
  return (
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
      {parse(contentText)}
    </span>
  );
};

export default TermsCondition;
