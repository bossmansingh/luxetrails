"use client";

import {
  CanvasHeight,
  CanvasWidth,
  PageContent,
  PageType,
  SingleImageAndTextContent,
  styles,
} from "@/util/Constants";
import React, { useEffect, useState } from "react";
import CoverPage from "@/components/CoverPage";
import DialogComponent from "@/components/modals/BaseModal";
import SingleImageAndTextLayout from "@/components/SingleImageText";
import MainContainerHeader from "@/components/MainContainerHeader";
import ItineraryContent from "@/components/Itinerary";
import TermsConditionContent from "./TermsCondition";
import HotelPage from "./HotelPage";

const savePDF = async (
  filename: string,
  pageCount: number,
  element: HTMLElement
) => {
  var html2pdf = await require("html2pdf.js");
  var opt: html2pdf.Options = {
    filename: filename,
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
  html2pdf(element, opt);
};

const PdfComponent: React.FC = () => {
  const [pageCount, setPageCount] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [pageContent, setPageContent] = useState<PageContent>({});
  const [currentPageType, setCurrentPageType] = useState<PageType | null>(null);

  const showDilaog = () => setOpen(true);
  useEffect(() => {
    if (!currentPageType) return;
    showDilaog();
  }, [currentPageType]);
  const onSavePDF = () => {
    var element: HTMLElement | null = document.getElementById("pdf-document");
    var coverPage = pageContent.coverPage;
    if (!element || !coverPage) return;
    const pageTitle = coverPage.pageTitle;
    const duration = coverPage.duration;
    savePDF(`${pageTitle} ${duration}N ${duration + 1}D`, pageCount, element);
  };
  return (
    <>
      <div style={styles.container}>
        <MainContainerHeader
          pageContent={pageContent}
          showDilaog={showDilaog}
          setCurrentPageType={(e) => setCurrentPageType(e)}
          onSavePDF={onSavePDF}
        />
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
              <SingleImageAndTextLayout
                pageTitle={pageContent.highlight.pageTitle}
                imageUrl={pageContent.highlight.imageUrl}
                highlightText={pageContent.highlight.contentText}
              />
            </div>
          )}
          {pageContent.hotels && (
            <div style={styles.section}>
              <HotelPage
                pageTitle={"Hotels"}
                hotels={pageContent.hotels.flat(2)}
              />
            </div>
          )}
          {pageContent.itinerary && (
            <div style={styles.section}>
              <ItineraryContent
                pageTitle={pageContent.itinerary.pageTitle}
                daysContent={pageContent.itinerary.contentTexts}
              />
            </div>
          )}
          {pageContent.dayPlan &&
            pageContent.dayPlan.map(
              (value: SingleImageAndTextContent, index: number) => (
                <div key={index} style={styles.section}>
                  <SingleImageAndTextLayout
                    pageTitle={value.pageTitle}
                    imageUrl={value.imageUrl}
                    highlightText={value.contentText}
                  />
                </div>
              )
            )}
          {pageContent.termsCondition && (
            <div style={styles.section}>
              <TermsConditionContent
                contentText={pageContent.termsCondition.contentText}
              />
            </div>
          )}
        </div>
      </div>
      <DialogComponent
        pageContent={pageContent}
        currentPageType={currentPageType}
        isOpen={isOpen}
        onSave={(newContent: PageContent) => {
          setPageCount(pageCount + 1);
          setPageContent(newContent);
          scrollTo({
            behavior: "smooth",
            left: 0,
            top: CanvasHeight * pageCount,
          });
        }}
        onClose={() => {
          setCurrentPageType(null);
          setOpen(false);
        }}
      />
    </>
  );
};

export default PdfComponent;
