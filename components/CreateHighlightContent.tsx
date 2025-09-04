import { styles } from "@/util/Constants";
import { useState } from "react";

const CreateHighlightContent: React.FC<{
  onSave: (imageUrl: string, highlightText: string) => void;
  onClose: () => void;
}> = ({ onClose, onSave }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [highlightText, setHighlightText] = useState("");
  return (
    <>
      <h1>Enter Highlight Info</h1>
      <input
        style={{
          width: "100px",
          height: "auto",
          marginTop: 20,
        }}
        placeholder="Highlight Image"
        type="file"
        onChange={(e) => {
          var result = e.target.files?.item(0);
          result && setImageUrl(URL.createObjectURL(result));
        }}
      />
      <textarea
        style={{
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
        style={styles.modalButton}
        onClick={() => {
          onSave(imageUrl, highlightText);
          onClose();
        }}
      >
        SAVE
      </button>
      <button style={styles.modalButton} onClick={onClose}>
        CLOSE
      </button>
    </>
  );
};

export default CreateHighlightContent;
