// pages/upload.tsx
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import type { UploadProps } from "antd/es/upload";

const UploadPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [svgContent, setSvgContent] = useState<string | null>(null);

  const handleUpload: UploadProps["beforeUpload"] = (file) => {
    setLoading(true);
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      try {
        const base64String = fileReader.result?.toString().split(",")[1];
        if (!base64String) {
          message.error("Failed to read file");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/convert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64String }),
        });

        // Handle API errors properly
        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          message.error(errorData.error || "API Error occurred");
          return;
        }

        const result = await response.json();
        if (result.svg) {
          setSvgContent(result.svg);
          message.success("Image converted to SVG! Check below.");
        } else {
          message.error("Conversion failed.");
        }
      } catch (error) {
        console.error("Error processing image:", error);
        message.error("Failed to process image.");
      } finally {
        setLoading(false);
      }
    };

    fileReader.readAsDataURL(file);
    return false; // Prevent default upload behavior
  };

  return (
    <div style={{ padding: 20 }}>
      <Upload beforeUpload={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />} loading={loading}>
          Click to Upload & Convert
        </Button>
      </Upload>

      {/* Show SVG result */}
      {svgContent && (
        <div style={{ marginTop: 20 }}>
          <h3>Converted SVG:</h3>
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        </div>
      )}
    </div>
  );
};

export default UploadPage;

