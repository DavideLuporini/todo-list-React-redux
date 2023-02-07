export interface FiltersState {
  visibility: Visibility;
  searchText: string;
  categories: string[];
}

export enum Visibility {
  ALL,
  DONE,
  NOT_DONE,
}
export enum Category {
  NOFILTER = "",
  NOCATEGORY = "nocategory",
  CASA = "casa",
  FAMIGLIA = "famiglia",
  LAVORO = "lavoro",
}

export interface Categories {
  id: string;
  categoryName: string;
  color: string;
}
