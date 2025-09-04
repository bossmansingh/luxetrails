import { BrandGreen, Domain, poppinsFont, styles } from "@/util/Constants";
import Image from "next/image";
import WatermarkLogo from "@/public/logo_gold_no_text.png";

const BackgroundLayer: React.FC<{ addWatermark: boolean }> = ({
  addWatermark,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        maxHeight: 1122,
        pointerEvents: "none",
      }}
    >
      {addWatermark && (
        <Image
          style={{
            opacity: 0.1,
            position: "absolute",
            bottom: 16,
            left: 16,
            width: "320px",
            height: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          src={WatermarkLogo}
          alt="Watermark logo"
          objectFit="contain"
          priority
        />
      )}
      <span
        className={poppinsFont.className}
        style={{
          ...poppinsFont.style,
          ...styles.domain,
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: "translateX(-50%)",
          color: BrandGreen,
          textAlign: "center",
        }}
      >
        {Domain}
      </span>
    </div>
  );
};

export default BackgroundLayer;
