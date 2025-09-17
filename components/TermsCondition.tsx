import { BrandGreen, ParagraphText, TextToPoints } from "@/util/Constants";

const TermsCondition: React.FC<{ contentText: string }> = ({ contentText }) => {
  return (
    <TextToPoints
      style={{
        fontWeight: 500,
        paddingTop: 24,
        paddingBottom: 24,
        fontSize: 18,
        lineHeight: 2,
      }}
      text={contentText}
    />
  );
};

export default TermsCondition;
