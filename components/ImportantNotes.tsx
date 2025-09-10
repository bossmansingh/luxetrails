import { poppinsFont } from "@/util/Constants";
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
  ...poppinsFont.style,
  whiteSpace: "pre-wrap",
  display: "block",
  fontWeight: "500",
  color: "black",
  fontSize: 14,
  lineHeight: 2,
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
        <span
          className={poppinsFont.className}
          style={textStyle}
          dangerouslySetInnerHTML={{ __html: airlinePolicyText }}
        />
      </div>
      <div style={containerStyle}>
        <span className={poppinsFont.className} style={titleStyle}>
          {hotelPolicyTitle}
        </span>
        <span
          className={poppinsFont.className}
          style={textStyle}
          dangerouslySetInnerHTML={{ __html: hotelPolicyText }}
        />
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
      <span
        className={poppinsFont.className}
        style={textStyle}
        dangerouslySetInnerHTML={{ __html: amendmentPolicyText }}
      />
    </div>
  );
};
