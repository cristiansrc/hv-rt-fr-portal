import { Home } from "./Home";
import { BasicData } from "./BasicData";
import { Skill } from "./Skill";
import { Experience } from "./Experience";
import { Education } from "./Education";
import { AltchaChallenge } from "./AltchaChallenge";

export interface InfoPageResponse {
  home: Home;
  basicData: BasicData;
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
  altchaChallenge: AltchaChallenge;
}
