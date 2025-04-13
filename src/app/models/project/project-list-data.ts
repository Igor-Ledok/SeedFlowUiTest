export interface ProjectList {
    id: number;
    title: string;
    shortDescription: string;
    mainPhotoUrl: string;
    collectionAmount: number;
    collectedAmount?: number;
    collectionDuration: number;
    favorite: boolean;
    category: string;
    categoryName: string;
    categoryPhotoUrl: string;
    teamsCount: number;
    rewardsCount: number;
  }
