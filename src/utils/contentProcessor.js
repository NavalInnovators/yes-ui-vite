import katex from "katex";
import "katex/dist/katex.min.css";

export const decodeMermaidCode = (text) => {
    const cleanup = text
        .replace(/<br\s*\/?>/g, "\n")
        .replace(/<\/?p\s*\/?>/g, "")
        .replace(/<code class=[\s\S]*?>/g, "")
        .replace(/<\/code\s*\/?>/g, "")
        .replace(/<pre[^>]*>/g, "") // Remove <pre> tag
        .replace(/<\/pre>/g, "") // Remove </pre> tag
        .replace(/<code[^>]*>/g, "") // Remove <code> tag
        .replace(/<\/code>/g, ""); // Remove </code> tag

    if (typeof document !== 'undefined') {
        const txt = document.createElement("textarea");
        txt.innerHTML = cleanup;
        return txt.value;
    }
    return cleanup
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");
};

export const processTextWithMath = (text) => {
    // Replace $$...$$ and $...$ with KaTeX HTML
    return text.replace(/(\$\$[\s\S]*?\$\$)|(\$[\s\S]*?\$)/g, (match, blockMath, inlineMath) => {
        try {
            if (blockMath) {
                const clean = blockMath.replace(/\$\$/g, '').trim();
                const decoded = decodeMermaidCode(clean); // reuse decode to unescape entities in math
                return katex.renderToString(decoded, { displayMode: true, throwOnError: false });
            } else if (inlineMath) {
                const clean = inlineMath.replace(/\$/g, '').trim();
                const decoded = decodeMermaidCode(clean);
                return katex.renderToString(decoded, { displayMode: false, throwOnError: false });
            }
        } catch (e) {
            console.error("KaTeX error:", e);
            return match;
        }
        return match;
    });
};
