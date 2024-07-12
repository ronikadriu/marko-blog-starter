export interface Article {
  title: string;
  description: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  author: DataAttributes<Author>;
  category: DataAttributes<Category>;
  cover: DataAttributes<Image>;
  blocks: Block[];
}

export interface Author {
  name: string;
  email: string;
  avatar: DataAttributes<Image>;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  articles: {
    data: Data<Article>[];
  };
}

export interface Image {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  hash: string;
  url: string;
}
export interface Block {
  id: number;
  title: string;
  alternativeText: string;
  __component: string;
  body: string;
  file: DataAttributes<Image>;
  files: {
    data: Data<Image>[];
  };
}

export interface DataAttributes<T> {
  data: Data<T>;
}

export interface Data<T> {
  id: number;
  attributes: T;
}

export interface GlobalData {
  siteName: string;
  siteDescription: string;
  defaultSeo: {
    id: number;
    metaTitle: string;
    metaDescription: string;
  };
  favicon: DataAttributes<Image>;
}
