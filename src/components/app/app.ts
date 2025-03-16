import AppController from '../controller/controller';
import { AppView } from '../view/appView';

// Define the types directly in this file
interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
}

interface Source {
    id: string;
    name: string;
}

interface NewsData {
    articles: Article[];
}

interface SourcesData {
    sources: Source[];
}

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document?.querySelector('.sources')?.addEventListener('click', (e) =>
            this.controller.getNews(e as MouseEvent, (data: string) => {
                const parsedData: NewsData = JSON.parse(data); // Parse JSON string
                this.view.drawNews(parsedData); // Pass parsed object
            })
        );

        this.controller.getSources((data: string) => {
            const parsedData: SourcesData = JSON.parse(data); // Parse JSON string
            this.view.drawSources(parsedData); // Pass parsed object
        });
    }
}

export default App;