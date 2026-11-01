import Image from "next/image";
import type { Skill } from "@/data/skills";
import { Icon } from "@/components/ui/Icon";
import { Chip } from "@/components/ui/Tile";

export function SkillChip({ skill }: { skill: Skill }) {
  return (
    <Chip>
      {skill.logo ? (
        <Image
          src={`/icons/tech/${skill.logo}.svg`}
          alt=""
          width={16}
          height={16}
          // The Linux logo is plain black, so flip it on dark backgrounds.
          className={skill.logo === "linux" ? "dark:invert" : ""}
        />
      ) : (
        skill.icon && <Icon name={skill.icon} className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      )}
      {skill.name}
    </Chip>
  );
}
