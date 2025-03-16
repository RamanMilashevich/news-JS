import { Article } from 'components/view/news/news';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import Sources from 'components/view/sources/sources';

// Define the types directly in this file


interface NewsData {
    articles: Article[];
}

interface SourcesData {
    sources: Sources[];
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
            this.controller.getNews(e as MouseEvent, (data: unknown) => {
                const parsedData: NewsData = data as NewsData; // Parse JSON string
                this.view.drawNews(parsedData); // Pass parsed object
            })
        );

        this.controller.getSources((data: unknown) => {
            const parsedData: SourcesData = data as SourcesData; // Parse JSON string
            this.view.drawSources(parsedData); // Pass parsed object
        });
    }
}

export default App;