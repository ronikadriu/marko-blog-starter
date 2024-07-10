import { fetchAPI } from "../../api";

declare module "@marko/run" {
    interface Context {
      articlesPromise: Promise<any>;
    }
}

export function GET(context: MarkoRun.Context) {
    try {
        context.articlesPromise = fetchAPI("/articles", {
            populate: [
                "author",
                "author.avatar",
                "category",
                "cover"
            ]
        });
    } catch (error) {
        console.log(error);
        context.articlesPromise = Promise.reject(error);
    }
}