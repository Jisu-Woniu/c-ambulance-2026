import { create } from 'zustand';
import { slides, totalSlides } from './slides-data';

interface PresentationState {
  currentSlide: number;
  currentStep: number;
  totalSteps: number;
  isFullscreen: boolean;
  direction: number;
  setCurrentSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToSlide: (index: number) => void;
  toggleFullscreen: () => void;
  resetSteps: () => void;
}

// 判断是否为答案/解析类型
const isAnswerType = (item: { type: string; content: string }) => {
  if (item.type === 'answer' || item.type === 'analysis') return true;
  if (item.type === 'table' && item.content === '解析') return true;
  return false;
};

const getStepsForSlide = (slideIndex: number): number => {
  const slide = slides[slideIndex];
  if (!slide) return 1;
  
  // 查找第一个答案/解析的位置
  const firstAnswerIndex = slide.items.findIndex(item => isAnswerType(item));
  
  // 如果没有答案，只需要1步显示所有内容
  if (firstAnswerIndex === -1) return 1;
  
  // 有答案：1步显示答案前的内容，1步显示答案及之后的所有内容
  return 2;
};

export const usePresentationStore = create<PresentationState>((set, get) => ({
  currentSlide: 0,
  currentStep: 1, // 初始就显示普通内容
  totalSteps: getStepsForSlide(0),
  isFullscreen: false,
  direction: 0,

  setCurrentSlide: (index: number) => {
    const { currentSlide } = get();
    if (index >= 0 && index < totalSlides) {
      const newTotalSteps = getStepsForSlide(index);
      set({
        currentSlide: index,
        currentStep: 1, // 直接显示普通内容
        totalSteps: newTotalSteps,
        direction: index > currentSlide ? 1 : -1,
      });
    }
  },

  nextSlide: () => {
    const { currentSlide } = get();
    if (currentSlide < totalSlides - 1) {
      const newIndex = currentSlide + 1;
      const newTotalSteps = getStepsForSlide(newIndex);
      // 切换到新页面时，直接显示所有普通内容（step=1）
      set({
        currentSlide: newIndex,
        currentStep: 1,
        totalSteps: newTotalSteps,
        direction: 1,
      });
    }
  },

  prevSlide: () => {
    const { currentSlide } = get();
    if (currentSlide > 0) {
      const newIndex = currentSlide - 1;
      const newTotalSteps = getStepsForSlide(newIndex);
      // 返回上一页时，显示所有内容（包括答案）
      set({
        currentSlide: newIndex,
        currentStep: newTotalSteps,
        totalSteps: newTotalSteps,
        direction: -1,
      });
    }
  },

  nextStep: () => {
    const { currentStep, totalSteps, currentSlide } = get();
    if (currentStep < totalSteps) {
      set({ currentStep: currentStep + 1 });
    } else if (currentSlide < totalSlides - 1) {
      get().nextSlide();
    }
  },

  prevStep: () => {
    const { currentStep, currentSlide } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    } else if (currentSlide > 0) {
      get().prevSlide();
    }
  },

  goToSlide: (index: number) => {
    const { currentSlide } = get();
    if (index >= 0 && index < totalSlides) {
      const newTotalSteps = getStepsForSlide(index);
      set({
        currentSlide: index,
        currentStep: 1, // 直接显示普通内容
        totalSteps: newTotalSteps,
        direction: index > currentSlide ? 1 : index < currentSlide ? -1 : 0,
      });
    }
  },

  toggleFullscreen: () => {
    set((state) => ({ isFullscreen: !state.isFullscreen }));
  },

  resetSteps: () => {
    set({ currentStep: 0 });
  },
}));
