import { AnimationStyle, CameraMovement, LightingMood } from './types';

export const TECHNICAL_SUFFIX = "4k resolution, highly detailed, smooth motion, trending on artstation, unreal engine 5 render, cinematic composition, no distortion";

export const STYLE_DESCRIPTIONS: Record<AnimationStyle, string> = {
  [AnimationStyle.DISNEY_PIXAR]: "3D animation style, cute big eyes, fluffy texture, vibrant colors, Disney Pixar style render",
  [AnimationStyle.CLAYMATION]: "Aardman style claymation, stop motion animation, tactile clay texture, handmade feel, fingerprint details",
  [AnimationStyle.VECTOR_FLAT]: "2D vector flat design, Kurzgesagt style, clean lines, educational animation style, bright solid colors, minimal shading",
  [AnimationStyle.WATERCOLOR]: "Watercolor storybook illustration style, soft edges, dreamy atmosphere, paper texture background, hand-painted look"
};

export const CAMERA_OPTIONS = Object.values(CameraMovement);
export const MOOD_OPTIONS = Object.values(LightingMood);
export const STYLE_OPTIONS = Object.values(AnimationStyle);