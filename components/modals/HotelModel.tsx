import { HotelContent, PageType, poppinsFont, styles } from "@/util/Constants";
import ModelTitle from "@/components/modals/ModelTitle";
import { useEffect, useState } from "react";
import ModelButtons from "./ModelButtons";

const HotelInputItem: React.FC<{
  value: HotelContent;
  index: number;
  isSingleItem: boolean;
  updateItem: (value: HotelContent) => void;
}> = ({ value, index, isSingleItem, updateItem }) => {
  return (
    <div style={{ paddingBottom: 4 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <input
          className={poppinsFont.className}
          style={{
            ...poppinsFont.style,
            width: "100%",
            height: "auto",
            padding: 10,
            alignContent: "center",
            justifyContent: "center",
            color: "white",
            backgroundColor: "black",
          }}
          placeholder="Hotel Image 1"
          type="file"
          onChange={(e) => {
            var result = e.target.files?.item(0);
            result &&
              updateItem({
                ...value,
                images: {
                  ...value.images,
                  firstUrl: URL.createObjectURL(result),
                },
              });
          }}
        />
        <input
          className={poppinsFont.className}
          style={{
            ...poppinsFont.style,
            width: "100%",
            height: "auto",
            marginLeft: 2,
            padding: 10,
            alignContent: "center",
            justifyContent: "center",
            color: "white",
            backgroundColor: "black",
          }}
          placeholder="Hotel Image 2"
          type="file"
          onChange={(e) => {
            var result = e.target.files?.item(0);
            result &&
              updateItem({
                ...value,
                images: {
                  ...value.images,
                  secondUrl: URL.createObjectURL(result),
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
          }}
        >
          <input
            className={poppinsFont.className}
            style={{
              ...poppinsFont.style,
              width: "100%",
              height: "auto",
              padding: 10,
              alignContent: "center",
              justifyContent: "center",
              color: "white",
              backgroundColor: "black",
            }}
            placeholder="Hotel Image 2"
            type="file"
            onChange={(e) => {
              var result = e.target.files?.item(0);
              result &&
                updateItem({
                  ...value,
                  images: {
                    ...value.images,
                    thirdUrl: URL.createObjectURL(result),
                  },
                });
            }}
          />
          <input
            className={poppinsFont.className}
            style={{
              ...poppinsFont.style,
              width: "100%",
              height: "auto",
              marginLeft: 2,
              padding: 10,
              alignContent: "center",
              justifyContent: "center",
              color: "white",
              backgroundColor: "black",
            }}
            placeholder="Hotel Image 2"
            type="file"
            onChange={(e) => {
              var result = e.target.files?.item(0);
              result &&
                updateItem({
                  ...value,
                  images: {
                    ...value.images,
                    fourthUrl: URL.createObjectURL(result),
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
const HotelModel: React.FC<{
  onClose: () => void;
  onSave: (hotels: HotelContent[]) => void;
}> = ({ onClose, onSave }) => {
  const [hotelCount, setHotelCount] = useState(1);
  const [hotels, setHotels] = useState<HotelContent[]>([
    { images: { firstUrl: "", secondUrl: "" }, title: "", subtitle: "" },
  ]);
  useEffect(() => {
    if (hotelCount === hotels.length) return;
    if (hotelCount > hotels.length) {
      setHotels(
        hotels.concat(
          Array<HotelContent>(hotelCount - hotels.length).fill({
            images: { firstUrl: "", secondUrl: "" },
            title: "",
            subtitle: "",
          })
        )
      );
    } else if (hotelCount < hotels.length) {
      setHotels(hotels.slice(0, hotelCount));
    }
  }, [hotelCount]);
  return (
    <>
      <ModelTitle pageType={PageType.HOTEL} />
      <div style={{ width: "100%", display: "flex", paddingTop: 8 }}>
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
          {hotels.map((value, index) => (
            <HotelInputItem
              key={`hotel_input_${index}`}
              value={value}
              index={index}
              isSingleItem={hotels.length === 1}
              updateItem={(updatedValue: HotelContent) => {
                var newValues = [...hotels];
                newValues[index] = updatedValue;
                setHotels(newValues);
              }}
            />
          ))}
        </div>
      </div>
      <ModelButtons onClose={onClose} onSave={() => onSave(hotels)} />
    </>
  );
};

export default HotelModel;
