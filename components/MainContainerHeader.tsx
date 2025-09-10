import {
  PageContentModel,
  PageType,
  pageTypes,
  poppinsFont,
  styles,
} from "@/util/Constants";

const MainContainerHeader: React.FC<{
  pageContent: PageContentModel;
  setCurrentPageType: (currentPage: PageType | null) => void;
  onSavePDF: () => void;
}> = ({ pageContent, setCurrentPageType, onSavePDF }) => {
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
            onClick={() => setCurrentPageType(PageType.COVER)}
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
            {pageTypes
              .filter((v) => v.value !== PageType.COVER)
              .map((pageType) => (
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
        onClick={onSavePDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default MainContainerHeader;
