import React from "react";

interface SvgRendererProps {
    svgContent: string | null;
}

const SvgRenderer: React.FC<SvgRendererProps> = ({ svgContent }) => {
    if (!svgContent) return null;

    return (
        <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    );
};

export default SvgRenderer;

