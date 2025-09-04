import { PageType } from "@/util/Constants";
import ReactModal from "react-modal";
import CreateHighlightContent from "@/components/CreateHighlightContent";
import CreateCoverContent from "@/components/CreateCoverContent";

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
  currentPageType: PageType | null;
  isOpen: boolean;
  onSaveCover: (
    title: string,
    pricePerPerson: number,
    numberOfNights: number
  ) => void;
  onSaveHighlight: (imageUrl: string, highlightText: string) => void;
  onClose: () => void;
}> = ({ currentPageType, isOpen, onSaveCover, onSaveHighlight, onClose }) => {
  let content;
  switch (currentPageType) {
    case PageType.HIGHLIGHTS:
      content = (
        <CreateHighlightContent onClose={onClose} onSave={onSaveHighlight} />
      );
      break;
    case PageType.ITINERARY:
      content = <div>Itinerary Content</div>;
      break;
    case PageType.HOTEL:
      content = <div>Hotel Content</div>;
      break;
    case PageType.DAYPLAN:
      content = <div>Day Plan Content</div>;
      break;
    case PageType.FLIGHT:
      content = <div>Flight Content</div>;
      break;
    case PageType.INCLUSION_EXCLUSION:
      content = <div>Inclusion/Exclusion Content</div>;
      break;
    case PageType.TERMS:
      content = <div>Terms & Conditions Content</div>;
      break;
    default:
      content = <CreateCoverContent onClose={onClose} onSave={onSaveCover} />;
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
