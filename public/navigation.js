const navigationPlaceholder = document.querySelector('[data-navigation]');

const response = await fetch(new URL('./navigation.html', import.meta.url));
if (!response.ok) {
    throw new Error(`Failed to load navigation: ${response.status}`);
}

const navigationDocument = new DOMParser().parseFromString(
    await response.text(),
    'text/html'
);
const navigationComponent = navigationDocument.querySelector(
    '[data-navigation-component]'
);

if (!navigationComponent) {
    throw new Error('Navigation component root was not found.');
}

navigationPlaceholder.replaceWith(
    document.importNode(navigationComponent, true)
);
