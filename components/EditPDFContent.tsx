import {
  CanvasWidth,
  CoverPageModel,
  DefaultAirlinePolicyText,
  DefaultAirlinePolicyTitle,
  DefaultAmendmentText,
  DefaultAmendmentTitle,
  DefaultHotelPolicyText,
  DefaultHotelPolicyTitle,
  DefaultScopeText,
  DefaultTermsCondition,
  HotelModel,
  ImportantNotesModel,
  importNotesItem,
  InclusionExclusionModel,
  ItineraryModel,
  PageContentModel,
  poppinsFont,
  scopeOfServiceItem,
  ScopeServiceModel,
  SingleImageAndTextModel,
  styles,
  TermsConditionModel,
  termsItem,
  TitleText,
} from "@/util/Constants";
import Image from "next/image";
import React, {
  CSSProperties,
  JSX,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const inputTextStyle = {
  ...poppinsFont.style,
  width: "100%",
  height: "40px",
  fontSize: 16,
  paddingLeft: 12,
  paddingRight: 12,
};
const buttonStyle = {
  ...styles.modalButton,
  ...poppinsFont.style,
};

const CardView: React.FC<{ titleText: string; content: JSX.Element }> = ({
  titleText,
  content,
}) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(256,256,256,0.9)",
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TitleText text={titleText} style={{ marginBottom: 10 }} />
      {content}
    </div>
  );
};

const ImageView: React.FC<{
  imageURL?: string;
  updateImage: (imageURL: string) => void;
  style?: CSSProperties;
}> = ({ imageURL, updateImage, style }) => {
  return imageURL && (imageURL.length ?? 0) > 0 ? (
    <div
      style={{
        ...style,
        position: "relative",
        width: "fit-content",
      }}
    >
      <Image
        style={{
          borderRadius: 8,
          overflow: "hidden",
          objectFit: "cover",
        }}
        src={imageURL}
        alt="Image"
        width={300}
        height={300}
      />
      <button
        className={poppinsFont.className}
        style={{
          ...styles.modalButton,
          ...poppinsFont.style,
          backgroundColor: "red",
          alignSelf: "center",
          borderRadius: "50%",
          position: "absolute",
          width: "25px",
          height: "25px",
          top: 10,
          right: 10,
          fontWeight: 600,
          fontSize: 16,
          padding: 0,
        }}
        onClick={() => {
          updateImage("");
        }}
      >
        X
      </button>
    </div>
  ) : (
    <input
      className={poppinsFont.className}
      style={{
        ...style,
        ...poppinsFont.style,
        width: "300px",
        height: "300px",
        paddingLeft: "8%",
        alignContent: "center",
        justifyContent: "center",
        color: "white",
        backgroundColor: "black",
        borderRadius: 5,
      }}
      type="file"
      onChange={(e) => {
        var result = e.target.files?.item(0);
        result && updateImage(URL.createObjectURL(result));
      }}
    />
  );
};

const CoverPageSection: React.FC<{
  coverPageContent: CoverPageModel;
  setCoverPageContent: (newCoverPageContent: CoverPageModel) => void;
}> = ({ coverPageContent, setCoverPageContent }) => {
  return (
    <>
      <input
        className={poppinsFont.className}
        style={inputTextStyle}
        placeholder="Enter title"
        type="text"
        value={coverPageContent.pageTitle}
        onChange={(e) =>
          setCoverPageContent({
            ...coverPageContent,
            pageTitle: e.target.value,
          })
        }
      />
      <input
        className={poppinsFont.className}
        style={inputTextStyle}
        placeholder="Price per person"
        type="number"
        value={coverPageContent.ppCost > 0 ? coverPageContent.ppCost : ""}
        onChange={(e) =>
          setCoverPageContent({
            ...coverPageContent,
            ppCost: Number(e.target.value),
          })
        }
      />
      <input
        className={poppinsFont.className}
        style={inputTextStyle}
        placeholder="Number of nights"
        type="number"
        value={coverPageContent.duration > 0 ? coverPageContent.duration : ""}
        onChange={(e) =>
          setCoverPageContent({
            ...coverPageContent,
            duration: Number(e.target.value),
          })
        }
      />
    </>
  );
};

const HighlightPageSection: React.FC<{
  highlightPageContent: SingleImageAndTextModel;
  setHighlightPageContent: (
    newHighlightPageContent: SingleImageAndTextModel
  ) => void;
}> = ({ highlightPageContent, setHighlightPageContent }) => {
  return (
    <>
      <ImageView
        imageURL={highlightPageContent.imageUrl}
        style={{ marginBottom: 10 }}
        updateImage={(imageURL: string) => {
          setHighlightPageContent({
            ...highlightPageContent,
            imageUrl: imageURL,
          });
        }}
      />
      <textarea
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          minHeight: "120px",
          fontSize: 14,
          padding: 12,
        }}
        placeholder="Highlight Text"
        value={highlightPageContent.contentText}
        onChange={(e) =>
          setHighlightPageContent({
            ...highlightPageContent,
            contentText: e.target.value,
          })
        }
      />
    </>
  );
};

const HotelInputItem: React.FC<{
  value: HotelModel;
  index: number;
  isSingleItem: boolean;
  updateItem: (value: HotelModel) => void;
}> = ({ value, index, isSingleItem, updateItem }) => {
  return (
    <div style={{ paddingBottom: 4 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <ImageView
          imageURL={value.images.firstUrl}
          style={{ marginRight: 4 }}
          updateImage={(imageURL: string) => {
            updateItem({
              ...value,
              images: {
                ...value.images,
                firstUrl: imageURL,
              },
            });
          }}
        />
        <ImageView
          imageURL={value.images.secondUrl}
          style={{ marginLeft: 4 }}
          updateImage={(imageURL: string) => {
            updateItem({
              ...value,
              images: {
                ...value.images,
                secondUrl: imageURL,
              },
            });
          }}
        />
      </div>
      {isSingleItem && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          <ImageView
            imageURL={value.images.thirdUrl}
            style={{ marginRight: 4 }}
            updateImage={(imageURL: string) => {
              updateItem({
                ...value,
                images: {
                  ...value.images,
                  thirdUrl: imageURL,
                },
              });
            }}
          />
          <ImageView
            imageURL={value.images.fourthUrl}
            style={{ marginLeft: 4 }}
            updateImage={(imageURL: string) => {
              updateItem({
                ...value,
                images: {
                  ...value.images,
                  fourthUrl: imageURL,
                },
              });
            }}
          />
        </div>
      )}
      <input
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          height: "40px",
          fontSize: 16,
          marginTop: 8,
          paddingLeft: 12,
          paddingRight: 12,
        }}
        placeholder={`Enter hotel ${index + 1} title`}
        type="text"
        value={value.title}
        onChange={(e) => {
          updateItem({
            ...value,
            title: e.target.value,
          });
        }}
      />
      <input
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          height: "40px",
          fontSize: 16,
          paddingLeft: 12,
          paddingRight: 12,
        }}
        placeholder={`Enter hotel ${index + 1} subtitle`}
        type="text"
        value={value.subtitle}
        onChange={(e) => {
          updateItem({
            ...value,
            subtitle: e.target.value,
          });
        }}
      />
    </div>
  );
};

const HotelPageSection: React.FC<{
  hotelPageContent: HotelModel[];
  setHotelPageContent: (newHotels: HotelModel[]) => void;
}> = ({ hotelPageContent, setHotelPageContent }) => {
  const [hotelCount, setHotelCount] = useState(hotelPageContent.length);
  useEffect(() => {
    if (hotelCount === hotelPageContent.length) return;
    if (hotelCount > hotelPageContent.length) {
      setHotelPageContent(
        hotelPageContent.concat(
          Array<HotelModel>(hotelCount - hotelPageContent.length).fill({
            images: { firstUrl: "", secondUrl: "" },
            title: "",
            subtitle: "",
          })
        )
      );
    } else if (hotelCount < hotelPageContent.length) {
      setHotelPageContent(hotelPageContent.slice(0, hotelCount));
    }
  }, [hotelCount]);
  return (
    <>
      <div style={{ width: "100%", display: "flex" }}>
        <select
          className={poppinsFont.className}
          style={{
            ...poppinsFont.style,
            backgroundColor: "black",
            color: "white",
            height: "30px",
            borderRadius: 5,
            justifySelf: "center",
            padding: 15,
            fontSize: 12,
          }}
          value={hotelPageContent.length}
          onChange={(e) => {
            setHotelCount(Number.parseInt(e.target.value));
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <div
          style={{
            width: "100%",
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          {hotelPageContent.map((value, index) => (
            <HotelInputItem
              key={`hotel_input_${index}`}
              value={value}
              index={index}
              isSingleItem={hotelPageContent.length === 1}
              updateItem={(updatedValue: HotelModel) => {
                var newValues = [...hotelPageContent];
                newValues[index] = updatedValue;
                setHotelPageContent(newValues);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const ItineraryPageSection: React.FC<{
  itineraryPageContent: ItineraryModel;
  setItineraryPageContent: (newContent: ItineraryModel) => void;
}> = ({ itineraryPageContent, setItineraryPageContent }) => {
  const handleInputChange = useCallback(
    (index: number, value: string) => {
      const newValues = [...itineraryPageContent.contentTexts];
      newValues[index] = value;
      setItineraryPageContent({
        ...itineraryPageContent,
        contentTexts: newValues,
      });
    },
    [itineraryPageContent.contentTexts]
  );
  const items = useMemo(
    () =>
      itineraryPageContent.contentTexts.map((value, index) => (
        <div
          key={`${value}_${index}`}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <span
            className={poppinsFont.className}
            style={{
              ...poppinsFont.style,
              width: "10%",
              textAlign: "center",
              fontSize: 18,
              fontWeight: 600,
            }}
          >{`Day ${index + 1}`}</span>
          <input
            key={`night_${index}`}
            className={poppinsFont.className}
            style={{
              ...poppinsFont.style,
              width: "90%",
              height: "40px",
              fontSize: 16,
              paddingLeft: 12,
              paddingRight: 12,
            }}
            placeholder="Schedule"
            type="text"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      )),
    [itineraryPageContent.contentTexts]
  );
  return items;
};

const DayPlanPageSection: React.FC<{
  dayPlanPageContent: SingleImageAndTextModel[];
  setDayPlanPageContent: (newContent: SingleImageAndTextModel[]) => void;
}> = ({ dayPlanPageContent, setDayPlanPageContent }) => {
  const handleInputChange = (index: number, value: SingleImageAndTextModel) => {
    const newValues = [...dayPlanPageContent];
    newValues[index] = value;
    setDayPlanPageContent(newValues);
  };
  return dayPlanPageContent.map((value, index) => (
    <div
      key={`dayplan_${index}`}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ImageView
        imageURL={value.imageUrl}
        style={{ marginBottom: 10 }}
        updateImage={(imageURL: string) => {
          handleInputChange(index, {
            ...value,
            imageUrl: imageURL,
          });
        }}
      />
      <input
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          height: "40px",
          fontSize: 14,
          marginTop: 10,
          paddingLeft: 12,
          paddingRight: 12,
        }}
        placeholder={`Day ${index + 1} - Title`}
        type="text"
        value={value.pageTitle}
        onChange={(e) => {
          handleInputChange(index, {
            ...value,
            pageTitle: e.target.value,
          });
        }}
      />
      <textarea
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          minHeight: "120px",
          fontSize: 14,
          padding: 12,
          marginBottom: 10,
        }}
        placeholder={`Day ${index + 1} Plan`}
        value={value.contentText}
        onChange={(e) =>
          handleInputChange(index, {
            ...value,
            contentText: e.target.value,
          })
        }
      />
      <textarea
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          minHeight: "80px",
          fontSize: 14,
          padding: 12,
          marginBottom: 10,
        }}
        placeholder={`Day ${index + 1} Recommendation (optional)`}
        value={value.recommendationText}
        onChange={(e) => {
          var newValue = e.target.value;
          handleInputChange(index, {
            ...value,
            recommendationText: newValue.length > 0 ? newValue : undefined,
          });
        }}
      />
    </div>
  ));
};

const InclusionExclusionPageSection: React.FC<{
  inclusionExclusionContent: InclusionExclusionModel;
  setInclusionExclusionContent: (newContent: InclusionExclusionModel) => void;
}> = ({ inclusionExclusionContent, setInclusionExclusionContent }) => {
  return (
    <>
      <textarea
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          minHeight: "120px",
          marginTop: 10,
          fontSize: 14,
          padding: 12,
        }}
        placeholder="Inclusion Text"
        value={inclusionExclusionContent.inclusion}
        onChange={(e) =>
          setInclusionExclusionContent({
            ...inclusionExclusionContent,
            inclusion: e.target.value,
          })
        }
      />
      <textarea
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          width: "100%",
          minHeight: "120px",
          marginTop: 10,
          fontSize: 14,
          padding: 12,
        }}
        placeholder="Exclusion Text"
        value={inclusionExclusionContent.exclusion}
        onChange={(e) =>
          setInclusionExclusionContent({
            ...inclusionExclusionContent,
            exclusion: e.target.value,
          })
        }
      />
    </>
  );
};

const FlightsPageSection: React.FC<{
  flightsContent: string[];
  setFlightsContent: (newValues: string[]) => void;
}> = ({ flightsContent, setFlightsContent }) => {
  const flightItems = useMemo(
    () =>
      flightsContent.map((value, index) => (
        <ImageView
          key={`flight_image_${index}`}
          imageURL={value}
          style={{ marginBottom: 10 }}
          updateImage={(imageURL: string) => {
            var newValues = [...flightsContent];
            newValues[index] = imageURL;
            var firstIndex = newValues.indexOf("");
            var lastIndex = newValues.lastIndexOf("");
            setFlightsContent(
              firstIndex === lastIndex && lastIndex === -1
                ? newValues.concat("")
                : firstIndex !== lastIndex && lastIndex === newValues.length - 1
                ? newValues.slice(0, newValues.length - 1)
                : newValues
            );
          }}
        />
      )),
    [flightsContent]
  );
  return <>{flightItems}</>;
};

const CheckboxItem: React.FC<{
  id: string;
  name: string;
  value: string;
  isChecked: boolean;
  updateItem: (value: string, checked: boolean) => void;
}> = ({ id, name, value, isChecked, updateItem }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        alignItems: "center",
        padding: 10,
      }}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onChange={(e) => {
          updateItem(e.target.value, e.target.checked);
        }}
      />
      <span
        className={poppinsFont.className}
        style={{ ...poppinsFont.style, fontSize: 20, fontWeight: 500 }}
      >
        {value}
      </span>
    </div>
  );
};
const RemainingPageSection: React.FC<{
  isScopeChecked: boolean;
  isImportantNotesChecked: boolean;
  isTermsChecked: boolean;
  updateCheck: (newValue: string, checked: boolean) => void;
}> = ({
  isScopeChecked,
  isImportantNotesChecked,
  isTermsChecked,
  updateCheck,
}) => {
  return (
    <>
      <CheckboxItem
        id="scope_service"
        name="Scope Service"
        value={scopeOfServiceItem.label}
        isChecked={isScopeChecked}
        updateItem={updateCheck}
      />
      <CheckboxItem
        id="important_notes"
        name="Important Notes"
        value={importNotesItem.label}
        isChecked={isImportantNotesChecked}
        updateItem={updateCheck}
      />
      <CheckboxItem
        id="tos"
        name="terms & conditions"
        value={termsItem.label}
        isChecked={isTermsChecked}
        updateItem={updateCheck}
      />
    </>
  );
};
const ButtonsContainer: React.FC<{
  onClose: () => void;
  onSaveChanges: () => void;
}> = ({ onClose, onSaveChanges }) => {
  return (
    <div
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        bottom: 0,
        position: "relative",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "black",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1)",
      }}
    >
      <button
        className={poppinsFont.className}
        style={{
          ...buttonStyle,
          marginRight: 10,
        }}
        onClick={onSaveChanges}
      >
        SAVE
      </button>
      <button
        className={poppinsFont.className}
        style={{
          ...buttonStyle,
          marginLeft: 10,
        }}
        onClick={onClose}
      >
        CLOSE
      </button>
    </div>
  );
};

const EditPDFContent: React.FC<{
  pageContent: PageContentModel;
  onClose: () => void;
  onSaveChanges: (newPageContent: PageContentModel) => void;
}> = ({ pageContent, onClose, onSaveChanges }) => {
  const [coverPageContent, setCoverPageContent] = useState<CoverPageModel>(
    pageContent.coverPage ?? {
      pageTitle: "",
      ppCost: 0,
      duration: 0,
    }
  );
  const [highlightPageContent, setHighlightPageContent] =
    useState<SingleImageAndTextModel>(
      pageContent.highlight ?? {
        pageTitle: "Highlights",
        contentText: "",
        imageUrl: "",
      }
    );
  const [hotelPageContent, setHotelPageContent] = useState<HotelModel[]>(
    pageContent.hotels ?? [
      { images: { firstUrl: "", secondUrl: "" }, title: "", subtitle: "" },
    ]
  );
  const [itineraryPageContent, setItineraryPageContent] =
    useState<ItineraryModel>(
      pageContent.itinerary ?? {
        pageTitle: "Itinerary",
        contentTexts: [],
      }
    );
  const [dayPlanPageContent, setDayPlanPageContent] = useState<
    SingleImageAndTextModel[]
  >(pageContent.dayPlan ?? []);
  const [inclusionExclusionContent, setInclusionExclusionContent] =
    useState<InclusionExclusionModel>(
      pageContent.inclusionExclusion ?? { inclusion: "", exclusion: "" }
    );
  const [flightsContent, setFlightsContent] = useState<string[]>(
    pageContent.flights ?? [""]
  );
  const [scopeServiceContent, setScopeServiceContent] = useState<
    ScopeServiceModel | undefined
  >(pageContent.scopeOfService);
  const [importantNotesContent, setImportantNotesContent] = useState<
    ImportantNotesModel | undefined
  >(pageContent.importantNotes);
  const [termsContent, setTermsContent] = useState<
    TermsConditionModel | undefined
  >(pageContent.termsCondition);

  const items = useMemo(
    () => [
      {
        titleText: "Cover Page",
        content: (
          <CoverPageSection
            coverPageContent={coverPageContent}
            setCoverPageContent={setCoverPageContent}
          />
        ),
      },
      {
        titleText: "Highlights Page",
        content: (
          <HighlightPageSection
            highlightPageContent={highlightPageContent}
            setHighlightPageContent={setHighlightPageContent}
          />
        ),
      },
      {
        titleText: "Hotels Page",
        content: (
          <HotelPageSection
            hotelPageContent={hotelPageContent}
            setHotelPageContent={setHotelPageContent}
          />
        ),
      },
      {
        titleText: "Itinerary Page",
        content: (
          <ItineraryPageSection
            itineraryPageContent={itineraryPageContent}
            setItineraryPageContent={setItineraryPageContent}
          />
        ),
      },
      {
        titleText: "Day Plan Page",
        content: (
          <DayPlanPageSection
            dayPlanPageContent={dayPlanPageContent}
            setDayPlanPageContent={setDayPlanPageContent}
          />
        ),
      },
      {
        titleText: "Inclusion/Exclusion Page",
        content: (
          <InclusionExclusionPageSection
            inclusionExclusionContent={inclusionExclusionContent}
            setInclusionExclusionContent={setInclusionExclusionContent}
          />
        ),
      },
      {
        titleText: "Flights Page",
        content: (
          <FlightsPageSection
            flightsContent={flightsContent}
            setFlightsContent={setFlightsContent}
          />
        ),
      },
      {
        titleText: "Select Remaining Pages to Include",
        content: (
          <RemainingPageSection
            isScopeChecked={scopeServiceContent !== undefined}
            isImportantNotesChecked={importantNotesContent !== undefined}
            isTermsChecked={termsContent !== undefined}
            updateCheck={(newValue: string, checked: boolean) => {
              if (newValue === scopeOfServiceItem.label) {
                setScopeServiceContent(
                  checked
                    ? {
                        pageTitle: scopeOfServiceItem.label,
                        contentText: DefaultScopeText,
                      }
                    : undefined
                );
              } else if (newValue === importNotesItem.label) {
                setImportantNotesContent(
                  checked
                    ? {
                        pageTitle: importNotesItem.label,
                        airlinePolicyTitle: DefaultAirlinePolicyTitle,
                        airlinePolicyText: DefaultAirlinePolicyText,
                        hotelPolicyTitle: DefaultHotelPolicyTitle,
                        hotelPolicyText: DefaultHotelPolicyText,
                        amendmentPolicyTitle: DefaultAmendmentTitle,
                        amendmentPolicyText: DefaultAmendmentText,
                      }
                    : undefined
                );
              } else if (newValue === termsItem.label) {
                setTermsContent(
                  checked
                    ? {
                        pageTitle: termsItem.label,
                        contentText: DefaultTermsCondition,
                      }
                    : undefined
                );
              } else {
              }
            }}
          />
        ),
      },
    ],
    [
      coverPageContent,
      highlightPageContent,
      hotelPageContent,
      itineraryPageContent,
      dayPlanPageContent,
      inclusionExclusionContent,
      flightsContent,
      scopeServiceContent,
      importantNotesContent,
      termsContent,
    ]
  );

  useEffect(() => {
    if (
      itineraryPageContent.contentTexts.length !==
      coverPageContent.duration + 1
    ) {
      setItineraryPageContent({
        ...itineraryPageContent,
        contentTexts: Array(coverPageContent.duration + 1).fill(""),
      });
    }
    if (dayPlanPageContent.length !== coverPageContent.duration + 1) {
      setDayPlanPageContent(
        Array<SingleImageAndTextModel>(coverPageContent.duration + 1).fill({
          pageTitle: "",
          contentText: "",
          imageUrl: "",
        })
      );
    }
  }, [coverPageContent.duration, itineraryPageContent.contentTexts.length]);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          height: "100%",
          overflow: "scroll",
          alignSelf: "center",
          paddingTop: 60,
        }}
      >
        <div
          style={{
            width: CanvasWidth,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {items.map((value, index) => (
            <CardView
              key={`card_view_${index}`}
              titleText={value.titleText}
              content={value.content}
            />
          ))}
        </div>
      </div>
      <ButtonsContainer
        onClose={onClose}
        onSaveChanges={() =>
          onSaveChanges({
            ...pageContent,
            coverPage: coverPageContent,
            highlight: highlightPageContent,
            hotels: hotelPageContent,
            itinerary: itineraryPageContent,
            dayPlan: dayPlanPageContent,
            inclusionExclusion: inclusionExclusionContent,
            flights: flightsContent.filter((v) => v.length > 0),
            scopeOfService: scopeServiceContent,
            importantNotes: importantNotesContent,
            termsCondition: termsContent,
          })
        }
      />
    </div>
  );
};

export default EditPDFContent;
