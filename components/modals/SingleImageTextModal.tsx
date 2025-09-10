import { PageType, poppinsFont } from "@/util/Constants";
import { useEffect, useState } from "react";
import ModalButtons from "@/components/modals/ModelButtons";

const SingleImageTextModal: React.FC<{
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
          height: "40px",
          fontSize: 14,
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
      <ModalButtons
        onClose={onClose}
        onSave={() => onSave(pageTitle.toUpperCase(), imageUrl, highlightText)}
      />
    </>
  );
};

export default SingleImageTextModal;
