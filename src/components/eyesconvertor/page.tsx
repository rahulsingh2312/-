import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

interface EyePosition {
  height: number;
  width: number;
  x: number;
  y: number;
}

const EmojiEyeReplacer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [faceDetected, setFaceDetected] = useState<boolean>(false);
  const [eyePositions, setEyePositions] = useState<{ left: EyePosition; right: EyePosition } | null>(null);
  
  // Customization States
  const [emojiType, setEmojiType] = useState<string>('💹');
  const [eyeShape, setEyeShape] = useState<'circle' | 'oval' | 'square'>('circle');
  const [backgroundMode, setBackgroundMode] = useState<'none' | 'solid' | 'gradient'>('gradient');
  const [backgroundColor, setBackgroundColor] = useState<string>('#EDDCE4');
  const [sizeMultiplier, setSizeMultiplier] = useState<number>(1.2);
  const [glitterEffect, setGlitterEffect] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>('transparent');
  const [borderWidth, setBorderWidth] = useState<number>(0);

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.load('/models/tiny_face_detector_model-weights_manifest.json');
        await faceapi.nets.faceLandmark68Net.load('/models/face_landmark_68_model-weights_manifest.json');
        setModelsLoaded(true);
      } catch (error) {
        console.error('Failed to load models:', error);
      }
    };

    loadModels();
  }, []);

  const detectEyes = async () => {
    if (!modelsLoaded || !imageRef.current) {
      console.warn("Models not loaded or no image reference found");
      return;
    }

    try {
      const detection = await faceapi
        .detectSingleFace(imageRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (detection) {
        const landmarks = detection.landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        const getBoundingBox = (points) => ({
          x: Math.min(...points.map((pt) => pt.x)),
          y: Math.min(...points.map((pt) => pt.y)),
          width: Math.max(...points.map((pt) => pt.x)) - Math.min(...points.map((pt) => pt.x)),
          height: Math.max(...points.map((pt) => pt.y)) - Math.min(...points.map((pt) => pt.y)),
        });

        const leftEyeBox = getBoundingBox(leftEye);
        const rightEyeBox = getBoundingBox(rightEye);

        const img = imageRef.current;
        const scaleX = img.width / img.naturalWidth;
        const scaleY = img.height / img.naturalHeight;

        const adjustedEyePositions = {
          left: {
            x: leftEyeBox.x * scaleX,
            y: leftEyeBox.y * scaleY,
            width: leftEyeBox.width * scaleX,
            height: leftEyeBox.height * scaleY,
          },
          right: {
            x: rightEyeBox.x * scaleX,
            y: rightEyeBox.y * scaleY,
            width: rightEyeBox.width * scaleX,
            height: rightEyeBox.height * scaleY,
          },
        };

        setEyePositions(adjustedEyePositions);
        setFaceDetected(true);
      } else {
        setFaceDetected(false);
      }
    } catch (error) {
      console.error("Error in face detection:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'emoji_eyes_image.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  useEffect(() => {
    if (image && modelsLoaded) {
      detectEyes();

      // Create canvas for download functionality
      if (imageRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = imageRef.current;

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx?.drawImage(img, 0, 0);
      }
    }
  }, [image, modelsLoaded]);

  const renderEyeStyles = (eyePosition: EyePosition) => {
    const baseSize = Math.min(eyePosition.width, eyePosition.height);
    const adjustedSize = baseSize * 1.6 * sizeMultiplier;

    let backgroundStyle = {};
    switch (backgroundMode) {
      case 'solid':
        backgroundStyle = { backgroundColor };
        break;
      case 'gradient':
        backgroundStyle = { 
          background: `radial-gradient(${backgroundColor}, transparent)` 
        };
        break;
    }

    const glitterShadow = glitterEffect 
      ? `
        0 0 5px rgba(255, 255, 0, 0.7), 
        0 0 10px rgba(255, 255, 0, 0.5),
        -2px -2px 6px rgba(255, 255, 0, 0.4), 
        2px 2px 6px rgba(255, 255, 0, 0.4)
      `
      : 'none';

    return {
      left: `${eyePosition.x}px`,
      top: `${eyePosition.y}px`,
      width: `${eyePosition.width * sizeMultiplier}px`,
      height: `${eyePosition.height * sizeMultiplier}px`,
      fontSize: `${adjustedSize}px`,
      lineHeight: 1,
      textAlign: "center",
      borderRadius: eyeShape === 'circle' ? '50%' : 
                   eyeShape === 'oval' ? '50%/75%' : '0%',
      border: `${borderWidth}px solid ${borderColor}`,
      ...backgroundStyle,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      boxShadow: glitterShadow,
      opacity: glitterEffect ? 0.9 : 1
    };
  };

  return (
   
    <div className="p-6 max-w-xl mx-auto">

<div className="px-6 my-10 py-1 text-xl barrio-regular rounded-full border border-gray-500 mx-auto text-center z-10 bg-white/20 backdrop-blur-sm w-fit flex items-center gap-2">
  <span className="">Get</span> 
  <img
    className="md:w-5 w-4"
    src="/yenemoji.webp"
    alt="Yen emoji"
  />
    <span className="">Eyes on Yourself</span>
</div>
      {/* Customization Controls */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Emoji Type Selector */}
        <div>
          <label className="block mb-2">Emoji Type</label>
          <select 
            className="w-full p-2 border rounded"
            value={emojiType} 
            disabled
            onChange={(e) => setEmojiType(e.target.value)}
          >
            {['💹', '👀', '😍', '🤩', '🌟', '💖', '🎉'].map(emoji => (
              <option key={emoji} value={emoji}>{emoji}</option>
            ))}
          </select>
        </div>

        {/* Eye Shape Selector */}
        {/* <div>
          <label className="block mb-2">Eye Shape</label>
          <select 
            className="w-full p-2 border rounded"
            value={eyeShape} 
            onChange={(e) => setEyeShape(e.target.value as any)}
          >
            <option value="circle">Circle</option>
            <option value="oval">Oval</option>
            <option value="square">Square</option>
          </select>
        </div> */}

        {/* Background Mode Selector */}
        <div>
          <label className="block mb-2">Background Mode</label>
          <select 
            className="w-full p-2 border rounded"
            value={backgroundMode} 
            onChange={(e) => setBackgroundMode(e.target.value as any)}
          >
            <option value="none">None</option>
            <option value="solid">Solid</option>
            <option value="gradient">Gradient</option>
          </select>
        </div>

        {/* Size Multiplier */}
        <div>
          <label className="block mb-2">Size Multiplier: {sizeMultiplier.toFixed(2)}</label>
          <input 
            type="range" 
            min="0.5" 
            max="2" 
            step="0.1" 
            value={sizeMultiplier}
            onChange={(e) => setSizeMultiplier(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Border Color */}
        <div>
          <label className="block mb-2">Border Color</label>
          <input 
            type="color" 
            value={borderColor} 
            onChange={(e) => setBorderColor(e.target.value)}
            className="w-full p-1 border rounded"
          />
        </div>

        {/* Border Width */}
        <div>
          <label className="block mb-2">Border Width: {borderWidth}</label>
          <input 
            type="range" 
            min="0" 
            max="10" 
            step="1" 
            value={borderWidth}
            onChange={(e) => setBorderWidth(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Glitter Effect */}
        <div>
          <label className="block mb-2">Glitter Effect</label>
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              checked={glitterEffect}
              onChange={(e) => setGlitterEffect(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2">Enable</span>
          </label>
        </div>
      </div>

      {/* File Upload and Image Display */}
      <input 
        type="file" 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="mb-4"
      />



      {image && (
        <div className="relative">
          <img 
            ref={imageRef}
            src={image} 
            alt="Uploaded" 
            className="max-w-full max-h-[500px]" 
          />
          
          {/* Hidden canvas for download */}
          <canvas 
            ref={canvasRef} 
            style={{ display: 'none' }} 
          />

          {faceDetected && eyePositions && (
            <>
              {/* Left Eye */}
              <div
                className="absolute"
                style={renderEyeStyles(eyePositions.left) as React.CSSProperties} 
              >
                {emojiType}
              </div>

              {/* Right Eye */}
              <div
                className="absolute"
                style={renderEyeStyles(eyePositions.right) as React.CSSProperties}
              >
                {emojiType}
              </div>
            </>
          )}
        </div>
      )}

      {/* Download Button */}
      {image && faceDetected && (
        <div className="mt-4 text-center">
          <button 
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default EmojiEyeReplacer;