import { aspectRatio } from "@/util/Constants";
import Image from "next/image";

const FlightPage: React.FC<{ imageURL: string }> = ({ imageURL }) => {
  return (
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
      src={imageURL}
      alt="Flight image"
    />
  );
};

export default FlightPage;
