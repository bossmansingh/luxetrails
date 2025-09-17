import Image from "next/image";
import { poppinsFont, renderMarkdown } from "@/util/Constants";
import { useMemo } from "react";
import parse from "html-react-parser";

const SingleImageAndTextLayout: React.FC<{
  imageUrl: string;
  contentText: string;
}> = ({ imageUrl, contentText }) => {
  const contentTextPoints = useMemo(() => {
    return contentText.split("\n").filter((v) => v.length > 0);
  }, [contentText]);
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
      <ul
        className={poppinsFont.className}
        style={
          (poppinsFont.style,
          {
            fontWeight: "500",
            color: "black",
            padding: 24,
            fontSize: 18,
            lineHeight: 3,
          })
        }
      >
        {contentTextPoints.map((value, index) => (
          <li key={`${value}_${index}`}>
            {parse(renderMarkdown(value).toString())}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SingleImageAndTextLayout;
