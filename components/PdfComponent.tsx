"use client";

import {
  CanvasHeight,
  CanvasWidth,
  CoverPageContent,
  HotelContent,
  hotelItem,
  ImportantNotesContent,
  InclusionExclusionContent,
  ItineraryContent,
  PageContent,
  PageType,
  poppinsFont,
  ScopeServiceContent,
  SingleImageAndTextContent,
  styles,
  TermsConditionContent,
  termsItem,
} from "@/util/Constants";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import CoverPage from "@/components/CoverPage";
import DialogComponent from "@/components/modals/BaseModal";
import SingleImageAndTextLayout from "@/components/SingleImageText";
import MainContainerHeader from "@/components/MainContainerHeader";
import Itinerary from "@/components/Itinerary";
import TermsCondition from "@/components/TermsCondition";
import HotelPage from "@/components/HotelPage";
import BackgroundLayer from "@/components/BackgroundLayer";
import SectionPageHeadline from "@/components/SectionPageHeadline";
import InclusionExclusion from "@/components/InclusionExclusion";
import {
  ImportantNotesFirstPage,
  ImportantNotesSecondPage,
} from "./ImportantNotes";

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
  pageTitle: string;
  addWatermark: boolean;
  content: ReactNode;
}> = ({ pageTitle, addWatermark, content }) => {
  return addWatermark ? (
    <div style={styles.section}>
      <div style={styles.sectionPage}>
        <BackgroundLayer addWatermark />
        <div style={styles.sectionPageContent}>
          <SectionPageHeadline title={pageTitle} />
          {content}
        </div>
      </div>
    </div>
  ) : (
    content
  );
};

const CoverPageSection: React.FC<{
  coverPage?: CoverPageContent;
  pageCount: number;
  updatePageCount: (newCount: number) => void;
}> = ({ coverPage, pageCount, updatePageCount }) => {
  useEffect(() => {
    if (!coverPage) return;
    var newPageCount = pageCount + 1;
    updatePageCount(newPageCount);
  }, [coverPage]);
  return (
    coverPage && (
      <AddNewSection
        addWatermark={false}
        pageTitle={coverPage.pageTitle}
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
    updatePageCount(newPageCount);
  }, [highlight]);
  return (
    highlight && (
      <AddNewSection
        addWatermark
        pageTitle={highlight.pageTitle}
        content={
          <SingleImageAndTextLayout
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
  const pairedHotels = useMemo(
    () =>
      hotels &&
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
    var pairedHotelCount = pairedHotels?.length ?? 0;
    if (pairedHotelCount <= 0) return;
    var newPageCount = pageCount + pairedHotelCount;
    updatePageCount(newPageCount);
  }, [pairedHotels]);
  return pairedHotels?.map((v, i) => {
    return (
      <AddNewSection
        addWatermark
        pageTitle={hotelItem.label}
        key={`hotel_pair_${i}`}
        content={<HotelPage hotels={v} />}
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
    updatePageCount(newPageCount);
  }, [itinerary]);
  return (
    itinerary && (
      <AddNewSection
        addWatermark
        pageTitle={itinerary.pageTitle}
        content={<Itinerary daysContent={itinerary.contentTexts} />}
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
    updatePageCount(newPageCount);
  }, [dayPlan]);
  return (
    dayPlan &&
    dayPlan.map((value: SingleImageAndTextContent, index: number) => (
      <AddNewSection
        addWatermark
        key={index}
        pageTitle={value.pageTitle}
        content={
          <SingleImageAndTextLayout
            imageUrl={value.imageUrl}
            highlightText={value.contentText}
          />
        }
      />
    ))
  );
};

const InclusionExclusionSection: React.FC<{
  inclusionExclusion?: InclusionExclusionContent;
  pageCount: number;
  updatePageCount: (newCount: number) => void;
}> = ({ inclusionExclusion, pageCount, updatePageCount }) => {
  useEffect(() => {
    if (!inclusionExclusion) return;
    var newPageCount = pageCount + 1;
    updatePageCount(newPageCount);
  }, [inclusionExclusion]);
  return (
    inclusionExclusion && (
      <AddNewSection
        addWatermark
        pageTitle={"INCLUSION"}
        content={<InclusionExclusion content={inclusionExclusion} />}
      />
    )
  );
};

const ScopeOfServiceSection: React.FC<{
  scopeService?: ScopeServiceContent;
  pageCount: number;
  updatePageCount: (newCount: number) => void;
}> = ({ scopeService, pageCount, updatePageCount }) => {
  useEffect(() => {
    if (!scopeService) return;
    var newPageCount = pageCount + 1;
    updatePageCount(newPageCount);
  }, [scopeService]);
  return (
    scopeService && (
      <AddNewSection
        addWatermark
        pageTitle={scopeService.pageTitle}
        content={
          <div style={{ marginTop: 50 }}>
            <span
              className={poppinsFont.className}
              style={{
                ...poppinsFont.style,
                whiteSpace: "pre-wrap",
                display: "block",
                textAlign: "justify",
                color: "black",
                fontSize: 18,
                lineHeight: 1.75,
              }}
            >
              {scopeService.contentText}
            </span>
          </div>
        }
      />
    )
  );
};

const ImportantNotesSection: React.FC<{
  importantNotes?: ImportantNotesContent;
  pageCount: number;
  updatePageCount: (newCount: number) => void;
}> = ({ importantNotes, pageCount, updatePageCount }) => {
  useEffect(() => {
    if (!importantNotes) return;
    var newPageCount = pageCount + 2;
    updatePageCount(newPageCount);
  }, [importantNotes]);
  return (
    importantNotes && (
      <>
        <AddNewSection
          addWatermark
          pageTitle={importantNotes.pageTitle}
          content={
            <ImportantNotesFirstPage
              airlinePolicyTitle={importantNotes.airlinePolicyTitle}
              airlinePolicyText={importantNotes.airlinePolicyText}
              hotelPolicyTitle={importantNotes.hotelPolicyTitle}
              hotelPolicyText={importantNotes.hotelPolicyText}
            />
          }
        />
        <AddNewSection
          addWatermark
          pageTitle={importantNotes.pageTitle}
          content={
            <ImportantNotesSecondPage
              amendmentPolicyTitle={importantNotes.amendmentPolicyTitle}
              amendmentPolicyText={importantNotes.amendmentPolicyText}
            />
          }
        />
      </>
    )
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
    updatePageCount(newPageCount);
  }, [termsCondition]);
  return (
    termsCondition && (
      <AddNewSection
        addWatermark
        pageTitle={termsItem.label}
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

  useEffect(() => {
    if (!currentPageType) return;
    setOpen(true);
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
          <InclusionExclusionSection
            inclusionExclusion={pageContent.inclusionExclusion}
            pageCount={pageCount}
            updatePageCount={setPageCount}
          />
          <ScopeOfServiceSection
            scopeService={pageContent.scopeOfService}
            pageCount={pageCount}
            updatePageCount={setPageCount}
          />
          <ImportantNotesSection
            importantNotes={pageContent.importantNotes}
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
