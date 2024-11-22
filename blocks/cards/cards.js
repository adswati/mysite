import { createOptimizedPicture, fetchPlaceholders } from '../../scripts/aem.js';


export default async function decorate(block) {
  // fetch placeholders
  const placeholders = await fetchPlaceholders();
  const { click } = placeholders;

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else { div.className = 'cards-card-body';
      const paragraphs = div.querySelectorAll('p');
      if (paragraphs.length > 1) {
        const secondParagraph = paragraphs[1];
        // Create a button below the second paragraph
        const clickformorebtn = document.createElement('a');
        clickformorebtn.innerText = click;
        clickformorebtn.classList.add('button');
        secondParagraph.insertAdjacentElement('afterend', clickformorebtn);
        // Target the existing anchor tag in the HTML
        const placeholderLink = div.querySelector('.button');
        placeholderLink.setAttribute('href', '#');

      }
    }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
