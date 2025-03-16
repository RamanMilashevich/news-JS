import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document?.querySelector('.sources')?.addEventListener('click', (e) =>
            this.controller.getNews(e as MouseEvent, (data: string) => this.view.drawNews(data))
        );
        this.controller.getSources((data: string) => this.view.drawSources(data));
    }
}

export default App;