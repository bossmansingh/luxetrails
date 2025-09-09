import { PageType, poppinsFont, styles } from "@/util/Constants";
import { useEffect, useState } from "react";
import ModelTitle from "@/components/modals/ModelTitle";
import ModelButtons from "./ModelButtons";

const SingleImageTextModel: React.FC<{
  pageType: PageType;
  onSave: (pageTitle: string, imageUrl: string, highlightText: string) => void;
  onClose: () => void;
}> = ({ pageType, onClose, onSave }) => {
  const [pageTitle, setPageTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [highlightText, setHighlightText] = useState("");
  useEffect(() => {
    if (pageType === PageType.HIGHLIGHTS) {
      setPageTitle("Highlights");
    }
  }, [pageType]);
  return (
    <>
      <ModelTitle pageType={pageType} />
      <input
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          height: "auto",
          marginTop: 20,
          padding: 10,
          alignContent: "center",
          justifyContent: "center",
          color: "white",
          backgroundColor: "black",
        }}
        placeholder="Highlight Image"
        type="file"
        onChange={(e) => {
          var result = e.target.files?.item(0);
          result && setImageUrl(URL.createObjectURL(result));
        }}
      />
      <input
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          height: "30px",
          marginTop: 10,
          paddingLeft: 12,
          paddingRight: 12,
        }}
        placeholder="Enter Page Title"
        type="text"
        value={pageTitle}
        onChange={(e) => setPageTitle(e.target.value)}
      />
      <textarea
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          minHeight: "120px",
          marginTop: 10,
          fontSize: 14,
          padding: 12,
        }}
        placeholder="Highlight Text"
        value={highlightText}
        onChange={(e) => setHighlightText(e.target.value)}
      />
      <ModelButtons
        onClose={onClose}
        onSave={() => onSave(pageTitle.toUpperCase(), imageUrl, highlightText)}
      />
    </>
  );
};

export default SingleImageTextModel;
