"use client";

import {
  CanvasHeight,
  CanvasWidth,
  CoverPageModel,
  HotelModel,
  hotelItem,
  ImportantNotesModel,
  InclusionExclusionModel,
  ItineraryModel,
  PageContentModel,
  ScopeServiceModel,
  SingleImageAndTextModel,
  styles,
  TermsConditionModel,
  termsItem,
  aspectRatio,
  TextToPoints,
  flightsItem,
} from "@/util/Constants";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import CoverPage from "@/components/CoverPage";
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
} from "@/components/ImportantNotes";
import Image from "next/image";
import EditPDFContent from "@/components/EditPDFContent";
import Placeholder from "@/public/placeholder.jpg";

const savePDF = async (
  filename: string,
  pageCount: number,
  element: HTMLElement
) => {
  const html2pdf = await require("html2pdf.js");
  const opt: html2pdf.Options = {
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
  coverPage?: CoverPageModel;
}> = ({ coverPage }) => {
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
  highlight?: SingleImageAndTextModel;
}> = ({ highlight }) => {
  return (
    highlight && (
      <AddNewSection
        addWatermark
        pageTitle={highlight.pageTitle}
        content={
          <SingleImageAndTextLayout
            imageUrl={highlight.imageUrl}
            contentText={highlight.contentText}
          />
        }
      />
    )
  );
};

const HotelSection: React.FC<{
  hotels?: HotelModel[];
}> = ({ hotels }) => {
  const pairedHotels = useMemo(
    () =>
      hotels &&
      hotels.reduce((pairs: HotelModel[][], item, index) => {
        if (index % 2 === 0) {
          pairs.push([item]);
        } else {
          pairs[pairs.length - 1].push(item);
        }
        return pairs;
      }, []),
    [hotels]
  );
  return (
    pairedHotels &&
    pairedHotels.length > 0 &&
    pairedHotels.map((v, i) => (
      <AddNewSection
        addWatermark
        pageTitle={hotelItem.label}
        key={`hotel_pair_${i}`}
        content={<HotelPage hotels={v} />}
      />
    ))
  );
};

const ONE_PAGE_MAX_ITINERARY_COUNT = 6;
const ItinerarySection: React.FC<{
  itinerary?: ItineraryModel;
}> = ({ itinerary }) => {
  const pairedItineraries = useMemo(
    () =>
      itinerary &&
      itinerary.contentTexts.reduce((pairs: string[][], item, index) => {
        if (index % ONE_PAGE_MAX_ITINERARY_COUNT === 0) {
          pairs.push([item]);
        } else {
          pairs[pairs.length - 1].push(item);
        }
        return pairs;
      }, []),
    [itinerary?.contentTexts]
  );
  return (
    itinerary &&
    pairedItineraries &&
    pairedItineraries.length > 0 &&
    pairedItineraries.map((value, index) => (
      <AddNewSection
        addWatermark
        key={`itinerary_section_${index}`}
        pageTitle={itinerary.pageTitle}
        content={
          <Itinerary
            daysContent={value}
            counter={ONE_PAGE_MAX_ITINERARY_COUNT * index}
          />
        }
      />
    ))
  );
};

const DayPlanSection: React.FC<{
  dayPlan?: SingleImageAndTextModel[];
}> = ({ dayPlan }) => {
  return (
    dayPlan &&
    dayPlan.length > 0 &&
    dayPlan.map((value: SingleImageAndTextModel, index: number) => (
      <AddNewSection
        addWatermark
        key={index}
        pageTitle={`Day ${index + 1} - ${value.pageTitle}`}
        content={
          <SingleImageAndTextLayout
            imageUrl={value.imageUrl}
            contentText={value.contentText}
            recommendationText={value.recommendationText}
          />
        }
      />
    ))
  );
};

const InclusionExclusionSection: React.FC<{
  inclusionExclusion?: InclusionExclusionModel;
}> = ({ inclusionExclusion }) => {
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
  scopeService?: ScopeServiceModel;
}> = ({ scopeService }) => {
  return (
    scopeService && (
      <AddNewSection
        addWatermark
        pageTitle={scopeService.pageTitle}
        content={
          <div style={{ marginTop: 50 }}>
            <TextToPoints
              style={{ fontSize: 16 }}
              text={scopeService.contentText}
            />
          </div>
        }
      />
    )
  );
};

const ImportantNotesSection: React.FC<{
  importantNotes?: ImportantNotesModel;
}> = ({ importantNotes }) => {
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
  termsCondition?: TermsConditionModel;
}> = ({ termsCondition }) => {
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

const FlightSection: React.FC<{
  flights?: string[];
}> = ({ flights }) => {
  return (
    flights &&
    flights.length > 0 &&
    flights.map((value, index) => (
      <AddNewSection
        key={`flight_section_${index}`}
        addWatermark
        pageTitle={flightsItem.label}
        content={
          <Image
            style={{
              width: "100%",
              height: "auto",
              objectFit: "fill",
              overflow: "hidden",
              aspectRatio: aspectRatio,
            }}
            width={100}
            height={100}
            src={value.length > 0 ? value : Placeholder}
            alt="Flight image"
          />
        }
      />
    ))
  );
};

enum PageMode {
  Edit = "edit",
  Preview = "preview",
}

const PdfComponent: React.FC = () => {
  const [pageCount, setPageCount] = useState(0);
  const [pageContent, setPageContent] = useState<PageContentModel>({
    isFullPDF: false,
  });
  const [currentPageMode, setPageMode] = useState(PageMode.Edit);

  const onSavePDF = useCallback(() => {
    const element: HTMLElement | null = document.getElementById("pdf-document");
    const coverPage = pageContent.coverPage;
    if (!element || !coverPage) return;
    const pageTitle = coverPage.pageTitle;
    const duration = coverPage.duration;
    const filename = `${pageTitle} ${duration}N ${duration + 1}D`;
    savePDF(filename, pageCount, element);
  }, [pageContent.coverPage, pageCount]);

  useEffect(() => {
    let pageCounter = 0;
    if (pageContent.coverPage !== undefined) {
      ++pageCounter;
    }
    if (pageContent.highlight !== undefined) {
      ++pageCounter;
    }
    if (pageContent.hotels && pageContent.hotels.length > 0) {
      const reducedList = pageContent.hotels.reduce(
        (pairs: HotelModel[][], item, index) => {
          if (index % 2 === 0) {
            pairs.push([item]);
          } else {
            pairs[pairs.length - 1].push(item);
          }
          return pairs;
        },
        []
      );
      pageCounter = pageCounter + reducedList.length;
    }
    if (pageContent.itinerary !== undefined) {
      ++pageCounter;
    }
    if (pageContent.dayPlan && pageContent.dayPlan.length > 0) {
      pageCounter = pageCounter + pageContent.dayPlan.length;
    }
    if (pageContent.inclusionExclusion !== undefined) {
      ++pageCounter;
    }
    if (pageContent.scopeOfService !== undefined) {
      ++pageCounter;
    }
    if (pageContent.importantNotes !== undefined) {
      pageCounter = pageCounter + 2;
    }
    if (pageContent.termsCondition !== undefined) {
      ++pageCounter;
    }
    if (pageContent.flights && pageContent.flights.length > 0) {
      pageCounter = pageCounter + pageContent.flights.length;
    }
    setPageCount(pageCounter);
  }, [pageContent]);
  return (
    <>
      <div style={styles.container}>
        <MainContainerHeader
          isPreviewMode={currentPageMode === PageMode.Preview}
          onSavePDF={onSavePDF}
          onPreviewPDF={() => {
            pageContent.coverPage && setPageMode(PageMode.Preview);
          }}
          onEditPDF={() => {
            setPageMode(PageMode.Edit);
          }}
        />
        {currentPageMode === PageMode.Edit ? (
          <EditPDFContent
            pageContent={pageContent}
            onClose={() => {
              setPageMode(PageMode.Preview);
            }}
            onSaveChanges={(newPageContent: PageContentModel) => {
              setPageContent(newPageContent);
              setPageMode(PageMode.Preview);
            }}
          />
        ) : (
          <div id="pdf-document" style={styles.page}>
            <CoverPageSection coverPage={pageContent.coverPage} />
            <HighlightSection highlight={pageContent.highlight} />
            <HotelSection hotels={pageContent.hotels} />
            <ItinerarySection itinerary={pageContent.itinerary} />
            <DayPlanSection dayPlan={pageContent.dayPlan} />
            <InclusionExclusionSection
              inclusionExclusion={pageContent.inclusionExclusion}
            />
            <ScopeOfServiceSection scopeService={pageContent.scopeOfService} />
            <ImportantNotesSection
              importantNotes={pageContent.importantNotes}
            />
            <TermsConditionSection
              termsCondition={pageContent.termsCondition}
            />
            <FlightSection flights={pageContent.flights} />
          </div>
        )}
      </div>
    </>
  );
};

export default PdfComponent;
