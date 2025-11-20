import React, { useState, useCallback } from 'react';
import { Card, Label, Select, TextArea, MagicButton } from './components/UIComponents';
import { AnimationStyle, CameraMovement, LightingMood, PromptFormData } from './types';
import { CAMERA_OPTIONS, MOOD_OPTIONS, STYLE_OPTIONS } from './constants';
import { generateMagicPrompt } from './services/geminiService';

const App: React.FC = () => {
  // State
  const [formData, setFormData] = useState<PromptFormData>({
    storyIdea: '',
    style: AnimationStyle.DISNEY_PIXAR,
    camera: CameraMovement.STATIC,
    mood: LightingMood.SUNNY,
  });
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.storyIdea.trim()) return;
    
    setIsLoading(true);
    setGeneratedPrompt('');
    setCopied(false);

    try {
      const result = await generateMagicPrompt(formData);
      setGeneratedPrompt(result);
    } catch (error) {
      console.error("Failed to generate prompt", error);
      setGeneratedPrompt("Oops! The magic wand fizzled out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = useCallback(() => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generatedPrompt]);

  return (
    <div className="min-h-screen pb-12 px-4 sm:px-6">
      {/* Header */}
      <header className="pt-8 pb-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-md mb-4 animate-bounce">
           <span className="text-4xl">✨</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500 mb-2">
          Veo3 Kids Animation Chuss-Media
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-600">
          Magic Prompt Generator
        </h2>
        <p className="text-slate-500 mt-2 max-w-md mx-auto">
          Turn simple ideas into professional, movie-quality animation prompts.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto space-y-6">
        
        {/* Input Section */}
        <Card title="1. Story Idea" color="pink" icon={<span className="text-2xl">📖</span>}>
          <TextArea
            name="storyIdea"
            value={formData.storyIdea}
            onChange={handleInputChange}
            placeholder="e.g., A small bear eating honey in a glowing forest..."
            rows={3}
            maxLength={300}
          />
          <div className="text-right text-xs text-slate-400 mt-2">
            {formData.storyIdea.length}/300 characters
          </div>
        </Card>

        {/* Options Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card title="2. Visual Style" color="purple" icon={<span className="text-2xl">🎨</span>} className="sm:col-span-2">
            <Select
              name="style"
              value={formData.style}
              onChange={handleInputChange}
              options={STYLE_OPTIONS}
            />
          </Card>

          <Card title="3. Camera" color="blue" icon={<span className="text-2xl">🎥</span>}>
             <Select
              name="camera"
              value={formData.camera}
              onChange={handleInputChange}
              options={CAMERA_OPTIONS}
            />
          </Card>

          <Card title="4. Mood" color="green" icon={<span className="text-2xl">☀️</span>}>
            <Select
              name="mood"
              value={formData.mood}
              onChange={handleInputChange}
              options={MOOD_OPTIONS}
            />
          </Card>
        </div>

        {/* Action Button */}
        <div className="sticky bottom-6 z-10 pt-4">
          <MagicButton 
            onClick={handleGenerate} 
            isLoading={isLoading}
            disabled={!formData.storyIdea.trim()}
          >
            {isLoading ? 'Creating Magic...' : '✨ Generate Magic Prompt ✨'}
          </MagicButton>
        </div>

        {/* Output Section */}
        {generatedPrompt && (
          <div className="animate-[slideUp_0.5s_ease-out] scroll-mt-6" id="result-area">
            <Card className="bg-gradient-to-br from-white to-purple-50 border-purple-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 text-xl">
                  Your Magic Prompt
                </h3>
                <button
                  onClick={handleCopy}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all
                    ${copied 
                      ? 'bg-green-500 text-white shadow-green-200 shadow-lg' 
                      : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-purple-400 hover:text-purple-600'
                    }
                  `}
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                      Copy to Clipboard
                    </>
                  )}
                </button>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 to-violet-300 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
                  <p className="text-slate-700 font-medium leading-relaxed font-mono text-sm break-words">
                    {generatedPrompt}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                 <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full uppercase tracking-wider">
                   Ready for Veo
                 </span>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;