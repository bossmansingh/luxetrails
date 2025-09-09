import Image from "next/image";
import { poppinsFont } from "@/util/Constants";

const SingleImageAndTextLayout: React.FC<{
  imageUrl: string;
  highlightText: string;
}> = ({ imageUrl, highlightText }) => {
  return (
    <>
      <Image
        style={{
          marginTop: 50,
          width: "100%",
          height: "auto",
          borderRadius: 8,
          overflow: "clip",
          objectFit: "cover",
        }}
        src={imageUrl}
        alt="Single Image"
        width={300}
        height={300}
      />
      <span
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          whiteSpace: "pre-wrap",
          display: "block",
          fontWeight: "500",
          padding: 24,
          color: "black",
          fontSize: 18,
          lineHeight: 2,
        }}
      >
        {highlightText}
      </span>
    </>
  );
};

export default SingleImageAndTextLayout;
