"use client";

import {
  CanvasHeight,
  CanvasWidth,
  CoverPageContent,
  HotelContent,
  ItineraryContent,
  PageContent,
  PageType,
  SingleImageAndTextContent,
  styles,
  TermsConditionContent,
} from "@/util/Constants";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import CoverPage from "@/components/CoverPage";
import DialogComponent from "@/components/modals/BaseModal";
import SingleImageAndTextLayout from "@/components/SingleImageText";
import MainContainerHeader from "@/components/MainContainerHeader";
import Itinerary from "@/components/Itinerary";
import TermsCondition from "./TermsCondition";
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

const AddNewSection: React.FC<{
  content: ReactNode;
}> = ({ content }) => <div style={styles.section}>{content}</div>;

const CoverPageSection: React.FC<{
  coverPage?: CoverPageContent;
  pageCount: number;
  updatePageCount: (newCount: number) => void;
}> = ({ coverPage, pageCount, updatePageCount }) => {
  useEffect(() => {
    if (!coverPage) return;
    var newPageCount = pageCount + 1;
    console.log("CoverPageSection | Update Page count to ", newPageCount);
    updatePageCount(newPageCount);
  }, [coverPage]);
  return (
    coverPage && (
      <AddNewSection
        content={
          <CoverPage
            title={coverPage.pageTitle}
            ppCost={coverPage.ppCost}
            duration={coverPage.duration}
          />
        }
      />
    )
  );
};

const HighlightSection: React.FC<{
  highlight?: SingleImageAndTextContent;
  pageCount: number;
  updatePageCount: (newCount: number) => void;
}> = ({ highlight, pageCount, updatePageCount }) => {
  useEffect(() => {
    if (!highlight) return;
    var newPageCount = pageCount + 1;
    console.log("HighlightSection | Update Page count to ", newPageCount);
    updatePageCount(newPageCount);
  }, [highlight]);
  return (
    highlight && (
      <AddNewSection
        content={
          <SingleImageAndTextLayout
            pageTitle={highlight.pageTitle}
            imageUrl={highlight.imageUrl}
            highlightText={highlight.contentText}
          />
        }
      />
    )
  );
};

const HotelSection: React.FC<{
  hotels?: HotelContent[];
  pageCount: number;
  updatePageCount: (newCount: number) => void;
}> = ({ hotels, pageCount, updatePageCount }) => {
  if (!hotels) return;
  const pairedHotels = useMemo(
    () =>
      hotels.reduce((pairs: HotelContent[][], item, index) => {
        if (index % 2 === 0) {
          pairs.push([item]);
        } else {
          pairs[pairs.length - 1].push(item);
        }
        return pairs;
      }, []),
    [hotels]
  );
  useEffect(() => {
    if (pairedHotels.length <= 0) return;
    var newPageCount = pageCount + pairedHotels.length;
    console.log("HotelSection | Update Page count to ", newPageCount);
    updatePageCount(newPageCount);
  }, [pairedHotels]);
  return pairedHotels.map((v, i) => {
    return (
      <AddNewSection
        key={`hotel_pair_${i}`}
        content={<HotelPage pageTitle={"Hotels"} hotels={v} />}
      />
    );
  });
};

const ItinerarySection: React.FC<{
  itinerary?: ItineraryContent;
  pageCount: number;
  updatePageCount: (newCount: number) => void;
}> = ({ itinerary, pageCount, updatePageCount }) => {
  useEffect(() => {
    if (!itinerary) return;
    var newPageCount = pageCount + 1;
    console.log("ItinerarySection | Update Page count to ", newPageCount);
    updatePageCount(newPageCount);
  }, [itinerary]);
  return (
    itinerary && (
      <AddNewSection
        content={
          <Itinerary
            pageTitle={itinerary.pageTitle}
            daysContent={itinerary.contentTexts}
          />
        }
      />
    )
  );
};

const DayPlanSection: React.FC<{
  dayPlan?: SingleImageAndTextContent[];
  pageCount: number;
  updatePageCount: (newCount: number) => void;
}> = ({ dayPlan, pageCount, updatePageCount }) => {
  useEffect(() => {
    if (!dayPlan) return;
    var newPageCount = pageCount + 1;
    console.log("DayPlanSection | Update Page count to ", newPageCount);
    updatePageCount(newPageCount);
  }, [dayPlan]);
  return (
    dayPlan &&
    dayPlan.map((value: SingleImageAndTextContent, index: number) => (
      <AddNewSection
        key={index}
        content={
          <SingleImageAndTextLayout
            pageTitle={value.pageTitle}
            imageUrl={value.imageUrl}
            highlightText={value.contentText}
          />
        }
      />
    ))
  );
};

const TermsConditionSection: React.FC<{
  termsCondition?: TermsConditionContent;
  pageCount: number;
  updatePageCount: (newCount: number) => void;
}> = ({ termsCondition, pageCount, updatePageCount }) => {
  useEffect(() => {
    if (!termsCondition) return;
    var newPageCount = pageCount + 1;
    console.log("TermsConditionSection | Update Page count to ", newPageCount);
    updatePageCount(newPageCount);
  }, [termsCondition]);
  return (
    termsCondition && (
      <AddNewSection
        content={<TermsCondition contentText={termsCondition.contentText} />}
      />
    )
  );
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
  useEffect(() => {
    console.log("pageCount: ", pageCount);
  }, [pageCount]);
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
          <CoverPageSection
            coverPage={pageContent.coverPage}
            pageCount={pageCount}
            updatePageCount={setPageCount}
          />
          <HighlightSection
            highlight={pageContent.highlight}
            pageCount={pageCount}
            updatePageCount={setPageCount}
          />
          <HotelSection
            hotels={pageContent.hotels}
            pageCount={pageCount}
            updatePageCount={setPageCount}
          />
          <ItinerarySection
            itinerary={pageContent.itinerary}
            pageCount={pageCount}
            updatePageCount={setPageCount}
          />
          <DayPlanSection
            dayPlan={pageContent.dayPlan}
            pageCount={pageCount}
            updatePageCount={setPageCount}
          />
          <TermsConditionSection
            termsCondition={pageContent.termsCondition}
            pageCount={pageCount}
            updatePageCount={setPageCount}
          />
        </div>
      </div>
      <DialogComponent
        pageContent={pageContent}
        currentPageType={currentPageType}
        isOpen={isOpen}
        onSave={(newContent: PageContent) => {
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
