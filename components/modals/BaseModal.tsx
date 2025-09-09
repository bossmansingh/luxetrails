import {
  HotelContent,
  PageContent,
  PageType,
  ScopeText,
} from "@/util/Constants";
import ReactModal from "react-modal";
import SingleImageTextModel from "@/components/modals/SingleImageTextModel";
import CoverModel from "@/components/modals/CoverModel";
import ItineraryModel from "@/components/modals/ItineraryModel";
import TermsConditionModel from "@/components/modals/TermsConditionModel";
import HotelModel from "./HotelModel";
import { ReactNode, useEffect, useMemo, useState } from "react";

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

const DialogComponent: React.FC<{
  pageContent: PageContent;
  currentPageType: PageType | null;
  isOpen: boolean;
  onSave: (pageContent: PageContent) => void;
  onClose: () => void;
}> = ({ pageContent, currentPageType, isOpen, onSave, onClose }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  useEffect(() => {
    var content: ReactNode | null;
    switch (currentPageType) {
      case PageType.COVER:
        content = (
          <CoverModel
            onClose={onClose}
            onSave={(
              title: string,
              pricePerPerson: number,
              numberOfNights: number
            ) => {
              onSave({
                ...pageContent,
                coverPage: {
                  pageTitle: title,
                  ppCost: pricePerPerson.toLocaleString("en-IN"),
                  duration: numberOfNights,
                },
              });
            }}
          />
        );
        break;
      case PageType.HIGHLIGHTS:
        content = (
          <SingleImageTextModel
            pageType={PageType.HIGHLIGHTS}
            onClose={onClose}
            onSave={(
              pageTitle: string,
              imageUrl: string,
              contentText: string
            ) => {
              onSave({
                ...pageContent,
                highlight: {
                  pageTitle: pageTitle,
                  imageUrl: imageUrl,
                  contentText: contentText,
                },
              });
            }}
          />
        );
        break;
      case PageType.ITINERARY:
        content = (
          <ItineraryModel
            numberOfNights={pageContent.coverPage?.duration ?? 0}
            onSave={(contentTexts: string[]) => {
              onSave({
                ...pageContent,
                itinerary: {
                  pageTitle: "ITINERARY",
                  contentTexts: contentTexts,
                },
              });
            }}
            onClose={onClose}
          />
        );
        break;
      case PageType.HOTEL:
        content = (
          <HotelModel
            onClose={onClose}
            onSave={(hotels: HotelContent[]) => {
              onSave({
                ...pageContent,
                hotels: [...hotels],
              });
            }}
          />
        );
        break;
      case PageType.DAYPLAN:
        content = (
          <SingleImageTextModel
            pageType={PageType.DAYPLAN}
            onClose={onClose}
            onSave={(
              pageTitle: string,
              imageUrl: string,
              contentText: string
            ) => {
              onSave({
                ...pageContent,
                dayPlan: [
                  ...(pageContent.dayPlan ?? []),
                  {
                    pageTitle: pageTitle,
                    imageUrl: imageUrl,
                    contentText: contentText,
                  },
                ],
              });
            }}
          />
        );
        break;
      case PageType.FLIGHT:
        content = <div>Flight Content</div>;
        break;
      case PageType.INCLUSION_EXCLUSION:
        content = <div>Inclusion/Exclusion Content</div>;
        break;
      case PageType.SCOPE_OF_SERVICE:
        onSave({
          ...pageContent,
          scopeOfService: {
            pageTitle: "Our Scope of Services",
            contentText: ScopeText,
          },
        });
        content = null;
        break;
      case PageType.TERMS:
        content = (
          <TermsConditionModel
            onClose={onClose}
            onSave={(contentText: string) => {
              onSave({
                ...pageContent,
                termsCondition: {
                  contentText: contentText,
                },
              });
            }}
          />
        );
        break;
      default:
        content = null;
        break;
    }
    setModalContent(content);
  }, [currentPageType]);
  return (
    modalContent && (
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
          {modalContent}
        </div>
      </ReactModal>
    )
  );
};

ReactModal.setAppElement("#main");

export default DialogComponent;
