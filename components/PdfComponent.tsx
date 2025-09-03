"use client";

import React, { useEffect, useState } from "react";
import {
  Cinzel,
  Cinzel_Decorative,
  Playfair_Display,
  Poppins,
} from "next/font/google";
import { Page, StyleSheet } from "@react-pdf/renderer";
import Image from "next/image";
import CompanyLogo from "@/public/logo_gold.png";
import ReactModal from "react-modal";

const aspectRatio = 0.7070707071;
const Domain = "www.theluxetrails.com";
const BrandGreen = "#043C2B";

enum PageType {
  HIGHLIGHTS = "highlights",
  ITINERARY = "itinerary",
  HOTEL = "hotel",
  DAYPLAN = "dayplan",
  FLIGHT = "flight",
  INCLUSION_EXCLUSION = "inclusion_exclusion",
  TERMS = "terms",
}

type CoverPageContent = {
  pageTitle: string;
  ppCost: string;
  duration: number;
};

type HighlightsContent = {
  imageUrl: string;
  highlightText: string;
};

type PageContent = {
  coverPage?: CoverPageContent;
  highlight?: HighlightsContent;
};

// const titleFont = Playfair_Display({
//   weight: "600",
//   preload: true,
//   display: "swap",
// });
const cinzelFont = Cinzel({
  weight: "700",
  preload: true,
  display: "swap",
});
const cinzelDecorativeFont = Cinzel_Decorative({
  weight: "700",
  preload: true,
  display: "swap",
});
const poppinsFont = Poppins({
  weight: "400",
  preload: true,
  display: "swap",
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "fit-content",
    alignContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  page: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: BrandGreen,
  },
  section: {
    width: "100%",
    display: "flex",
    aspectRatio: aspectRatio,
  },
  downloadButton: {
    justifySelf: "end",
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#BE8724",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginBottom: 10,
    marginRight: 10,
    marginTop: 10,
  },
  createCoverButton: {
    padding: 10,
    backgroundColor: "#BE8724",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  coverPage: {
    width: "100%",
    padding: 16,
    backgroundColor: BrandGreen,
  },
  coverPageContent: {
    width: "100%",
    height: "100%",
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: "white",
    display: "flex",
    color: BrandGreen,
    flexDirection: "column",
    alignItems: "center",
  },
  coverTitle: {
    fontSize: 69,
  },
  headerTitle: {
    fontSize: 34,
    color: BrandGreen,
    paddingTop: 10,
    paddingBottom: 10,
  },
  domain: {
    fontSize: 20,
    marginTop: 100,
  },
});

const dialogStyle: ReactModal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    width: "90%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const CoverPage: React.FC<{
  title: string;
  ppCost: string;
  duration: number;
}> = ({ title, ppCost, duration }) => {
  return (
    <div style={styles.coverPage}>
      <div style={styles.coverPageContent}>
        <h1
          className={cinzelDecorativeFont.className}
          style={(cinzelDecorativeFont.style, styles.coverTitle)}
        >
          {title}
        </h1>
        <p
          className={poppinsFont.className}
          style={
            (poppinsFont.style,
            { fontWeight: "700", fontSize: 25, marginTop: 15 })
          }
        >
          {ppCost} Per Person
        </p>
        <p
          className={poppinsFont.className}
          style={(poppinsFont.style, { fontSize: 20 })}
        >
          {duration} nights {duration + 1} days
        </p>
        <Image
          style={{
            marginTop: 80,
            width: "100%",
            height: "auto",
            paddingLeft: 60,
            paddingRight: 60,
          }}
          src={CompanyLogo}
          alt="Company logo"
          width={300}
          priority
        />
        <p
          className={poppinsFont.className}
          style={(poppinsFont.style, { fontSize: 25, letterSpacing: 15 })}
        >
          ITINERARY
        </p>
        <p
          className={poppinsFont.className}
          style={(poppinsFont.style, styles.domain)}
        >
          {Domain}
        </p>
      </div>
    </div>
  );
};

const HeaderLine: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: BrandGreen,
        width: "100%",
        height: "8px",
        borderRadius: "8px",
      }}
    />
  );
};
const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div>
      <HeaderLine />
      <h1
        className={cinzelFont.className}
        style={(cinzelFont.style, styles.headerTitle)}
      >
        {title}
      </h1>
      <HeaderLine />
    </div>
  );
};
const Highlights: React.FC<{ imageUrl: string; highlightText: string }> = ({
  imageUrl,
  highlightText,
}) => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        padding: 80,
      }}
    >
      <Header title={"HIGHLIGHTS"} />
      <Image
        id="highlight-image-target"
        style={{
          marginTop: 50,
          width: "100%",
          height: "auto",
          maxHeight: 320,
          objectFit: "cover",
          borderRadius: 8,
        }}
        src={imageUrl}
        alt="Highlight Image"
        width={200}
        height={200}
      />
      <span
        className={poppinsFont.className}
        style={
          (poppinsFont.style,
          {
            whiteSpace: "pre-wrap",
            display: "block",
            fontWeight: "500",
            padding: 24,
            color: "black",
            fontSize: 18,
            lineHeight: 2,
          })
        }
      >
        {highlightText}
      </span>
    </div>
  );
};

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
      <h1>Enter Cover Page Info</h1>
      <input
        style={{ width: "100%", height: "30px", marginTop: 20 }}
        placeholder="Enter title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        style={{ width: "100%", height: "30px", marginTop: 20 }}
        placeholder="Price per person"
        type="number"
        value={pricePerPerson > 0 ? pricePerPerson : ""}
        onChange={(e) => setPricePerPerson(Number(e.target.value))}
      />
      <input
        style={{ width: "100%", height: "30px", marginTop: 20 }}
        placeholder="Number of nights"
        type="number"
        value={numberOfNights > 0 ? numberOfNights : ""}
        onChange={(e) => setNumberOfNights(Number(e.target.value))}
      />
      <button
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: "#BE8724",
          color: "black",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          marginTop: 20,
        }}
        onClick={() => {
          onSave(title, pricePerPerson, numberOfNights);
          onClose();
        }}
      >
        SAVE
      </button>
      <button
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: "#BE8724",
          color: "black",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          marginTop: 20,
        }}
        onClick={onClose}
      >
        CLOSE
      </button>
    </>
  );
};

const CreateHighlightContent: React.FC<{
  onSave: (imageUrl: string, highlightText: string) => void;
  onClose: () => void;
}> = ({ onClose, onSave }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [highlightText, setHighlightText] = useState("");
  return (
    <>
      <h1>Enter Highlight Info</h1>
      <input
        id="highlight-image-src"
        style={{
          width: "100%",
          height: "auto",
          minHeight: "30px",
          marginTop: 20,
        }}
        placeholder="Highlight Image"
        type="file"
        onChange={(e) => {
          var result = e.target.files?.item(0);
          result && setImageUrl(URL.createObjectURL(result));
        }}
      />
      <textarea
        style={{
          width: "100%",
          minHeight: "120px",
          marginTop: 20,
          fontSize: 14,
          padding: 5,
        }}
        placeholder="Highlight Text"
        value={highlightText}
        onChange={(e) => setHighlightText(e.target.value)}
      />
      <button
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: "#BE8724",
          color: "black",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          marginTop: 20,
        }}
        onClick={() => {
          onSave(imageUrl, highlightText);
          onClose();
        }}
      >
        SAVE
      </button>
      <button
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: "#BE8724",
          color: "black",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          marginTop: 20,
        }}
        onClick={onClose}
      >
        CLOSE
      </button>
    </>
  );
};

const DialogComponent: React.FC<{
  currentPageType: PageType | null;
  isOpen: boolean;
  onSaveCover: (
    title: string,
    pricePerPerson: number,
    numberOfNights: number
  ) => void;
  onSaveHighlight: (imageUrl: string, highlightText: string) => void;
  onClose: () => void;
}> = ({ currentPageType, isOpen, onSaveCover, onSaveHighlight, onClose }) => {
  let content;
  switch (currentPageType) {
    case PageType.HIGHLIGHTS:
      content = (
        <CreateHighlightContent onClose={onClose} onSave={onSaveHighlight} />
      );
      break;
    case PageType.ITINERARY:
      content = <div>Itinerary Content</div>;
      break;
    case PageType.HOTEL:
      content = <div>Hotel Content</div>;
      break;
    case PageType.DAYPLAN:
      content = <div>Day Plan Content</div>;
      break;
    case PageType.FLIGHT:
      content = <div>Flight Content</div>;
      break;
    case PageType.INCLUSION_EXCLUSION:
      content = <div>Inclusion/Exclusion Content</div>;
      break;
    case PageType.TERMS:
      content = <div>Terms & Conditions Content</div>;
      break;
    default:
      content = <CreateCoverContent onClose={onClose} onSave={onSaveCover} />;
      break;
  }
  return (
    <ReactModal
      style={dialogStyle}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Dialog Modal"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {content}
      </div>
    </ReactModal>
  );
};
ReactModal.setAppElement("#main");

const pageTypes = [
  { label: "Highlights", value: PageType.HIGHLIGHTS },
  { label: "Itinerary", value: PageType.ITINERARY },
  { label: "Hotel", value: PageType.HOTEL },
  { label: "Day Plan", value: PageType.DAYPLAN },
  { label: "Flight", value: PageType.FLIGHT },
  { label: "Inclusion/Exclusion", value: PageType.INCLUSION_EXCLUSION },
  { label: "Terms & Conditions", value: PageType.TERMS },
];
export default function PdfComponent() {
  const [isOpen, setOpen] = useState(false);
  const [pageContent, setPageContent] = useState<PageContent>({});
  const [currentPageType, setCurrentPageType] = useState<PageType | null>(null);

  const downloadPDF =
    pageContent &&
    (async () => {
      var element: HTMLElement | null = document.getElementById("pdf-document");
      var html2pdf = await require("html2pdf.js");
      var opt: html2pdf.Options = {
        margin: 0.1,
        filename: pageContent.coverPage?.pageTitle ?? "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
        },
        jsPDF: {
          unit: "px",
          hotfixes: ["px_scaling"],
          orientation: "portrait",
        },
      };
      element && html2pdf(element, opt);
    });
  const showDilaog = () => setOpen(true);
  useEffect(() => {
    if (!currentPageType) return;
    showDilaog();
  }, [currentPageType]);
  return (
    <>
      <div style={styles.container}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "rgb(0,0,0,0.25)",
            position: "fixed",
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
                onChange={(e) => setCurrentPageType(e.target.value as PageType)}
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
        <div id="pdf-document" style={styles.page}>
          {pageContent.coverPage && (
            <div style={styles.section}>
              <CoverPage
                title={pageContent.coverPage.pageTitle}
                ppCost={pageContent.coverPage.ppCost}
                duration={pageContent.coverPage.duration}
              />
            </div>
          )}
          {pageContent?.highlight && (
            <div style={styles.section}>
              <Highlights
                imageUrl={pageContent.highlight.imageUrl}
                highlightText={pageContent.highlight.highlightText}
              />
            </div>
          )}
        </div>
      </div>
      <DialogComponent
        currentPageType={currentPageType}
        isOpen={isOpen}
        onSaveCover={(title, pricePerPerson, numberOfNights) => {
          setPageContent({
            coverPage: {
              pageTitle: title,
              ppCost: pricePerPerson.toLocaleString("en-IN"),
              duration: numberOfNights,
            },
          });
        }}
        onSaveHighlight={(imageUrl, highlightText) => {
          setPageContent({
            ...pageContent,
            highlight: {
              imageUrl: imageUrl,
              highlightText: highlightText,
            },
          });
        }}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
