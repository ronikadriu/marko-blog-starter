import { fetchAPI } from "../../api";
import { Article, Data, GlobalData } from "../../types/interfaces";

declare module "@marko/run" {
  interface Context {
    articlesPromise: Promise<Data<Article>[]>;
    globalData: Data<GlobalData>;
  }
}

export async function GET(context: MarkoRun.Context) {
  try {
    const globalResponse = await fetchAPI<Data<GlobalData>>("/global", {
      populate: "*",
    });

    context.articlesPromise = fetchAPI<Data<Article>[]>("/articles", {
      populate: ["author", "author.avatar", "category", "cover"],
    });

    context.globalData = globalResponse;
  } catch (error) {
    console.log(error);
    context.articlesPromise = Promise.reject(error);
  }
}
