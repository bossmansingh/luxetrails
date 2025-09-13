import { BrandGreen, ParagraphText } from "@/util/Constants";

const TermsCondition: React.FC<{ contentText: string }> = ({ contentText }) => {
  return (
    <ParagraphText
      style={{
        whiteSpace: "pre-line",
        display: "block",
        fontWeight: 500,
        paddingTop: 24,
        paddingBottom: 24,
        color: BrandGreen,
        fontSize: 22,
        lineHeight: 2,
      }}
      text={contentText}
    />
  );
};

export default TermsCondition;
