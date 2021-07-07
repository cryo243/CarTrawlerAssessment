let routes = [];

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};
const bindAllLinks = () =>{
    const list = document.querySelectorAll('li[data-link]');
    list.forEach(node => {
        node.addEventListener('click', e=>{
            e.preventDefault();
            navigateTo(node.getAttribute('data-link'));
        })
    })
}
const router = async () => {
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#container").innerHTML = await view.getHtml();
    bindAllLinks();
};

export const initRouter =  (appRoutes)=>{
    routes = appRoutes;
    window.addEventListener("popstate", router);
    document.addEventListener("DOMContentLoaded", () => {
        router();
    });

}
