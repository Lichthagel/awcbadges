import { marked } from "marked";

marked.use({
  breaks: true,
  renderer: {
    paragraph: (text) => `<p class="my-3">${text}</p>`,
    link: (href, title, text) =>
      `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">${text}</a>`,
  },
  mangle: false,
  headerIds: false,
});

export default marked;
