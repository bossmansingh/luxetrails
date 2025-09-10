import {
  HotelModel,
  PageContentModel,
  PageType,
  DefaultScopeText,
  importNotesItem,
  DefaultAirlinePolicyTitle,
  DefaultAirlinePolicyText,
  DefaultHotelPolicyTitle,
  DefaultHotelPolicyText,
  DefaultAmendmentTitle,
  DefaultAmendmentText,
  termsItem,
  scopeOfServiceItem,
  itineraryItem,
} from "@/util/Constants";
import ReactModal from "react-modal";
import SingleImageTextModal from "@/components/modals/SingleImageTextModal";
import CoverModal from "@/components/modals/CoverModal";
import ItineraryModal from "@/components/modals/ItineraryModal";
import TermsConditionModal from "@/components/modals/TermsConditionModel";
import HotelModal from "@/components/modals/HotelModal";
import { ReactNode, useEffect, useState } from "react";
import InclusionExclusionModal from "@/components/modals/InclusionExclusionModal";
import ModalTitle from "@/components/modals/ModelTitle";
import FlightModel from "./FlightModel";

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
  pageContent: PageContentModel;
  currentPageType: PageType | null;
  isOpen: boolean;
  onSave: (pageContent: PageContentModel) => void;
  onClose: () => void;
}> = ({ pageContent, currentPageType, isOpen, onSave, onClose }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  useEffect(() => {
    var content: ReactNode | null;
    switch (currentPageType) {
      case PageType.COVER:
        content = (
          <CoverModal
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
          <SingleImageTextModal
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
          <ItineraryModal
            stayDuration={(pageContent.coverPage?.duration ?? 0) + 1}
            onSave={(contentTexts: string[]) => {
              onSave({
                ...pageContent,
                itinerary: {
                  pageTitle: itineraryItem.label.toLocaleUpperCase(),
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
          <HotelModal
            onClose={onClose}
            onSave={(hotels: HotelModel[]) => {
              onSave({
                ...pageContent,
                hotels: hotels,
              });
            }}
          />
        );
        break;
      case PageType.DAYPLAN:
        content = (
          <SingleImageTextModal
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
        content = (
          <FlightModel
            onClose={onClose}
            onSave={(flights: string[]) => {
              onSave({
                ...pageContent,
                flights: [...(pageContent.flights ?? []), ...flights],
              });
            }}
          />
        );
        break;
      case PageType.INCLUSION_EXCLUSION:
        content = (
          <InclusionExclusionModal
            onClose={onClose}
            onSave={(inclusion: string, exclusion: string) => {
              onSave({
                ...pageContent,
                inclusionExclusion: {
                  inclusion: inclusion,
                  exclusion: exclusion,
                },
              });
            }}
          />
        );
        break;
      case PageType.SCOPE_OF_SERVICE:
        onSave({
          ...pageContent,
          scopeOfService: {
            pageTitle: scopeOfServiceItem.label,
            contentText: DefaultScopeText,
          },
        });
        content = null;
        break;
      case PageType.IMPORTANT_NOTES:
        onSave({
          ...pageContent,
          importantNotes: {
            pageTitle: importNotesItem.label,
            airlinePolicyTitle: DefaultAirlinePolicyTitle,
            airlinePolicyText: DefaultAirlinePolicyText,
            hotelPolicyTitle: DefaultHotelPolicyTitle,
            hotelPolicyText: DefaultHotelPolicyText,
            amendmentPolicyTitle: DefaultAmendmentTitle,
            amendmentPolicyText: DefaultAmendmentText,
          },
        });
        content = null;
        break;
      case PageType.TERMS:
        content = (
          <TermsConditionModal
            onClose={onClose}
            onSave={(contentText: string) => {
              onSave({
                ...pageContent,
                termsCondition: {
                  pageTitle: termsItem.label,
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
    modalContent &&
    currentPageType && (
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
          <ModalTitle pageType={currentPageType} />
          {modalContent}
        </div>
      </ReactModal>
    )
  );
};

ReactModal.setAppElement("#main");

export default DialogComponent;
