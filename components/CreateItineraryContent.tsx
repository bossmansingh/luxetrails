import { poppinsFont, styles } from "@/util/Constants";
import { useState } from "react";

const CreateItineraryContent: React.FC<{
  numberOfNights: number;
  onSave: (pageTitle: string, contentTexts: string[]) => void;
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
      <h1 className={poppinsFont.className} style={poppinsFont.style}>
        Enter Itinerary Info
      </h1>
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
          }}
          placeholder={`Enter night ${index + 1} info`}
          type="text"
          value={nightValues[index]}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}
      <button
        className={poppinsFont.className}
        style={{ ...styles.modalButton, ...poppinsFont.style }}
        onClick={() => {
          onSave(
            "ITINERARY",
            nightValues.filter((value) => value.trim() !== "")
          );
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

export default CreateItineraryContent;
