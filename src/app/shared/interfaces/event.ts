export interface Event {
    id: number;
    title: string;
    content: string;
    date: string;
    isFree: boolean;
    location: string;
    category: {
      id: number;
      name: string;
    };
    user: {
      id: number;
      firstname: string;
      lastname: string;
      phone: string;
      email: string;
      isOrganizer: boolean;
    };
    userEvents: { id: number }[];
    images:string[]
  }
  

  export interface PaginatedResult {
    data: Event[];
    total: number;
    page: number;
    limit: number;
  }
  