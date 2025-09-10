import { poppinsFont, styles } from "@/util/Constants";

const ModalButtons: React.FC<{ onClose: () => void; onSave: () => void }> = ({
  onClose,
  onSave,
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <button
        className={poppinsFont.className}
        style={{ ...styles.modalButton, ...poppinsFont.style, marginRight: 8 }}
        onClick={() => {
          onSave();
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
    </div>
  );
};

export default ModalButtons;
