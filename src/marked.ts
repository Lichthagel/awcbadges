import { marked } from "marked";

marked.use({
  breaks: true,
  renderer: {
    link: (href, title, text) =>
      `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`,
  },
  mangle: false,
  headerIds: false,
});

export default marked;
