import React, { useState, useEffect } from 'react';

const NFTMinter = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [minted, setMinted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the user has already minted an NFT and retrieve the image URL
    const hasMinted = localStorage.getItem('hasMintedNFT');
    const storedImageUrl = localStorage.getItem('mintedNFTImageUrl');
    if (hasMinted && storedImageUrl) {
      setMinted(true);
      setImageUrl(storedImageUrl);
    }
  }, []);

  const usedPrompts = []; // Use a backend or context to persist this data in real use.

  const generatePrompt = () => {
    const basePrompt = 'cute anime girl with green eyes';
    const variations = [
      'wearing a red dress',
      'holding a cat',
      'standing in a field of flowers',
      'with a butterfly hairclip',
      'at the beach during sunset',
      'dancing under cherry blossoms',
      'reading a book by the window',
      'painting on a canvas',
      'with a sparkling tiara',
      'riding a bicycle through the city',
      'playing the violin',
      'wearing a witch hat',
      'in a futuristic cyberpunk city',
      'with a dragon companion',
      'drinking tea in a cozy café',
      'sitting on a crescent moon',
      'under a starry night sky',
      'at a bustling marketplace',
      'in a fairytale castle',
      'holding a magical orb',
      'exploring an enchanted forest',
      'with a shimmering aura',
      'in a vintage-style outfit',
      'posing by a waterfall',
    ];
    const randomVariation =
      variations[Math.floor(Math.random() * variations.length)];

    let newPrompt = `${basePrompt}, ${randomVariation}`;
    while (usedPrompts.includes(newPrompt)) {
      newPrompt = `${basePrompt}, ${variations[Math.floor(Math.random() * variations.length)]}`;
    }
    usedPrompts.push(newPrompt);
    return newPrompt;
  };

  const mintNFT = async () => {
    if (minted) {
      setError('You have already minted an NFT.');
      return;
    }

    setLoading(true);
    setError(null);
    const newPrompt = generatePrompt();
    setPrompt(newPrompt);

    try {
      const response = await fetch(
        `https://image.pollinations.ai/prompt/${encodeURIComponent(newPrompt)}`
      );
      if (response.ok) {
        const imageUrl = response.url; // Directly use the URL from the response
        setImageUrl(imageUrl);
        localStorage.setItem('hasMintedNFT', 'true'); // Store minting status
        localStorage.setItem('mintedNFTImageUrl', imageUrl); // Store image URL
        setMinted(true);
      } else {
        throw new Error('Failed to generate image.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `NFT-${new Date().toISOString()}.png`;
    link.click();
  };

  return (
    <div className="nft-minter">
      <h1 className="title">Mint Your Unique NFT</h1>
      <p className="subtitle">Generate, Mint, and Download your custom NFT!</p>
      <button
        onClick={mintNFT}
        className="btn mint-btn"
        disabled={loading || minted}
      >
        {loading ? 'Generating...' : minted ? 'NFT Minted 💹' : 'Generate NFT'}
      </button>

      {loading && (
        <div className="loading">
          <p>💹 Generating NFT...</p>
        </div>
      )}

      {imageUrl && (
        <div className="nft-preview">
          <img src={imageUrl} alt="Generated NFT" className="md:max-w-[600px]" />
          <button onClick={downloadImage} className="btn claim-btn">
            Download NFT
          </button>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <style jsx>{`
        .nft-minter {
          text-align: center;
          margin: 20px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          color: white;
        }
        .title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .subtitle {
          font-size: 1.2rem;
          margin-bottom: 20px;
        }
        .btn {
          margin: 10px;
          padding: 10px 20px;
          font-size: 1rem;
          font-weight: bold;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .mint-btn {
          background: #ffffff;
          color: black;
        }
        .mint-btn:hover {
          background: #3755d9;
        }
        .claim-btn {
          background: #ff758c;
          color: white;
        }
        .claim-btn:hover {
          background: #ff5672;
        }
        .loading {
          margin: 20px 0;
          font-size: 1.2rem;
          color: yellow;
        }
        .nft-preview img {
          margin: 20px auto;
          border: 5px solid white;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        .error {
          color: yellow;
          font-weight: bold;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default NFTMinter;
