import './sources.css';

class Sources {
    draw(data: { name: string; id: string }[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement | null;

        if (!sourceItemTemp) {
            console.error('Template element #sourceItemTemp not found');
            return;
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceNameElement = sourceClone.querySelector('.source__item-name');
            const sourceItemElement = sourceClone.querySelector('.source__item');

            if (sourceNameElement && sourceItemElement) {
                sourceNameElement.textContent = item.name;
                sourceItemElement.setAttribute('data-source-id', item.id);
                fragment.append(sourceClone);
            } else {
                console.error('Required elements not found in template');
            }
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        } else {
            console.error('Sources container not found');
        }
    }
}

export default Sources;