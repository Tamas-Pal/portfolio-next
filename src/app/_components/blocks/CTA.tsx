import { Cta } from "@/types/Cta";
import PersonalLinks from "../generic/content/links/PersonalLinks";

export const CTA = ({ cta }: { cta: Cta }) => {
    return (
      <div>
        <p>{cta.Title}</p>
        <p>{cta.Description}</p>
        <PersonalLinks contacts={cta.contacts.data} />
      </div>
    );
  };