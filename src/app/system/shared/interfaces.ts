export interface Category {
  id?: number;
  name: string;
  slug: string;
  subCategories?: Array<SubCategory>;
}

export interface SubCategory {
  id?: number;
  name: string;
  parentCategory: Category;
  slug: string;
  seoInformation: SubCategorySeo;
}

export interface SubCategorySeo {
    id?: number;
    title: string;
    description: string;
    subCategory: SubCategory;
}

export interface NewsCategory {
  id?: number;
  name: string;
  slug: string;
  subCategories?: Array<NewsSubCategory>;
}

export interface NewsSubCategory {
  id?: number;
  name: string;
  slug: string;
}

export interface News {
  id?: number;
  title: string;
  shortDescription: string;
  content: string;
  createdAt: string;
  overview: boolean;
  main: boolean;
  likes: number;
  previewImage: string;
  category: NewsCategory;
  subCategory: NewsSubCategory;
  seoInformation: NewsSeo;
  product: Product;
}

export interface NewsSeo {
    id?: number;
    title: string;
    description: string;
    metaKeywords: string;
    news: News;
}

export interface Product {
    id?: number;
    name: string;
    category: SubCategory;
    price: number;
    shortDescription: string;
    characteristics: ProductCharacteristic[];
    discountStatus: boolean;
    discountPercentValue: number;
    previewPhoto: string;
    available: boolean;
    productColor: ProductColor;
    productStatus: ProductStatus;
    photos: ProductPhoto[];
    createdAt: string;
    seoInformation: ProductSeo;
}

export interface ProductPhoto {
    id?: number;
    title: string;
    image: string;
    product: Product;
}

export interface ProductCharacteristic {
    id?: number;
    name: string;
    childCharacteristics: ProductChildCharacter;
}

export interface ProductChildCharacter {
    id?: number;
    name: string;
    value: string;
    parentSection: ProductCharacteristic;
}

export interface ProductColor {
    id?: number;
    name: string;
}

export interface ProductStatus {
    id?: number;
    name: string;
    title: string;
}

export interface ProductPhoto {
    id?: number;
    title: string;
    image: string;
    product: Product;
}

export interface ProductSeo {
    id?: number;
    product: Product;
    title: string;
    description: string;
    imagesAlt: string;
}

export interface InfoPage {
    id?: number;
    title: string;
    content: string;
    slug: string;
}