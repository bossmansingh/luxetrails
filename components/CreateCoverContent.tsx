import { poppinsFont, styles } from "@/util/Constants";
import { useState } from "react";

const CreateCoverContent: React.FC<{
  onClose: () => void;
  onSave: (
    title: string,
    pricePerPerson: number,
    numberOfNights: number
  ) => void;
}> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [pricePerPerson, setPricePerPerson] = useState(0);
  const [numberOfNights, setNumberOfNights] = useState(0);
  return (
    <>
      <h1 className={poppinsFont.className} style={poppinsFont.style}>
        Enter Cover Page Info
      </h1>
      <input
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          height: "30px",
          marginTop: 20,
        }}
        placeholder="Enter title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          height: "30px",
          marginTop: 20,
        }}
        placeholder="Price per person"
        type="number"
        value={pricePerPerson > 0 ? pricePerPerson : ""}
        onChange={(e) => setPricePerPerson(Number(e.target.value))}
      />
      <input
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          height: "30px",
          marginTop: 20,
        }}
        placeholder="Number of nights"
        type="number"
        value={numberOfNights > 0 ? numberOfNights : ""}
        onChange={(e) => setNumberOfNights(Number(e.target.value))}
      />
      <button
        className={poppinsFont.className}
        style={{ ...styles.modalButton, ...poppinsFont.style }}
        onClick={() => {
          onSave(title, pricePerPerson, numberOfNights);
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

export default CreateCoverContent;
