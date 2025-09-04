import {
  CanvasHeight,
  CanvasWidth,
  PageContent,
  PageType,
  pageTypes,
  poppinsFont,
  styles,
} from "@/util/Constants";

const MainContainerHeader: React.FC<{
  pageContent: PageContent;
  pageCount: number;
  showDilaog: () => void;
  setCurrentPageType: (currentPage: PageType | null) => void;
}> = ({ pageContent, pageCount, showDilaog, setCurrentPageType }) => {
  const downloadPDF =
    pageContent &&
    (async () => {
      var element: HTMLElement | null = document.getElementById("pdf-document");
      var html2pdf = await require("html2pdf.js");
      var opt: html2pdf.Options = {
        filename: pageContent.coverPage?.pageTitle ?? "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          width: CanvasWidth,
          height: CanvasHeight * pageCount,
        },
        jsPDF: {
          unit: "px",
          hotfixes: ["px_scaling"],
          orientation: "portrait",
        },
      };
      element && html2pdf(element, opt);
    });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "rgb(0,0,0,0.25)",
        position: "fixed",
        zIndex: 2,
      }}
    >
      <div>
        {pageContent.coverPage === undefined ? (
          <button
            className={poppinsFont.className}
            style={(poppinsFont.style, styles.createCoverButton)}
            onClick={showDilaog}
          >
            Add Cover Page
          </button>
        ) : (
          <select
            style={{
              backgroundColor: "black",
              color: "white",
              height: 36,
              marginLeft: 10,
              marginTop: 10,
              borderRadius: 5,
            }}
            onChange={(e) => {
              setCurrentPageType(e.target.value as PageType);
              e.target.selectedIndex = 0; // Reset value after selection
            }}
          >
            <option value="">--Add Page--</option>
            {pageTypes.map((pageType) => (
              <option key={pageType.value} value={pageType.value}>
                {pageType.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <button
        className={poppinsFont.className}
        style={(poppinsFont.style, styles.downloadButton)}
        onClick={downloadPDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default MainContainerHeader;
