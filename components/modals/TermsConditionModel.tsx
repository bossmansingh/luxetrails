import { DefaultTermsCondition, PageType, poppinsFont } from "@/util/Constants";
import { useState } from "react";
import ModalButtons from "./ModelButtons";

const TermsConditionModal: React.FC<{
  onSave: (contentText: string) => void;
  onClose: () => void;
}> = ({ onSave, onClose }) => {
  const [terms, setTerms] = useState(DefaultTermsCondition);
  return (
    <>
      <textarea
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          minHeight: "150px",
          marginTop: 20,
          fontSize: 16,
          padding: 5,
        }}
        placeholder="Terms & Condition"
        value={terms}
        onChange={(e) => setTerms(e.target.value)}
      />
      <ModalButtons onClose={onClose} onSave={() => onSave(terms)} />
    </>
  );
};

export default TermsConditionModal;
