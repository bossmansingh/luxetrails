import Image from "next/image";
import { poppinsFont, TextToPoints } from "@/util/Constants";

const SingleImageAndTextLayout: React.FC<{
  imageUrl: string;
  contentText: string;
  recommendationText?: string;
}> = ({ imageUrl, contentText, recommendationText }) => {
  return (
    <>
      <Image
        style={{
          marginTop: 50,
          width: "100%",
          height: "auto",
          borderRadius: 8,
          overflow: "hidden",
          objectFit: "cover",
        }}
        src={imageUrl}
        alt="Single Image"
        width={300}
        height={300}
      />
      <TextToPoints text={contentText} />
      {recommendationText && (
        <>
          <br />
          <span
            className={poppinsFont.className}
            style={{
              ...poppinsFont.style,
              color: "black",
              fontSize: 18,
            }}
          >
            <strong>LuxeTrails Recommends</strong>
          </span>
          <TextToPoints text={recommendationText} />
        </>
      )}
    </>
  );
};

export default SingleImageAndTextLayout;
