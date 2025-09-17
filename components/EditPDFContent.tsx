import {
  CoverPageModel,
  PageContentModel,
  poppinsFont,
  SingleImageAndTextModel,
  styles,
  TitleText,
} from "@/util/Constants";
import Image from "next/image";
import { useState } from "react";

const inputTextStyle = {
  ...poppinsFont.style,
  width: "100%",
  height: "40px",
  marginTop: 10,
  fontSize: 16,
  paddingLeft: 12,
  paddingRight: 12,
};

const CoverPageSection: React.FC<{
  coverPageContent: CoverPageModel;
  setCoverPageContent: (newCoverPageContent: CoverPageModel) => void;
}> = ({ coverPageContent, setCoverPageContent }) => {
  return (
    <>
      <TitleText text="Cover Page" />
      <input
        className={poppinsFont.className}
        style={inputTextStyle}
        placeholder="Enter title"
        type="text"
        value={coverPageContent.pageTitle}
        onChange={(e) =>
          setCoverPageContent({
            ...coverPageContent,
            pageTitle: e.target.value,
          })
        }
      />
      <input
        className={poppinsFont.className}
        style={inputTextStyle}
        placeholder="Price per person"
        type="number"
        value={coverPageContent.ppCost}
        onChange={(e) =>
          setCoverPageContent({
            ...coverPageContent,
            ppCost: Number(e.target.value),
          })
        }
      />
      <input
        className={poppinsFont.className}
        style={inputTextStyle}
        placeholder="Number of nights"
        type="number"
        value={coverPageContent.duration}
        onChange={(e) =>
          setCoverPageContent({
            ...coverPageContent,
            duration: Number(e.target.value),
          })
        }
      />
    </>
  );
};

const HighlightPageSection: React.FC<{
  highlightPageContent: SingleImageAndTextModel;
  setHighlightPageContent: (
    newHighlightPageContent: SingleImageAndTextModel
  ) => void;
}> = ({ highlightPageContent, setHighlightPageContent }) => {
  return (
    <>
      <TitleText text="Highlight Page" style={{ marginTop: 20 }} />
      {highlightPageContent.imageUrl.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Image
            style={{
              width: "200px",
              height: "200px",
              borderRadius: 8,
              overflow: "hidden",
              objectFit: "cover",
            }}
            src={highlightPageContent.imageUrl}
            alt="Highlight Image"
            width={300}
            height={300}
          />
          <button
            className={poppinsFont.className}
            style={{
              ...styles.modalButton,
              ...poppinsFont.style,
              width: "auto",
              height: "40px",
              marginLeft: 10,
              backgroundColor: "red",
              alignSelf: "center",
            }}
            onClick={() => {
              setHighlightPageContent({
                ...highlightPageContent,
                imageUrl: "",
              });
            }}
          >
            Remove Image
          </button>
        </div>
      ) : (
        <input
          className={poppinsFont.className}
          style={{
            ...poppinsFont.style,
            width: "100%",
            height: "auto",
            marginTop: 20,
            padding: 10,
            alignContent: "center",
            justifyContent: "center",
            color: "white",
            backgroundColor: "black",
          }}
          placeholder="Highlight Image"
          type="file"
          onChange={(e) => {
            var result = e.target.files?.item(0);
            result &&
              setHighlightPageContent({
                ...highlightPageContent,
                imageUrl: URL.createObjectURL(result),
              });
          }}
        />
      )}
      <input
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          height: "40px",
          fontSize: 14,
          marginTop: 10,
          paddingLeft: 12,
          paddingRight: 12,
        }}
        placeholder="Enter Page Title"
        type="text"
        value={highlightPageContent.pageTitle}
        onChange={(e) =>
          setHighlightPageContent({
            ...highlightPageContent,
            pageTitle: e.target.value,
          })
        }
      />
      <textarea
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          minHeight: "120px",
          marginTop: 10,
          fontSize: 14,
          padding: 12,
        }}
        placeholder="Highlight Text"
        value={highlightPageContent.contentText}
        onChange={(e) =>
          setHighlightPageContent({
            ...highlightPageContent,
            contentText: e.target.value,
          })
        }
      />
    </>
  );
};

const ButtonsContainer: React.FC<{
  onClose: () => void;
  onSaveChanges: () => void;
}> = ({ onClose, onSaveChanges }) => {
  return (
    <div
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        bottom: 0,
        position: "relative",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "black",
      }}
    >
      <button
        className={poppinsFont.className}
        style={{
          ...styles.modalButton,
          ...poppinsFont.style,
          marginRight: 10,
        }}
        onClick={onSaveChanges}
      >
        SAVE
      </button>
      <button
        className={poppinsFont.className}
        style={{
          ...styles.modalButton,
          ...poppinsFont.style,
          marginLeft: 10,
        }}
        onClick={onClose}
      >
        CLOSE
      </button>
    </div>
  );
};

const EditPDFContent: React.FC<{
  pageContent: PageContentModel;
  onClose: () => void;
  onSaveChanges: (newPageContent: PageContentModel) => void;
}> = ({ pageContent, onClose, onSaveChanges }) => {
  const [coverPageContent, setCoverPageContent] = useState<CoverPageModel>(
    pageContent.coverPage ?? {
      pageTitle: "",
      ppCost: 0,
      duration: 0,
    }
  );
  const [highlightPageContent, setHighlightPageContent] =
    useState<SingleImageAndTextModel>(
      pageContent.highlight ?? {
        pageTitle: "Highlights",
        contentText: "",
        imageUrl: "",
      }
    );
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 60,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
          paddingTop: 60,
          padding: 16,
        }}
      >
        <CoverPageSection
          coverPageContent={coverPageContent}
          setCoverPageContent={setCoverPageContent}
        />
        <HighlightPageSection
          highlightPageContent={highlightPageContent}
          setHighlightPageContent={setHighlightPageContent}
        />
      </div>
      <ButtonsContainer
        onClose={onClose}
        onSaveChanges={() =>
          onSaveChanges({
            ...pageContent,
            coverPage: coverPageContent,
            highlight: highlightPageContent,
          })
        }
      />
    </div>
  );
};

export default EditPDFContent;
