import {
  cinzelDecorativeFont,
  Domain,
  poppinsFont,
  styles,
} from "@/util/Constants";
import Image from "next/image";
import CompanyLogo from "@/public/logo_gold.svg";

const CoverPage: React.FC<{
  title: string;
  ppCost: number;
  duration: number;
}> = ({ title, ppCost, duration }) => {
  return (
    <div style={styles.coverPage}>
      <div style={styles.coverPageContent}>
        <h1
          className={cinzelDecorativeFont.className}
          style={(cinzelDecorativeFont.style, styles.coverTitle)}
        >
          {title}
        </h1>
        <p
          className={poppinsFont.className}
          style={{
            ...poppinsFont.style,
            fontWeight: "700",
            fontSize: 25,
            marginTop: 15,
          }}
        >
          {ppCost.toLocaleString("en-IN")} Per Person
        </p>
        <p
          className={poppinsFont.className}
          style={{ ...poppinsFont.style, fontSize: 20 }}
        >
          {duration} nights {duration + 1} days
        </p>
        <Image
          style={{
            marginTop: 80,
            width: "auto",
            height: "auto",
          }}
          src={CompanyLogo}
          alt="Company logo"
          width={600}
          height={500}
          priority
        />
        <p
          className={poppinsFont.className}
          style={{
            ...poppinsFont.style,
            marginTop: 30,
            fontSize: 25,
            letterSpacing: 15,
          }}
        >
          ITINERARY
        </p>
        <span
          className={poppinsFont.className}
          style={(poppinsFont.style, styles.domain)}
        >
          {Domain}
        </span>
      </div>
    </div>
  );
};

export default CoverPage;
