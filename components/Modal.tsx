import { PageContent, PageType } from "@/util/Constants";
import ReactModal from "react-modal";
import CreateSingleImageAndTextContent from "@/components/CreateSingleImageAndTextContent";
import CreateCoverContent from "@/components/CreateCoverContent";
import CreateItineraryContent from "@/components/CreateItineraryContent";
import CreateTermsConditionContent from "@/components/CreateTermsConditionContent";

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
  let content;
  switch (currentPageType) {
    case PageType.HIGHLIGHTS:
      content = (
        <CreateSingleImageAndTextContent
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
        <CreateItineraryContent
          numberOfNights={pageContent.coverPage?.duration ?? 0}
          onSave={(pageTitle: string, contentTexts: string[]) => {
            onSave({
              ...pageContent,
              itinerary: {
                pageTitle: pageTitle,
                contentTexts: contentTexts,
              },
            });
          }}
          onClose={onClose}
        />
      );
      break;
    case PageType.HOTEL:
      content = <div>Hotel Content</div>;
      break;
    case PageType.DAYPLAN:
      content = (
        <CreateSingleImageAndTextContent
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
    case PageType.TERMS:
      content = (
        <CreateTermsConditionContent
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
      content = (
        <CreateCoverContent
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

export default DialogComponent;
