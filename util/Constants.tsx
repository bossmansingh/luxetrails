import { StyleSheet } from "@react-pdf/renderer";
import {
  Cinzel,
  Cinzel_Decorative,
  Playfair_Display,
  Poppins,
} from "next/font/google";

const SupportEmail = "ops@theluxetrails.com";

export const aspectRatio = 0.7070707071;
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
export const DefaultAirlinePolicyTitle = "Airline Cancellation Policy";
export const DefaultAirlinePolicyText = `• Cancellation will be as per the airlines cancellation policy. If the flights are non-refundable, you will not get any refund for flights in the event of cancellation.
• Refund will be done within 30 Workings days post deduction of cancellation charges by airlines (as per airline cancellation policy) and service charge of 5% on total value for cancellation and 2.5% for amendments by Tripfactory.
• For infant bookings Date of Birth proof has to be presented at the time of checking-in.
• Standard airline policy shall be applicable to all changes.
• Please note one-way cancellations are not allowed for any flight.
• Please note name changes are not permitted for any flight.
• Due to the impact of COVID-19 worldwide, refunds will be processed in accordance with the latest airline policies. Please note that at the airline's discretion, refunds may be made in the form of airline vouchers. The final decision regarding the refund method will be made by the airline. Some airlines may charge processing fees for flight changes or cancellations made due to flight schedule changes. Actual fees charged will depend on the final decision by the airline.`;
export const DefaultHotelPolicyTitle = "Hotel Cancellation Policy";
export const DefaultHotelPolicyText = `• Hotel cancellation will be as per the hotel cancellation policy. If the hotels are non-refundable, you will not get any refund for hotels in the event of cancellation.
• Any transfers or activities included in the trip will be non-refundable if cancelled within 3 days of the travel start date, unless otherwise specified during the quotation stage in the "Points to Note" section. Some services handle different cancellation policies and they must be respected accordingly.
• Entrance tickets of any kind are non-refundable from the moment of booking, unless specified otherwise.
• There will be also a service charge of 5% on total value in case of cancellation of Land and 5% on total value for any amendments.
• Hotel room allocation will be subject to availability and will be on a first come first serve basis.
• Any transfers or activities included in the trip will be non-refundable if cancelled within 3 days of the travel start date.`;
export const DefaultAmendmentTitle = "Amendment of Booking by Guest";
export const DefaultAmendmentText = `If you wish to amend or change your booking, write to us at <strong>${SupportEmail}</strong>. Such requests for change or amendment will be accepted subject to availability. Please note that the amended or changed booking will be regarded as a new booking. In case the amendment is carried out within the cancellation period, then a cancellation charge shall apply as if a cancellation was made on the date the request for amendment or change is made. Please note the cancellation charges will be as per the airline and hotel policies.`;

export enum PageType {
  COVER = "cover",
  HIGHLIGHTS = "highlights",
  HOTEL = "hotel",
  ITINERARY = "itinerary",
  DAYPLAN = "dayplan",
  INCLUSION_EXCLUSION = "inclusion_exclusion",
  SCOPE_OF_SERVICE = "scope_of_service",
  IMPORTANT_NOTES = "important_notes",
  TERMS = "terms",
  FLIGHT = "flight",
}

export type SingleImageAndTextModel = {
  pageTitle: string;
  imageUrl: string;
  contentText: string;
};

export type CoverPageModel = {
  pageTitle: string;
  ppCost: string;
  duration: number;
};

export type ItineraryModel = {
  pageTitle: string;
  contentTexts: string[];
};

export type TermsConditionModel = {
  pageTitle: string;
  contentText: string;
};

type HotelImage = {
  firstUrl: string;
  secondUrl: string;
  thirdUrl?: string;
  fourthUrl?: string;
};

export type HotelModel = {
  images: HotelImage;
  title: string;
  subtitle: string;
};

export type ScopeServiceModel = {
  pageTitle: string;
  contentText: string;
};

export type ImportantNotesModel = {
  pageTitle: string;
  airlinePolicyTitle: string;
  airlinePolicyText: string;
  hotelPolicyTitle: string;
  hotelPolicyText: string;
  amendmentPolicyTitle: string;
  amendmentPolicyText: string;
};

export type InclusionExclusionModel = {
  inclusion: string;
  exclusion: string;
};

export type PageContentModel = {
  coverPage?: CoverPageModel;
  highlight?: SingleImageAndTextModel;
  dayPlan?: SingleImageAndTextModel[];
  itinerary?: ItineraryModel;
  hotels?: HotelModel[];
  inclusionExclusion?: InclusionExclusionModel;
  scopeOfService?: ScopeServiceModel;
  importantNotes?: ImportantNotesModel;
  termsCondition?: TermsConditionModel;
  flights?: string[];
};

export const highlightItem = {
  label: "Highlights",
  value: PageType.HIGHLIGHTS,
};

export const hotelItem = {
  label: "Hotels",
  value: PageType.HOTEL,
};

export const itineraryItem = {
  label: "Itinerary",
  value: PageType.ITINERARY,
};

export const scopeOfServiceItem = {
  label: "Our Scope of Service",
  value: PageType.SCOPE_OF_SERVICE,
};

export const importNotesItem = {
  label: "Important Notes",
  value: PageType.IMPORTANT_NOTES,
};

export const termsItem = {
  label: "Terms & Conditions",
  value: PageType.TERMS,
};

export const flightsItem = {
  label: "Flight",
  value: PageType.FLIGHT,
};

export const pageTypes = [
  { label: "Cover", value: PageType.COVER },
  highlightItem,
  hotelItem,
  itineraryItem,
  { label: "Day Plan", value: PageType.DAYPLAN },
  { label: "Inclusion/Exclusion", value: PageType.INCLUSION_EXCLUSION },
  scopeOfServiceItem,
  importNotesItem,
  { label: "Terms & Conditions", value: PageType.TERMS },
  flightsItem,
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
    width: CanvasWidth,
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
