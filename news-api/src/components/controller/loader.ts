// loader.ts
type Options = Record<string, string>;

class Loader {
    constructor(private baseLink: string, private options: Options) {}

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: Options },
        callback: (data: unknown) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.error(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw new Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: Options, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        const keys = Object.keys(urlOptions);

        if (keys.length === 0) {
            return `${this.baseLink}${endpoint}`;
        }

        const queryString = keys
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(urlOptions[key])}`)
            .join('&');

        return `${this.baseLink}/${endpoint}?${queryString}`;
    }

    private load(
        method: string,
        endpoint: string,
        callback: (data: unknown) => void,
        options: Options = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error('Fetch error:', err));
    }
}

export default Loader;