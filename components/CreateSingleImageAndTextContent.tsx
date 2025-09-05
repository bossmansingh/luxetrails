import { poppinsFont, styles } from "@/util/Constants";
import { useState } from "react";

const CreateSingleImageAndTextContent: React.FC<{
  onSave: (pageTitle: string, imageUrl: string, highlightText: string) => void;
  onClose: () => void;
}> = ({ onClose, onSave }) => {
  const [pageTitle, setPageTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [highlightText, setHighlightText] = useState("");
  return (
    <>
      <h1 className={poppinsFont.className} style={poppinsFont.style}>
        Enter Page Info
      </h1>
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
          marginTop: 20,
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
          marginTop: 20,
          fontSize: 14,
          padding: 5,
        }}
        placeholder="Highlight Text"
        value={highlightText}
        onChange={(e) => setHighlightText(e.target.value)}
      />
      <button
        className={poppinsFont.className}
        style={{ ...styles.modalButton, ...poppinsFont.style }}
        onClick={() => {
          onSave(pageTitle.toUpperCase(), imageUrl, highlightText);
          onClose();
        }}
      >
        SAVE
      </button>
      <button
        className={poppinsFont.className}
        style={{ ...styles.modalButton, ...poppinsFont.style }}
        onClick={onClose}
      >
        CLOSE
      </button>
    </>
  );
};

export default CreateSingleImageAndTextContent;
