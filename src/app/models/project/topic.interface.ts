export interface TopicDto {
    id: number;
    name: string;
    categories: CategoryDto[];
  }
  
  export interface CategoryDto {
    id: number;
    name: string;
    photo?: string;
    topicId: number;
  }
  