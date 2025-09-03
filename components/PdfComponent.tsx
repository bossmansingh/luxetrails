"use client";

import React from "react";
import {
  Cinzel,
  Cinzel_Decorative,
  Playfair_Display,
  Poppins,
} from "next/font/google";
import { StyleSheet } from "@react-pdf/renderer";
import Image from "next/image";
import CompanyLogo from "@/public/logo_gold.png";
import BeachImage from "@/public/beach.jpg";

const aspectRatio = 0.7070707071;
const Domain = "www.theluxetrails.com";
const BrandGreen = "#043C2B";

// const titleFont = Playfair_Display({
//   weight: "600",
//   preload: true,
//   display: "swap",
// });
const cinzelFont = Cinzel({
  weight: "700",
  preload: true,
  display: "swap",
});
const cinzelDecorativeFont = Cinzel_Decorative({
  weight: "700",
  preload: true,
  display: "swap",
});
const poppinsFont = Poppins({
  weight: "400",
  preload: true,
  display: "swap",
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100vh",
    alignContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  page: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "white",
  },
  section: {
    width: "100%",
    display: "flex",
    aspectRatio: aspectRatio,
  },
  downloadButton: {
    justifySelf: "end",
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#BE8724",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginBottom: 10,
    marginRight: 10,
    marginTop: 10,
  },
  createCoverButton: {
    padding: 10,
    backgroundColor: "#BE8724",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  coverPage: {
    width: "100%",
    padding: 16,
    backgroundColor: BrandGreen,
  },
  coverPageContent: {
    width: "100%",
    height: "100%",
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: "white",
    display: "flex",
    color: BrandGreen,
    flexDirection: "column",
    alignItems: "center",
  },
  coverTitle: {
    fontSize: 69,
  },
  headerTitle: {
    fontSize: 34,
    color: BrandGreen,
    paddingTop: 10,
    paddingBottom: 10,
  },
  domain: {
    fontSize: 20,
    marginTop: 100,
  },
});

const CoverPage: React.FC<{
  title: string;
  ppCost: string;
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
          style={
            (poppinsFont.style,
            { fontWeight: "700", fontSize: 25, marginTop: 15 })
          }
        >
          {ppCost} Per Person
        </p>
        <p
          className={poppinsFont.className}
          style={(poppinsFont.style, { fontSize: 20 })}
        >
          {duration} nights {duration + 1} days
        </p>
        <Image
          style={{
            marginTop: 80,
            width: "100%",
            height: "auto",
            paddingLeft: 60,
            paddingRight: 60,
          }}
          src={CompanyLogo}
          alt="Company logo"
          width={600}
          priority
        />
        <p
          className={poppinsFont.className}
          style={(poppinsFont.style, { fontSize: 25, letterSpacing: 15 })}
        >
          ITINERARY
        </p>
        <p
          className={poppinsFont.className}
          style={(poppinsFont.style, styles.domain)}
        >
          {Domain}
        </p>
      </div>
    </div>
  );
};

const HeaderLine: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: BrandGreen,
        width: "100%",
        height: "8px",
        borderRadius: "8px",
      }}
    />
  );
};
const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div>
      <HeaderLine />
      <h1
        className={cinzelFont.className}
        style={(cinzelFont.style, styles.headerTitle)}
      >
        {title}
      </h1>
      <HeaderLine />
    </div>
  );
};
const Highlights: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        padding: 80,
      }}
    >
      <Header title={"HIGHLIGHTS"} />
      <Image
        style={{
          marginTop: 50,
          width: "100%",
          height: "auto",
          borderRadius: 8,
        }}
        src={BeachImage}
        alt="Beach Image"
        width={200}
        priority
      />
      <ul
        className={poppinsFont.className}
        style={
          (poppinsFont.style,
          {
            fontWeight: "500",
            padding: 24,
            color: "black",
            fontSize: 22,
            lineHeight: 2,
          })
        }
      >
        <li>Magical sunsets at Coconut Tree Hill & Galle Fort.</li>
        <li>Whale watching in Mirissa's deep blue waters.</li>
        <li>
          Explore the charm of UNESCO-listed Galle Fort with boutiques &
          cafés...
        </li>
        <li>Relax with a Madu River safari & turtle hatchery visit.</li>
      </ul>
    </div>
  );
};

export default function PdfComponent() {
  const placeTitle = "Sri Lanka";
  const ppCost = 125000;
  const durationCount = 4;
  const downloadPDF = async () => {
    var element: HTMLElement | null = document.getElementById("pdf-document");
    var html2pdf = await require("html2pdf.js");
    var opt: html2pdf.Options = {
      margin: 0,
      filename: placeTitle,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 4,
      },
      jsPDF: {
        unit: "px",
        hotfixes: ["px_scaling"],
        orientation: "portrait",
      },
    };
    element && html2pdf(element, opt);
  };
  const createCoverAction = () => {
    console.log("Create Cover Action");
  };
  return (
    <div style={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button style={styles.createCoverButton} onClick={createCoverAction}>
          Create Cover Page
        </button>
        <button style={styles.downloadButton} onClick={downloadPDF}>
          Download PDF
        </button>
      </div>
      <div id="pdf-document" style={styles.page}>
        <div style={styles.section}>
          <CoverPage
            title={placeTitle}
            ppCost={ppCost.toLocaleString("en-IN")}
            duration={durationCount}
          />
        </div>
        <div style={styles.section}>
          <Highlights />
        </div>
      </div>
    </div>
  );
}
