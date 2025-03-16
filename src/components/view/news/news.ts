import './news.css';

// Интерфейс для статьи
interface Article {
    urlToImage: string | null;
    author: string | null;
    source: {
        name: string;
    };
    publishedAt: string;
    title: string;
    description: string;
    url: string;
}

class News {
    // Метод для отрисовки новостей
    draw(data: Article[]): void {
        // Ограничиваем количество новостей до 10
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        // Создаем DocumentFragment для эффективного добавления элементов в DOM
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

        // Проверяем, найден ли шаблон
        if (!newsItemTemp) {
            console.error('Шаблон #newsItemTemp не найден');
            return;
        }

        // Проходим по каждой новости
        news.forEach((item, idx) => {
            // Клонируем шаблон
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            // Находим элементы внутри клонированного шаблона
            const newsItem = newsClone.querySelector('.news__item') as HTMLElement | null;
            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
            const metaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement | null;
            const metaDate = newsClone.querySelector('.news__meta-date') as HTMLElement | null;
            const descriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement | null;
            const descriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement | null;
            const descriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement | null;
            const readMoreLink = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement | null;

            // Добавляем класс 'alt' для каждого второго элемента
            if (newsItem && idx % 2) {
                newsItem.classList.add('alt');
            }

            // Устанавливаем фоновое изображение
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            // Устанавливаем автора
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }

            // Форматируем и устанавливаем дату
            if (metaDate) {
                metaDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }

            // Устанавливаем заголовок
            if (descriptionTitle) {
                descriptionTitle.textContent = item.title;
            }

            // Устанавливаем источник
            if (descriptionSource) {
                descriptionSource.textContent = item.source.name;
            }

            // Устанавливаем описание
            if (descriptionContent) {
                descriptionContent.textContent = item.description;
            }

            // Устанавливаем ссылку "Читать далее"
            if (readMoreLink) {
                readMoreLink.setAttribute('href', item.url);
            }

            // Добавляем клонированный элемент в фрагмент
            fragment.append(newsClone);
        });

        // Находим контейнер для новостей
        const newsContainer = document.querySelector('.news') as HTMLElement | null;
        if (newsContainer) {
            // Очищаем контейнер и добавляем фрагмент
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        } else {
            console.error('Контейнер для новостей не найден');
        }
    }
}

export default News;