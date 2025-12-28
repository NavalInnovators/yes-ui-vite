import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

// Helpers
async function checkMermaidSyntax(code) {
    try {
        await mermaid.parse(code);
        return { valid: true, errors: [] };
    } catch (err) {
        return {
            valid: false,
            errors: [err.message]
        };
    }
}

function autoFixMermaid(code) {
    let fixed = code;

    // 1. Fix style on same line as node
    fixed = fixed.replace(
        /^(\s*\w+\[.*?\])\s+style\s+(\w+.*)$/gm,
        (_, node, style) => `${node}\nstyle ${style}`
    );

    // 2. Fix invalid arrows
    fixed = fixed.replace(/==>/g, '-->');
    fixed = fixed.replace(/--->/g, '-->');

    // 3. Add default diagram type if missing
    if (!/^(flowchart|graph|sequenceDiagram)/.test(fixed.trim())) {
        fixed = `flowchart LR\n${fixed}`;
    }

    return fixed;
}

const MermaidRenderer = ({ code }) => {
    const containerRef = useRef(null);
    const [finalCode, setFinalCode] = useState(null);

    useEffect(() => {
        let active = true;
        const validateAndFix = async () => {
            // 1. Check syntax
            const result = await checkMermaidSyntax(code);
            if (result.valid) {
                if (active) setFinalCode(code);
                return;
            }

            // 2. Try auto-fix
            const fixed = autoFixMermaid(code);
            const fixedResult = await checkMermaidSyntax(fixed);

            if (active) {
                if (fixedResult.valid) {
                    setFinalCode(fixed);
                } else {
                    console.error("Mermaid invalid after fix:", fixedResult.errors);
                    setFinalCode(null);
                }
            }
        };

        validateAndFix();
        return () => { active = false; };
    }, [code]);

    useEffect(() => {
        if (finalCode && containerRef.current) {
            containerRef.current.removeAttribute("data-processed");
            containerRef.current.innerHTML = finalCode;

            const timer = setTimeout(() => {
                mermaid.run({
                    nodes: [containerRef.current],
                }).catch(err => {
                    if (!err?.message?.includes('translate(undefined, NaN)')) {
                        console.error("Mermaid run error:", err);
                    }
                });
            }, 50);

            return () => clearTimeout(timer);
        }
    }, [finalCode]);

    if (!finalCode) return null;

    return (
        <div
            className="mermaid"
            ref={containerRef}
            data-mermaid-content={finalCode}
        />
    );
};

export default MermaidRenderer;
