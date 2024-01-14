// ==UserScript==
// @name        pubmed-to-scopus-doi
// @namespace   https://github.com/psyi/pubmed-to-scopus
// @match       *://pubmed.ncbi.nlm.nih.gov/*/
// @author      psyi
// @license     SCU
// @version     1.0
// @description A userscript to add a link redirecting to Scopus on PubMed article pages.
// @downloadURL https://github.com/psyi/pubmed-to-scopus/script/src/pubmed-to-scopus.js
// @grant       none
// @run-at      document-end
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to extract information about the article
    function extractArticleInfo() {
        // Implement the logic to extract necessary information from the PubMed page
        // Example: Extract title, authors, DOI, etc.
        const title = document.title;
        const doi = $("meta[name=citation_doi]").attr("content");
        return { title, doi };
    }

    // Function to create a link and redirect to Scopus
    function createScopusLink(articleInfo) {
        // Check if DOI is available
        if (!articleInfo.doi) {
            console.error('DOI not available.');
            return;
        }

        // Encode the DOI for safe inclusion in the URL
        const encodedDOI = encodeURIComponent(articleInfo.doi).replace(/%2F/g, '/');

        // Construct the Scopus search URL with the encoded DOI as the search term
        const scopusBaseUrl = 'https://www.scopus.com/results/results.uri';
        const queryParams = new URLSearchParams({
            'sort': 'plf-f',
            'src': 's',
            'sot': 'b',
            'sdt': 'b',
            'sl': '61',
            's': `DOI(${encodedDOI})`,
            // Add other parameters as needed
        });

        const scopusUrl = `${scopusBaseUrl}?${queryParams.toString()}`;

        // Open the Scopus link in a new tab
        window.open(scopusUrl, '_blank');
    }

    // Main execution
    const articleInfo = extractArticleInfo();
    if (articleInfo) {
        // Create an icon on the PubMed page
        const icon = document.createElement('img');
        icon.src = 'https://raw.githubusercontent.com/psyi/pubmed-to-scopus/master/image/scopus_logo.png';
        icon.style.width = '50%'; // Set the desired width as a percentage
        icon.style.height = '50%'; // Set the desired height as a percentage
        icon.style.cursor = 'pointer';
        icon.title = 'Scopus Link';
        icon.addEventListener('click', () => createScopusLink(articleInfo));

        // Add the icon below "Full text" (modify the selector accordingly)
        const fullTextElement = document.querySelector('h3.title');
        if (fullTextElement) {
            fullTextElement.parentNode.appendChild(icon);
        }
    }
})();

