import { StyleSheet } from "@react-pdf/renderer";
import {
  Cinzel,
  Cinzel_Decorative,
  Playfair_Display,
  Poppins,
} from "next/font/google";

const aspectRatio = 0.7070707071;

export const Domain = "www.theluxetrails.com";
export const BrandGreen = "#043C2B";

export enum PageType {
  HIGHLIGHTS = "highlights",
  ITINERARY = "itinerary",
  HOTEL = "hotel",
  DAYPLAN = "dayplan",
  FLIGHT = "flight",
  INCLUSION_EXCLUSION = "inclusion_exclusion",
  TERMS = "terms",
}

export type CoverPageContent = {
  pageTitle: string;
  ppCost: string;
  duration: number;
};

export type SingleImageAndTextContent = {
  pageTitle: string;
  imageUrl: string;
  contentText: string;
};

export type PageContent = {
  coverPage?: CoverPageContent;
  highlight?: SingleImageAndTextContent;
  dayPlan?: SingleImageAndTextContent[];
};

export const pageTypes = [
  { label: "Highlights", value: PageType.HIGHLIGHTS },
  { label: "Itinerary", value: PageType.ITINERARY },
  { label: "Hotel", value: PageType.HOTEL },
  { label: "Day Plan", value: PageType.DAYPLAN },
  { label: "Flight", value: PageType.FLIGHT },
  { label: "Inclusion/Exclusion", value: PageType.INCLUSION_EXCLUSION },
  { label: "Terms & Conditions", value: PageType.TERMS },
];

// Fonts
export const titleFont = Playfair_Display({
  weight: "600",
  preload: true,
  display: "swap",
});
export const cinzelFont = Cinzel({
  weight: "700",
  preload: true,
  display: "swap",
});
export const cinzelDecorativeFont = Cinzel_Decorative({
  weight: "700",
  preload: true,
  display: "swap",
});
export const poppinsFont = Poppins({
  weight: "400",
  preload: true,
  display: "swap",
});

// Styles
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "fit-content",
    alignContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  page: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: BrandGreen,
  },
  section: {
    width: "100%",
    display: "flex",
    aspectRatio: aspectRatio,
  },
  sectionPage: {
    width: "100%",
    backgroundColor: "white",
    position: "relative",
    display: "flex",
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
    paddingTop: 8,
    paddingBottom: 8,
  },
  domain: {
    fontSize: 20,
    marginTop: 100,
  },
  modalButton: {
    width: "100%",
    padding: 10,
    backgroundColor: "#BE8724",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginTop: 20,
  },
});
