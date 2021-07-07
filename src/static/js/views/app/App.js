export default class {
    constructor(params) {
        this.params = params;
        this.pageTitle = '';
    }

    setTitle(title) {
        document.title = title;
        this.pageTitle = title;
    }
    getHeader() {
        return ` 
            <div class="spa-shell-head-logo"></div>
            <div class="spa-shell-title">
             <h1>${this.pageTitle}</h1>
           </div>
        `;
    }

     getHtml() {
        return `
        `;
    }
}