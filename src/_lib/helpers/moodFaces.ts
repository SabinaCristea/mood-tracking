import { StaticImageData } from "next/image";
import VeryHappyface from "/public/assets/images/icon-very-happy-color.svg";
import Happyface from "/public/assets/images/icon-happy-color.svg";
import Neutralface from "/public/assets/images/icon-neutral-color.svg";
import Sadface from "/public/assets/images/icon-sad-color.svg";
import VerySadface from "/public/assets/images/icon-very-sad-color.svg";

export const MOOD_ICONS: Record<number, StaticImageData> = {
  2: VeryHappyface,
  1: Happyface,
  0: Neutralface,
  "-1": Sadface,
  "-2": VerySadface,
};
