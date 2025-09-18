import { HotelModel, poppinsFont } from "@/util/Constants";
import Image from "next/image";
import Placeholder from "@/public/placeholder.jpg";

const HotelItem: React.FC<{ value: HotelModel }> = ({ value }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        paddingBottom: 36,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Image
          width={150}
          height={150}
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: 1,
            borderRadius: 10,
            paddingRight: 4,
            overflow: "clip",
            objectFit: "fill",
          }}
          src={
            value.images.firstUrl.length > 0
              ? value.images.firstUrl
              : Placeholder
          }
          alt="Hotel First Image"
        />
        <Image
          width={150}
          height={150}
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: 1,
            borderRadius: 10,
            paddingLeft: 4,
            overflow: "clip",
            objectFit: "fill",
          }}
          src={
            value.images.secondUrl.length > 0
              ? value.images.secondUrl
              : Placeholder
          }
          alt="Hotel Second Image"
        />
      </div>
      {value.images.thirdUrl && value.images.fourthUrl && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 8,
          }}
        >
          <Image
            width={150}
            height={150}
            style={{
              width: "auto",
              height: "auto",
              aspectRatio: 1,
              borderRadius: 10,
              paddingRight: 4,
              overflow: "clip",
              objectFit: "cover",
            }}
            src={
              value.images.thirdUrl.length > 0
                ? value.images.thirdUrl
                : Placeholder
            }
            alt="Hotel Third Image"
          />
          <Image
            width={150}
            height={150}
            style={{
              width: "auto",
              height: "auto",
              aspectRatio: 1,
              borderRadius: 10,
              paddingLeft: 4,
              overflow: "clip",
              objectFit: "cover",
            }}
            src={
              value.images.fourthUrl.length > 0
                ? value.images.fourthUrl
                : Placeholder
            }
            alt="Hotel Fourth Image"
          />
        </div>
      )}
      <span
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          marginTop: 10,
          fontSize: 22,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {value.title}
      </span>
      <span
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          fontSize: 20,
          fontWeight: 300,
          textAlign: "center",
        }}
      >
        {value.subtitle}
      </span>
    </div>
  );
};
const HotelPage: React.FC<{ hotels: HotelModel[] }> = ({ hotels }) => {
  return (
    <div
      style={{
        marginTop: 60,
        display: "flex",
        flexDirection: "column",
        color: "black",
      }}
    >
      {hotels.map((value: HotelModel, index: number) => (
        <HotelItem key={`hotel_${index}`} value={value} />
      ))}
    </div>
  );
};

export default HotelPage;
