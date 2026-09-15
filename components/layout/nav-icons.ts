import {
  BadgeCheck,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  House,
  Layers,
  Mail,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import type { SectionId } from "@/content/ui";

export const NAV_ICONS: Record<SectionId, LucideIcon> = {
  home: House,
  about: UserRound,
  experience: BriefcaseBusiness,
  projects: FolderKanban,
  skills: Layers,
  education: GraduationCap,
  certifications: BadgeCheck,
  contact: Mail,
};
