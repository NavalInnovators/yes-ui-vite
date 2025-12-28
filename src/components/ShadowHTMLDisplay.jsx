import React, { useEffect, useRef } from "react";

const ShadowHTMLDisplay = ({ content }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const shadowRoot =
            containerRef.current.shadowRoot ||
            containerRef.current.attachShadow({ mode: "open" });

        // Inject KaTeX CSS
        const katexStyle = document.createElement("link");
        katexStyle.rel = "stylesheet";
        katexStyle.href = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
        // Fallback or better optimization: read the CSS content and inject as <style> if possible, 
        // or assume internet access. Since we can't easily read node_modules here without build steps, 
        // CDN or copying file to public is easiest. I'll use CDN for reliability in ShadowDOM.

        shadowRoot.innerHTML = ""; // Clear
        shadowRoot.appendChild(katexStyle);

        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = content;
        shadowRoot.appendChild(contentDiv);
    }, [content]);

    return (
        <div
            ref={containerRef}
        // style={{
        //   display: "block",
        // }}
        />
    );
};

export default ShadowHTMLDisplay;
