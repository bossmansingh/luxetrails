import { PageType, poppinsFont } from "@/util/Constants";
import { useState } from "react";
import ModelTitle from "./ModelTitle";
import ModelButtons from "./ModelButtons";

const inputTextStyle = {
  ...poppinsFont.style,
  width: "100%",
  height: "40px",
  marginTop: 10,
  fontSize: 16,
  paddingLeft: 12,
  paddingRight: 12,
};

const CoverModel: React.FC<{
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
      <ModelTitle pageType={PageType.COVER} />
      <input
        className={poppinsFont.className}
        style={inputTextStyle}
        placeholder="Enter title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className={poppinsFont.className}
        style={inputTextStyle}
        placeholder="Price per person"
        type="number"
        value={pricePerPerson > 0 ? pricePerPerson : ""}
        onChange={(e) => setPricePerPerson(Number(e.target.value))}
      />
      <input
        className={poppinsFont.className}
        style={inputTextStyle}
        placeholder="Number of nights"
        type="number"
        value={numberOfNights > 0 ? numberOfNights : ""}
        onChange={(e) => setNumberOfNights(Number(e.target.value))}
      />
      <ModelButtons
        onClose={onClose}
        onSave={() => onSave(title, pricePerPerson, numberOfNights)}
      />
    </>
  );
};

export default CoverModel;
