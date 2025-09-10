import { poppinsFont } from "@/util/Constants";
import { useState } from "react";
import ModalButtons from "@/components/modals/ModelButtons";

const ItineraryModal: React.FC<{
  stayDuration: number;
  onSave: (contentTexts: string[]) => void;
  onClose: () => void;
}> = ({ stayDuration: numberOfNights, onSave, onClose }) => {
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
          placeholder={`Day ${index + 1} Schedule`}
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
