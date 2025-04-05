import { ProjectData } from "./project-data.interface";
import { Reward } from "./reward.interface";
import { TeamMember } from "./team-member.interface";

export interface CompleteProjectData {
    project: ProjectData;
    teamMembers: TeamMember[];
    rewards: Reward[];
    projectPhoto: string[];
}
