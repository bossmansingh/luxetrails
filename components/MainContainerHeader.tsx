import { poppinsFont, styles } from "@/util/Constants";

const MainContainerHeader: React.FC<{
  isPreviewMode: boolean;
  onSavePDF: () => void;
  onPreviewPDF: () => void;
  onEditPDF: () => void;
}> = ({ isPreviewMode, onSavePDF, onPreviewPDF, onEditPDF }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "rgb(0,0,0,0.85)",
        position: "fixed",
        zIndex: 2,
      }}
    >
      <button
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          ...styles.downloadButton,
        }}
        onClick={isPreviewMode ? onEditPDF : onPreviewPDF}
      >
        {isPreviewMode ? "Edit PDF" : "Preview PDF"}
      </button>
      <button
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          ...styles.downloadButton,
        }}
        onClick={onSavePDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default MainContainerHeader;
