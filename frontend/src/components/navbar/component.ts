import { fetchAPI } from "../../api/index";
import { Category, Data } from "../../types/interfaces";

export interface Input { }

interface State { 
    categories: Data<Category>[];
}

export default class extends Marko.Component<Input, State> {
    onCreate() {
        this.state = {
            categories: []
        }
    }

    onMount() {
        fetchAPI<Data<Category>[]>("/categories", {
            fields: [
                "name",
                "slug"
            ]
        }).then(data => {
            this.state.categories = data;
        });
    }
}