import { poppinsFont, styles } from "@/util/Constants";
import { useState } from "react";

const defaultTermsCondition = `• This package is for review only; rates and availability may change.
• Prices are not guaranteed until flight details are shared or 50% payment is made.
• Hotels and activities are not held without confirmation.
• We work with trusted partners, but do not hold inventory.
• Final itinerary depends on real-time availability at the time of booking.
• Post-confirmation changes may affect cost or availability.`;

const CreateTermsConditionContent: React.FC<{
  onSave: (contentText: string) => void;
  onClose: () => void;
}> = ({ onSave, onClose }) => {
  const [terms, setTerms] = useState(defaultTermsCondition);
  return (
    <>
      <h1 className={poppinsFont.className} style={poppinsFont.style}>
        Enter Terms & Condition
      </h1>
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
      <button
        className={poppinsFont.className}
        style={{ ...styles.modalButton, ...poppinsFont.style }}
        onClick={() => {
          onSave(terms);
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

export default CreateTermsConditionContent;
