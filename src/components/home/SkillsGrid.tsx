import { skillGroups } from "@/data/skills";
import { SectionHeading, Tile, TileLabel } from "@/components/ui/Tile";
import { SkillChip } from "@/components/ui/SkillChip";

const SkillsGrid = () => {
  return (
    <section>
      <SectionHeading label="Toolbox" title="Skills" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, index) => (
          <Tile
            key={group.title}
            // The last group closes the grid at full width.
            className={index === skillGroups.length - 1 ? "sm:col-span-2 lg:col-span-4" : "sm:col-span-2"}
          >
            <TileLabel icon={group.icon}>{group.title}</TileLabel>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <SkillChip key={skill.name} skill={skill} />
              ))}
            </div>
          </Tile>
        ))}
      </div>
    </section>
  );
};

export default SkillsGrid;
