export interface ServicePhone {
  name: string;
  tel: string;
  display: string;
}

export interface SocialMediaLink {
  name: string;
  url: string;
}

export const servicePhones: readonly ServicePhone[] = [
  {
    name: "Placeholder Name1",
    tel: "tel:+15555555555",
    display: "(555) 555-5555",
  },
  {
    name: "Placeholder Name2",
    tel: "tel:+15555555555",
    display: "(555) 555-5555",
  },
] as const;

/** Main office and billing inquiries (distinct from field service lines above). */
export const officeBillingPhone: ServicePhone = {
  name: "Placeholder Name3",
  tel: "tel:+15555555555",
  display: "(555) 555-5555",
};

export const companyEmail = "placeholder@email.com" as const;

/**
 * “Leave a review” opens this URL (Google’s review form for your Business Profile).
 *
 * Get it: [Google Business Profile](https://business.google.com/) → your location →
 * **Ask for reviews** / **Get more reviews** → copy the share link (often `g.page`, `maps.app.goo.gl`, or similar).
 *
 * Or build: `https://search.google.com/local/writereview?placeid=` + your
 * [Place ID](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder).
 *
 * Until you paste your share link, the reviews page falls back to a Maps search so the button still helps customers find you.
 */
export const googleReviewUrl =
  "https://www.google.com/maps/search/";

export const socialMedia: readonly SocialMediaLink[] = [
  {
    name: "Facebook",
    url: "",
  },
] as const;
