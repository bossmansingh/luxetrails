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
  PageType,
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

const ItinerarySection: React.FC<{
  itinerary?: ItineraryModel;
}> = ({ itinerary }) => {
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
            src={value}
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
  const [isOpen, setOpen] = useState(false);
  const [pageContent, setPageContent] = useState<PageContentModel>({});
  const [currentPageType, setCurrentPageType] = useState<PageType | null>(null);
  const [currentPageMode, setPageMode] = useState(PageMode.Edit);

  useEffect(() => {
    if (!currentPageType) return;
    setOpen(true);
  }, [currentPageType]);

  const onSavePDF = useCallback(() => {
    var element: HTMLElement | null = document.getElementById("pdf-document");
    var coverPage = pageContent.coverPage;
    if (!element || !coverPage) return;
    const pageTitle = coverPage.pageTitle;
    const duration = coverPage.duration;
    const filename = `${pageTitle} ${duration}N ${duration + 1}D`;
    savePDF(filename, pageCount, element);
  }, [pageContent.coverPage, pageCount]);
  const downloadEnabled = useCallback(
    () =>
      pageContent.coverPage !== undefined &&
      pageContent.coverPage.pageTitle.length > 0 &&
      pageContent.coverPage.ppCost > 0 &&
      pageContent.coverPage.duration > 0 &&
      pageContent.highlight !== undefined &&
      pageContent.highlight.pageTitle.length > 0 &&
      pageContent.highlight.imageUrl.length > 0 &&
      pageContent.highlight.contentText.length > 0 &&
      pageContent.hotels !== undefined &&
      pageContent.hotels.filter(
        (v) =>
          v.images.firstUrl.length > 0 &&
          v.images.secondUrl.length > 0 &&
          v.title.length > 0 &&
          v.subtitle.length > 0
      ).length > 0 &&
      pageContent.itinerary !== undefined &&
      pageContent.itinerary.pageTitle.length > 0 &&
      pageContent.itinerary.contentTexts.filter((v) => v.length > 0).length >
        0 &&
      pageContent.dayPlan !== undefined &&
      pageContent.dayPlan.filter(
        (v) =>
          v.pageTitle.length > 0 &&
          v.imageUrl.length > 0 &&
          v.contentText.length > 0
      ).length > 0 &&
      pageContent.inclusionExclusion !== undefined &&
      pageContent.inclusionExclusion.inclusion.length > 0 &&
      pageContent.inclusionExclusion.exclusion.length > 0,
    [pageContent]
  );

  useEffect(() => {
    var pageCounter = 0;
    if (pageContent.coverPage !== undefined) {
      ++pageCounter;
    }
    if (pageContent.highlight !== undefined) {
      ++pageCounter;
    }
    if (pageContent.hotels && pageContent.hotels.length > 0) {
      var reducedList = pageContent.hotels.reduce(
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
          downloadEnabled={downloadEnabled()}
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
