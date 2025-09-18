import { BrandGolden, poppinsFont, styles } from "@/util/Constants";

const MainContainerHeader: React.FC<{
  isPreviewMode: boolean;
  downloadEnabled: boolean;
  onSavePDF: () => void;
  onPreviewPDF: () => void;
  onEditPDF: () => void;
}> = ({
  isPreviewMode,
  downloadEnabled,
  onSavePDF,
  onPreviewPDF,
  onEditPDF,
}) => {
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
          backgroundColor: downloadEnabled ? BrandGolden : "GrayText",
          cursor: downloadEnabled ? "pointer" : "default",
        }}
        onClick={onSavePDF}
        disabled={!downloadEnabled}
      >
        Download PDF
      </button>
    </div>
  );
};

export default MainContainerHeader;
