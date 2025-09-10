import { PageType, poppinsFont } from "@/util/Constants";
import { useState } from "react";
import ModalTitle from "./ModelTitle";
import ModalButtons from "./ModelButtons";

const ItineraryModal: React.FC<{
  numberOfNights: number;
  onSave: (contentTexts: string[]) => void;
  onClose: () => void;
}> = ({ numberOfNights, onSave, onClose }) => {
  const [nightValues, setNightValues] = useState<string[]>(
    Array(numberOfNights).fill("")
  );
  const handleInputChange = (index: number, value: string) => {
    const newValues = [...nightValues];
    newValues[index] = value;
    setNightValues(newValues);
  };
  return (
    <>
      {Array.from({ length: numberOfNights }, (_, index) => (
        <input
          key={`night_${index}`}
          className={poppinsFont.className}
          style={{
            ...poppinsFont.style,
            width: "100%",
            height: "40px",
            marginTop: 10,
            fontSize: 16,
            paddingLeft: 12,
            paddingRight: 12,
          }}
          placeholder={`Enter night ${index + 1} info`}
          type="text"
          value={nightValues[index]}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}
      <ModalButtons
        onClose={onClose}
        onSave={() =>
          onSave(nightValues.filter((value) => value.trim() !== ""))
        }
      />
    </>
  );
};

export default ItineraryModal;
