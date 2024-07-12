import { fetchAPI } from "../../../api";
import { Category, Data, GlobalData } from "../../../types/interfaces";

declare module "@marko/run" {
  interface Context {
    categoryWithArticles: Promise<Array<Data<Category>>>;
    globalData: Data<GlobalData>;
  }
}

export async function GET(context: MarkoRun.Context) {
  try {
    const globalResponse = await fetchAPI<Data<GlobalData>>("/global", {
      populate: "*",
    });

    context.categoryWithArticles = fetchAPI<Array<Data<Category>>>("/categories", {
      filters: { slug: context.params.slug },
      populate: {
        articles: {
          populate: {
            category: {
              populate: ["name"],
            },
            author: {
              populate: "*",
            },
            cover: {
              populate: ["url"],
            },
          },
        },
      },
    });
    context.globalData = globalResponse;
  } catch (error) {
    console.log(error);
    context.categoryWithArticles = Promise.reject(error);
  }
}
