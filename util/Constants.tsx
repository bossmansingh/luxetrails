import { StyleSheet } from "@react-pdf/renderer";
import {
  Cinzel,
  Cinzel_Decorative,
  Playfair_Display,
  Poppins,
} from "next/font/google";

const aspectRatio = 0.7070707071;

export const CanvasWidth = 793.5;
export const CanvasHeight = 1122;
export const Domain = "www.theluxetrails.com";
export const BrandGreen = "#043C2B";
export const DefaultScopeText = `We are holiday organizers only. We inspect and select the services to be provided to you. However, we do not own, operate or control any airline, shipping company, coach or coach company, hotel, transport, restaurant, kitchen caravan or any other facility or provider etc. that is engaged to provide you services during the course of your tour. Therefore, please carefully note that:
	• You will need to adhere to the conditions, rules and regulations of each service provider. For instance, you will need to check the baggage rules of the airline, you will need to check the hotel rules to check what the mealtimes are, at which you should make yourself available. The company is not responsible / liable for the consequences if you breach such rules and regulations.
	• If you cause any injury or damage affecting the service provider, then you may be liable to the service provider and if the service provider recovers any monies from us for such injury or damages, we shall separately charge you for the same.
	• We cannot be held responsible / liable for any delay, deficiency, injury, death, loss or damage etc. occasioned due to act or default of such service providers, their employees or agents.`;
export const DefaultTermsCondition = `• This package is for review only; rates and availability may change.
• Prices are not guaranteed until flight details are shared or 50% payment is made.
• Hotels and activities are not held without confirmation.
• We work with trusted partners, but do not hold inventory.
• Final itinerary depends on real-time availability at the time of booking.
• Post-confirmation changes may affect cost or availability.`;

export enum PageType {
  COVER = "cover",
  HIGHLIGHTS = "highlights",
  HOTEL = "hotel",
  ITINERARY = "itinerary",
  DAYPLAN = "dayplan",
  INCLUSION_EXCLUSION = "inclusion_exclusion",
  SCOPE_OF_SERVICE = "scope_of_service",
  TERMS = "terms",
  FLIGHT = "flight",
}

export type SingleImageAndTextContent = {
  pageTitle: string;
  imageUrl: string;
  contentText: string;
};

export type CoverPageContent = {
  pageTitle: string;
  ppCost: string;
  duration: number;
};

export type ItineraryContent = {
  pageTitle: string;
  contentTexts: string[];
};

export type TermsConditionContent = {
  contentText: string;
};

type HotelImage = {
  firstUrl: string;
  secondUrl: string;
  thirdUrl?: string;
  fourthUrl?: string;
};

export type HotelContent = {
  images: HotelImage;
  title: string;
  subtitle: string;
};

export type ScopeServiceContent = {
  pageTitle: string;
  contentText: string;
};

export type InclusionExclusionContent = {
  inclusion: string;
  exclusion: string;
};

export type PageContent = {
  coverPage?: CoverPageContent;
  highlight?: SingleImageAndTextContent;
  dayPlan?: SingleImageAndTextContent[];
  itinerary?: ItineraryContent;
  hotels?: HotelContent[];
  inclusionExclusion?: InclusionExclusionContent;
  scopeOfService?: ScopeServiceContent;
  termsCondition?: TermsConditionContent;
};

export const pageTypes = [
  { label: "Cover", value: PageType.COVER },
  { label: "Highlights", value: PageType.HIGHLIGHTS },
  { label: "Hotel", value: PageType.HOTEL },
  { label: "Itinerary", value: PageType.ITINERARY },
  { label: "Day Plan", value: PageType.DAYPLAN },
  { label: "Inclusion/Exclusion", value: PageType.INCLUSION_EXCLUSION },
  { label: "Scope of Service", value: PageType.SCOPE_OF_SERVICE },
  { label: "Terms & Conditions", value: PageType.TERMS },
  { label: "Flight", value: PageType.FLIGHT },
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
    display: "flex",
    flexDirection: "column",
    color: "black",
  },
  page: {
    width: "100%",
    maxWidth: CanvasWidth,
    flexDirection: "row",
    alignSelf: "center",
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
  sectionPageContent: {
    width: "100%",
    height: "100%",
    paddingLeft: 80,
    paddingRight: 80,
    paddingTop: 40,
    paddingBottom: 40,
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
    height: "auto",
    padding: 16,
    display: "flex",
    backgroundColor: BrandGreen,
    aspectRatio: aspectRatio,
  },
  coverPageContent: {
    width: "100%",
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: "white",
    display: "flex",
    color: BrandGreen,
    flexDirection: "column",
    alignItems: "center",
    aspectRatio: aspectRatio,
  },
  coverTitle: {
    fontSize: 69,
  },
  headerTitle: {
    fontSize: 34,
    color: BrandGreen,
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
