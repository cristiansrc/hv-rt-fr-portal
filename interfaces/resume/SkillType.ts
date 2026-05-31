import { Skill } from "./Skill";

export interface SkillType {
  id: number;
  name: string;
  nameEng: string;
  skills: Skill[];
}
