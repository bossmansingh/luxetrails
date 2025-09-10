import { poppinsFont } from "@/util/Constants";
import { useState } from "react";
import ModalButtons from "./ModelButtons";

const InclusionExclusionModal: React.FC<{
  onSave: (inclusion: string, exclusion: string) => void;
  onClose: () => void;
}> = ({ onSave, onClose }) => {
  const [inclusion, setInclusion] = useState("");
  const [exclusion, setExclusion] = useState("");
  return (
    <>
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
        placeholder="Enter Inclusion Text"
        value={inclusion}
        onChange={(e) => setInclusion(e.target.value)}
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
        placeholder="Enter Exclusion Text"
        value={exclusion}
        onChange={(e) => setExclusion(e.target.value)}
      />
      <ModalButtons
        onClose={onClose}
        onSave={() => {
          onSave(inclusion, exclusion);
        }}
      />
    </>
  );
};

export default InclusionExclusionModal;
