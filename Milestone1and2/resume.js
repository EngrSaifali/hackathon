"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResumeManager {
    data;
    constructor() {
        this.data = {
            startYear: 2020,
            lastUpdated: new Date()
        };
    }
    calculateYearsOfExperience() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.data.startYear;
    }
    formatData(date) {
        return date.toLocaleDateString();
    }
    updateFooter() {
        const footerElement = document.getElementById('dynamic-footer');
        if (footerElement) {
            footerElement.innerHTML = `${this.calculateYearsOfExperience()} Years of Experience | Last Updated: ${this.formatData(this.data.lastUpdated)}`;
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const resumeManager = new ResumeManager();
    resumeManager.updateFooter();
});
