import React, { useState } from 'react';
import { Palette, Download, RefreshCw, Heart, Share2, Eye } from 'lucide-react';

const TapizDesignerApp = () => {
  const [colors, setColors] = useState({
    sun: '#FFD700',
    sunflowerPetals: '#FFA500',
    sunflowerCenter: '#8B0000',
    stems: '#228B22',
    leaves: '#32CD32',
    background1: '#F5F5DC',
    background2: '#DEB887',
    fringe: '#D2B48C'
  });

  const [selectedDesign, setSelectedDesign] = useState('sunflowers');
  const [favorites, setFavorites] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const presetPalettes = [
    {
      name: 'Atardecer Cálido',
      colors: {
        sun: '#FF6B35',
        sunflowerPetals: '#F7931E',
        sunflowerCenter: '#8B0000',
        stems: '#2E7D32',
        leaves: '#4CAF50',
        background1: '#FFF8E1',
        background2: '#FFE082',
        fringe: '#FFCC02'
      }
    },
    {
      name: 'Bosque Sereno',
      colors: {
        sun: '#FFEB3B',
        sunflowerPetals: '#FFC107',
        sunflowerCenter: '#3E2723',
        stems: '#1B5E20',
        leaves: '#2E7D32',
        background1: '#F1F8E9',
        background2: '#C8E6C9',
        fringe: '#A5D6A7'
      }
    },
    {
      name: 'Océano Dorado',
      colors: {
        sun: '#FFD54F',
        sunflowerPetals: '#FF8F00',
        sunflowerCenter: '#BF360C',
        stems: '#00695C',
        leaves: '#00897B',
        background1: '#E0F2F1',
        background2: '#80CBC4',
        fringe: '#4DB6AC'
      }
    },
    {
      name: 'Rosa Suave',
      colors: {
        sun: '#FFB74D',
        sunflowerPetals: '#F06292',
        sunflowerCenter: '#880E4F',
        stems: '#388E3C',
        leaves: '#66BB6A',
        background1: '#FCE4EC',
        background2: '#F8BBD9',
        fringe: '#E1BEE7'
      }
    }
  ];

  const designOptions = [
    { id: 'sunflowers', name: 'Girasoles Clásicos', icon: '🌻' },
    { id: 'roses', name: 'Rosas Románticas', icon: '🌹' },
    { id: 'abstract', name: 'Abstracto Moderno', icon: '🎨' },
    { id: 'geometric', name: 'Geométrico', icon: '🔶' }
  ];

  const handleColorChange = (colorKey, newColor) => {
    setColors(prev => ({
      ...prev,
      [colorKey]: newColor
    }));
  };

  const applyPreset = (preset) => {
    setColors(preset.colors);
  };

  const addToFavorites = () => {
    const newFavorite = {
      id: Date.now(),
      colors: {...colors},
      design: selectedDesign,
      timestamp: new Date().toLocaleString()
    };
    setFavorites(prev => [...prev, newFavorite]);
  };

  const generateQuote = () => {
    const basePrice = 150;
    const designMultiplier = selectedDesign === 'abstract' || selectedDesign === 'geometric' ? 1.2 : 1;
    const customColorBonus = 20;
    const total = Math.round((basePrice * designMultiplier + customColorBonus));
    
    return {
      base: basePrice,
      customization: customColorBonus,
      design: Math.round(basePrice * (designMultiplier - 1)),
      total: total
    };
  };

  const shareToWhatsApp = () => {
    const designName = designOptions.find(d => d.id === selectedDesign)?.name || 'Diseño personalizado';
    const quote = generateQuote();
    
    const message = `🎨 *Mi Diseño de Tapiz Personalizado*\n\n` +
                   `📐 Diseño: ${designName}\n` +
                   `🌈 Colores personalizados\n` +
                   `💰 Cotización: ${quote.total}\n\n` +
                   `¡Hola! Me encantó este diseño que creé en tu app. ¿Podrías hacerme una cotización detallada?\n\n` +
                   `🔗 Link del diseño: ${window.location.href}`;

    const whatsappUrl = `https://wa.me/5491123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const requestQuote = () => {
    const designName = designOptions.find(d => d.id === selectedDesign)?.name || 'Diseño personalizado';
    const quote = generateQuote();
    const colorsList = Object.entries(colors)
      .map(([key, color]) => `${key}: ${color}`)
      .join('\n');
    
    const message = `🎨 *Solicitud de Cotización - Tapiz Artesanal*\n\n` +
                   `👋 ¡Hola! Me interesa encargar un tapiz con estas especificaciones:\n\n` +
                   `📐 *Diseño:* ${designName}\n` +
                   `📏 *Tamaño:* Estándar (30x45cm)\n` +
                   `🌈 *Paleta de colores:*\n${colorsList}\n\n` +
                   `💰 *Cotización estimada:* ${quote.total}\n\n` +
                   `¿Podrías confirmarme:\n` +
                   `• Precio final\n` +
                   `• Tiempo de entrega\n` +
                   `• Opciones de pago\n` +
                   `• Si es posible hacer ajustes al diseño\n\n` +
                   `¡Gracias!`;

    const whatsappUrl = `https://wa.me/5491123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const TapizPreview = ({ colors, design }) => {
    if (design === 'sunflowers') {
      return (
        <div className="relative w-48 h-72 mx-auto" style={{ 
          background: `linear-gradient(to bottom, ${colors.background1} 0%, ${colors.background1} 20%, ${colors.background2} 20%, ${colors.background2} 40%, ${colors.background1} 40%, ${colors.background1} 60%, ${colors.background2} 60%, ${colors.background2} 80%, ${colors.background1} 80%, ${colors.background1} 100%)`,
          border: `3px solid ${colors.fringe}`,
          borderRadius: '8px'
        }}>
          {/* Sol */}
          <div 
            className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full shadow-lg"
            style={{ 
              background: `radial-gradient(circle, ${colors.sun}, ${colors.sun}CC)`,
              boxShadow: `0 0 20px ${colors.sun}66`
            }}
          />
          
          {/* Girasoles */}
          <div className="absolute top-28 left-1/2 transform -translate-x-1/2 flex gap-2">
            {[1, 2].map(i => (
              <div key={i} className="relative w-8 h-8">
                {/* Pétalos */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                  <div
                    key={angle}
                    className="absolute w-2 h-4 rounded-full"
                    style={{
                      background: `linear-gradient(to bottom, ${colors.sunflowerPetals}, ${colors.sunflowerPetals}DD)`,
                      transform: `rotate(${angle}deg) translateY(-6px)`,
                      transformOrigin: 'bottom center',
                      top: '50%',
                      left: '50%',
                      marginLeft: '-1px',
                      marginTop: '-2px'
                    }}
                  />
                ))}
                {/* Centro */}
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                  style={{ background: `radial-gradient(circle, ${colors.sunflowerCenter}, ${colors.sunflowerCenter}DD)` }}
                />
              </div>
            ))}
          </div>
          
          {/* Tallos */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
            {[1, 2].map(i => (
              <div key={i} className="relative">
                <div 
                  className="w-1 h-12 rounded"
                  style={{ background: `linear-gradient(to bottom, ${colors.stems}, ${colors.stems}DD)` }}
                />
                {/* Hojas */}
                <div 
                  className="absolute top-3 w-3 h-2 rounded-full"
                  style={{ 
                    background: `linear-gradient(45deg, ${colors.leaves}, ${colors.leaves}DD)`,
                    [i === 1 ? 'right' : 'left']: '-6px',
                    transform: `rotate(${i === 1 ? '30deg' : '-30deg'})`
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Flecos */}
          <div className="absolute bottom-0 left-0 right-0 h-3" style={{ background: colors.fringe }}>
            <div className="flex justify-around h-full">
              {Array.from({length: 12}).map((_, i) => (
                <div 
                  key={i} 
                  className="w-px h-2 mt-3" 
                  style={{ background: colors.fringe }}
                />
              ))}
            </div>
          </div>
          
          {/* Cuerda */}
          <div 
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-px h-4"
            style={{ background: colors.fringe }}
          />
          <div 
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full"
            style={{ background: colors.fringe }}
          />
        </div>
      );
    }
    
    // Diseños alternativos simplificados
    if (design === 'roses') {
      return (
        <div className="relative w-48 h-72 mx-auto" style={{ 
          background: `linear-gradient(to bottom, ${colors.background1}, ${colors.background2})`,
          border: `3px solid ${colors.fringe}`,
          borderRadius: '8px'
        }}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">
            🌹
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-3" style={{ background: colors.fringe }} />
        </div>
      );
    }
    
    if (design === 'abstract') {
      return (
        <div className="relative w-48 h-72 mx-auto" style={{ 
          background: `linear-gradient(45deg, ${colors.background1}, ${colors.background2}, ${colors.sunflowerPetals})`,
          border: `3px solid ${colors.fringe}`,
          borderRadius: '8px'
        }}>
          <div 
            className="absolute top-8 left-8 w-16 h-16 rounded-full opacity-80"
            style={{ background: colors.sun }}
          />
          <div 
            className="absolute bottom-16 right-8 w-12 h-12 opacity-70"
            style={{ background: colors.stems, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-3" style={{ background: colors.fringe }} />
        </div>
      );
    }
    
    if (design === 'geometric') {
      return (
        <div className="relative w-48 h-72 mx-auto" style={{ 
          background: colors.background1,
          border: `3px solid ${colors.fringe}`,
          borderRadius: '8px'
        }}>
          <div 
            className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12"
            style={{ 
              background: colors.sun,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
            }}
          />
          <div 
            className="absolute top-28 left-1/2 transform -translate-x-1/2 w-16 h-16"
            style={{ 
              background: colors.sunflowerPetals,
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-3" style={{ background: colors.fringe }} />
        </div>
      );
    }
  };

  const quote = generateQuote();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-2">
            🎨 Diseñador de Tapices Artesanales
          </h1>
          <p className="text-amber-600">Personaliza tu tapiz con los colores que más te gusten</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel de Control */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selector de Diseño */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Elige tu diseño
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {designOptions.map(design => (
                  <button
                    key={design.id}
                    onClick={() => setSelectedDesign(design.id)}
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedDesign === design.id 
                        ? 'border-amber-500 bg-amber-50 text-amber-700' 
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{design.icon}</div>
                    <div className="text-sm font-medium">{design.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Paletas Predefinidas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Paletas de inspiración
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {presetPalettes.map((palette, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(palette)}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    <div className="flex gap-1">
                      {Object.values(palette.colors).slice(0, 4).map((color, i) => (
                        <div 
                          key={i} 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{palette.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Personalizar Colores */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Personaliza cada color
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(colors).map(([key, color]) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="flex-1 px-2 py-1 border rounded text-sm"
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel de Vista Previa */}
          <div className="space-y-6">
            {/* Vista Previa */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Vista Previa</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={addToFavorites}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-6 rounded-lg">
                <TapizPreview colors={colors} design={selectedDesign} />
              </div>
            </div>

            {/* Cotización */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Cotización</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tapiz base:</span>
                  <span>${quote.base}</span>
                </div>
                <div className="flex justify-between">
                  <span>Personalización:</span>
                  <span>${quote.customization}</span>
                </div>
                {quote.design > 0 && (
                  <div className="flex justify-between">
                    <span>Diseño especial:</span>
                    <span>${quote.design}</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-amber-600">${quote.total}</span>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <button 
                  onClick={requestQuote}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  💬 Pedir por WhatsApp
                </button>
                <button 
                  onClick={shareToWhatsApp}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Compartir Diseño
                </button>
              </div>
            </div>

            {/* Favoritos */}
            {favorites.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Favoritos ({favorites.length})</h3>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {favorites.slice(-3).map((fav, index) => (
                    <div key={fav.id} className="flex items-center gap-3 p-2 border rounded-lg">
                      <div className="flex gap-1">
                        {Object.values(fav.colors).slice(0, 3).map((color, i) => (
                          <div 
                            key={i} 
                            className="w-3 h-3 rounded-full border"
                            style={{ background: color }}
                          />
                        ))}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {designOptions.find(d => d.id === fav.design)?.name}
                        </div>
                        <div className="text-xs text-gray-500">{fav.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>✨ Cada tapiz es hecho a mano con amor y dedicación</p>
          <p className="text-sm">Tiempo de entrega: 7-10 días hábiles</p>
        </div>
      </div>
    </div>
  );
};

export default TapizDesignerApp;