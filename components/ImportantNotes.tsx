import { ParagraphText, poppinsFont, TextToPoints } from "@/util/Constants";
import { CSSProperties } from "react";

const containerStyle: CSSProperties = {
  marginTop: 20,
  color: "black",
};
const titleStyle: CSSProperties = {
  ...poppinsFont.style,
  fontWeight: 700,
  fontSize: 16,
};
const textStyle: CSSProperties = {
  color: "black",
  fontSize: 14,
  lineHeight: 1.5,
};

export const ImportantNotesFirstPage: React.FC<{
  airlinePolicyTitle: string;
  airlinePolicyText: string;
  hotelPolicyTitle: string;
  hotelPolicyText: string;
}> = ({
  airlinePolicyTitle,
  airlinePolicyText,
  hotelPolicyTitle,
  hotelPolicyText,
}) => {
  return (
    <>
      <div style={containerStyle}>
        <span className={poppinsFont.className} style={titleStyle}>
          {airlinePolicyTitle}
        </span>
        <TextToPoints style={textStyle} text={airlinePolicyText} />
      </div>
      <div style={containerStyle}>
        <span className={poppinsFont.className} style={titleStyle}>
          {hotelPolicyTitle}
        </span>
        <TextToPoints style={textStyle} text={hotelPolicyText} />
      </div>
    </>
  );
};

export const ImportantNotesSecondPage: React.FC<{
  amendmentPolicyTitle: string;
  amendmentPolicyText: string;
}> = ({ amendmentPolicyTitle, amendmentPolicyText }) => {
  return (
    <div style={containerStyle}>
      <span className={poppinsFont.className} style={titleStyle}>
        {amendmentPolicyTitle}
      </span>
      <br />
      <ParagraphText style={{ ...textStyle }} text={amendmentPolicyText} />
    </div>
  );
};
