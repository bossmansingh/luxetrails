"use client";

import React from "react";
import { Playfair_Display, Poppins } from "next/font/google";
import { StyleSheet } from "@react-pdf/renderer";
import Image from "next/image";
import CompanyLogo from "@/public/logo_gold.png";

const aspectRatio = 0.7070707071;
const CanvasWidth = 550;
const CanvasHeight = CanvasWidth / aspectRatio;
const Domain = "www.theluxetrails.com";
const BorderGreen = "#043C2B";

const titleFont = Playfair_Display({
  weight: "800",
  subsets: ["latin"],
  preload: true,
  display: "swap",
});
const customTextFont = Poppins({
  weight: "400",
  subsets: ["latin"],
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
    width: "fit-content",
    height: "fit-content",
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#15b653ff",
  },
  section: {
    width: "100%",
    display: "flex",
    aspectRatio: aspectRatio.toString(),
  },
  button: {
    justifySelf: "end",
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#4caf50ff",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginBottom: 10,
    marginRight: 10,
    marginTop: 10,
  },
  coverPage: {
    // borderColor: BorderGreen,
    // borderWidth: 16,
    // borderStyle: "solid",
    // paddingLeft: 60,
    // paddingRight: 60,
    // paddingTop: 40,
    padding: 16,
    backgroundColor: BorderGreen,
    // display: "flex",
    // color: "black",
    // flexDirection: "column",
    // alignItems: "center",
  },
  coverPageContent: {
    // borderColor: BorderGreen,
    // borderWidth: 16,
    // borderStyle: "solid",
    width: "100%",
    height: "100%",
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 40,
    backgroundColor: "white",
    display: "flex",
    color: "black",
    flexDirection: "column",
    alignItems: "center",
  },
  coverTitle: {
    fontSize: 50,
    color: BorderGreen,
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
        <p
          className={titleFont.className}
          style={(titleFont.style, styles.coverTitle)}
        >
          {title}
        </p>
        <p
          className={customTextFont.className}
          style={
            (customTextFont.style,
            { fontWeight: "700", fontSize: 22, marginTop: 15 })
          }
        >
          {ppCost} Per Person
        </p>
        <p
          className={customTextFont.className}
          style={(customTextFont.style, { fontSize: 16 })}
        >
          {duration} nights {duration + 1} days
        </p>
        <Image
          style={{ marginTop: 70 }}
          src={CompanyLogo}
          alt="Company logo"
          width={400}
          priority
        />
        <p
          className={customTextFont.className}
          style={
            (customTextFont.style,
            { fontSize: 24, letterSpacing: 15, color: BorderGreen })
          }
        >
          ITINERARY
        </p>
        <p
          className={customTextFont.className}
          style={
            (customTextFont.style,
            { fontSize: 18, marginTop: 24, color: BorderGreen })
          }
        >
          {Domain}
        </p>
      </div>
    </div>
  );
};
const MainDocument: React.FC<{
  placeTitle: string;
  ppCost: string;
  duration: number;
}> = ({ placeTitle, ppCost, duration }) => {
  return (
    <div id="pdf-document" style={styles.page}>
      <div style={styles.section}>
        <CoverPage title={placeTitle} ppCost={ppCost} duration={duration} />
      </div>
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
        width: CanvasWidth,
        height: CanvasHeight,
      },
      jsPDF: {
        unit: "px",
        hotfixes: ["px_scaling"],
        orientation: "portrait",
      },
    };
    element && html2pdf(element, opt);
  };
  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={downloadPDF}>
        Generate PDF
      </button>
      <MainDocument
        placeTitle={placeTitle}
        ppCost={ppCost.toLocaleString("en-IN")}
        duration={durationCount}
      />
    </div>
  );
}
