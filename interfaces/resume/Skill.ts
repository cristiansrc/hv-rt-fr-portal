import { SkillSon } from "./SkillSon";

export interface Skill {
  id: number;
  name: string;
  nameEng: string;
  skillSons: SkillSon[];
}
