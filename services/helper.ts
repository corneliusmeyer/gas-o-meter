export function getFirstPartofURL(url: string | null) : string {
    if(url) {
        const urls = url.match(/^\/[^\/]+/);
        if(urls) return urls[0];
    }
    return "/";
}