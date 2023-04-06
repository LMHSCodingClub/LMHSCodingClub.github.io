class Project extends HTMLLIElement {
    constructor() {
        super();
        const repoLink = this.getAttribute('repoLink') || `https://github.com/LMHSCodingClub/${this.getAttribute('name')}`;
        const content = `<a target="_blank" href="${repoLink}">
        <figure>
            <figcaption>
                ${this.getAttribute('name')}
            </figcaption>
            <img src="images/${this.getAttribute('logo')}" />
        </figure>
    </a>`
        this.innerHTML = content;
    }
}

customElements.define('project-item', Project, { extends: 'li' });