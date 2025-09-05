"use client";

import {
  CanvasHeight,
  PageContent,
  PageType,
  SingleImageAndTextContent,
  styles,
} from "@/util/Constants";
import React, { useEffect, useState } from "react";
import CoverPage from "@/components/CoverPage";
import DialogComponent from "@/components/Modal";
import SingleImageAndTextLayout from "@/components/SingleImageAndTextLayout";
import MainContainerHeader from "@/components/MainContainerHeader";
import ItineraryContent from "@/components/ItineraryContent";

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
  return (
    <>
      <div style={styles.container}>
        <MainContainerHeader
          pageContent={pageContent}
          pageCount={pageCount}
          showDilaog={showDilaog}
          setCurrentPageType={(e) => setCurrentPageType(e)}
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
          {pageContent?.itinerary && (
            <div style={styles.section}>
              <ItineraryContent
                pageTitle={pageContent.itinerary.pageTitle}
                daysContent={pageContent.itinerary.contentTexts}
              />
            </div>
          )}
          {pageContent?.dayPlan &&
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
