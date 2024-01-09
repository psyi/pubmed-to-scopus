// ==UserScript==
// @name        Scopus Link for PubMed
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

(function () {
  'use strict';

  const doi = document.querySelector('meta[name="citation_doi"]').getAttribute('content');
  const scopusUrl = 'https://www.scopus.com/search/form.uri?display=advanced&s=DOI(' + doi + ')&sl=27&sot=a&sdt=a&sort=plf-f';

  if (doi) {
    const fullTextLinksContainer = document.querySelector('aside.page-sidebar div.full-text-links');
    if (fullTextLinksContainer) {
      const fullTextLinksList = fullTextLinksContainer.querySelector('div.full-text-links-list');

      const linkItem = document.createElement('a');
      linkItem.setAttribute('class', 'link-item');
      linkItem.setAttribute('target', '_blank');
      linkItem.setAttribute('data-ga-category', 'full_text');
      linkItem.setAttribute('href', scopusUrl);

      const logoImg = document.createElement('img');
      logoImg.setAttribute('class', 'full-text provider logo');
      logoImg.setAttribute('src', 'https://github.com/psyi/pubmed-to-scopus/blob/c5c0f20d7aaf190e0daa767b1b3d0f739b7ebddb/image/scopus_logo.png'); // Replace with Scopus logo URL

      const spanText = document.createElement('span');
      spanText.setAttribute('class', 'text');
      spanText.textContent = 'Scopus Full Text';

      linkItem.appendChild(logoImg);
      linkItem.appendChild(spanText);

      if (fullTextLinksList) {
        fullTextLinksList.insertBefore(linkItem, fullTextLinksList.firstChild);
      } else {
        const newFullTextLinksList = document.createElement('div');
        newFullTextLinksList.setAttribute('class', 'full-text-links-list');
        newFullTextLinksList.appendChild(linkItem);

        const fullViewDiv = fullTextLinksContainer.querySelector('div.full-view');
        if (fullViewDiv) {
          fullViewDiv.appendChild(newFullTextLinksList);
        }
      }
    }
  }
})();
