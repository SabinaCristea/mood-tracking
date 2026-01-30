import { VeryHappyIcon } from "@/src/_components/icons/VeryHappyIcon";
import { HappyIcon } from "@/src/_components/icons/HappyIcon";
import { NeutralIcon } from "@/src/_components/icons/NeutralIcon";
import { SadIcon } from "@/src/_components/icons/SadIcon";
import { VerySadIcon } from "@/src/_components/icons/VerySadIcon";

import { VeryHappyIconWhite } from "@/src/_components/icons/VeryHappyIconWhite";
import { HappyIconWhite } from "@/src/_components/icons/HappyIconWhite";
import { NeutralIconWhite } from "@/src/_components/icons/NeutralIconWhite";
import { SadIconWhite } from "@/src/_components/icons/SadIconWhite";
import { VerySadIconWhite } from "@/src/_components/icons/VerySadIconWhite";

export const MOOD_ICONS = {
  2: VeryHappyIcon,
  1: HappyIcon,
  0: NeutralIcon,
  "-1": SadIcon,
  "-2": VerySadIcon,
};

export const MOOD_ICONS_WHITE = {
  2: VeryHappyIconWhite,
  1: HappyIconWhite,
  0: NeutralIconWhite,
  "-1": SadIconWhite,
  "-2": VerySadIconWhite,
};
