import { VeryHappyIcon } from "@/_components/icons/VeryHappyIcon";
import { HappyIcon } from "@/_components/icons/HappyIcon";
import { NeutralIcon } from "@/_components/icons/NeutralIcon";

import { SadIcon } from "@/_components/icons/SadIcon";
import { VerySadIcon } from "@/_components/icons/VerySadIcon";

export const MOOD_ICONS = {
  2: VeryHappyIcon,
  1: HappyIcon,
  0: NeutralIcon,
  "-1": SadIcon,
  "-2": VerySadIcon,
};
