import { ImageUrl } from "./ImageUrl";
import { Label } from "./Label";

export interface Home {
  id: number;
  greeting: string;
  greetingEng: string;
  imageUrl: ImageUrl;
  buttonWorkLabel: string;
  buttonWorkLabelEng: string;
  buttonContactLabel: string;
  buttonContactLabelEng: string;
  labels: Label[];
}
