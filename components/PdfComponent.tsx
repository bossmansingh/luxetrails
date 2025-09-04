"use client";

import { PageContent, PageType, styles } from "@/util/Constants";
import React, { useEffect, useState } from "react";
import CoverPage from "@/components/CoverPage";
import DialogComponent from "@/components/Modal";
import Highlights from "@/components/Highlights";
import MainContainerHeader from "@/components/MainContainerHeader";

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
          setPageCount(pageCount + 1);
          setPageContent({
            coverPage: {
              pageTitle: title,
              ppCost: pricePerPerson.toLocaleString("en-IN"),
              duration: numberOfNights,
            },
          });
        }}
        onSaveHighlight={(imageUrl, highlightText) => {
          setPageCount(pageCount + 1);
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
};

export default PdfComponent;
