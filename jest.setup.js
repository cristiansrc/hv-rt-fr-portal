// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock window object for React DOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    const React = require('react')
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return React.createElement('img', props)
  },
}))

// Mock GSAP completely
jest.mock('gsap', () => ({
  from: jest.fn(() => ({
    kill: jest.fn(),
  })),
  to: jest.fn(() => ({
    kill: jest.fn(),
  })),
  set: jest.fn(),
  fromTo: jest.fn(() => ({
    kill: jest.fn(),
  })),
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    add: jest.fn().mockReturnThis(),
    play: jest.fn().mockReturnThis(),
    pause: jest.fn().mockReturnThis(),
    kill: jest.fn(),
  })),
  registerPlugin: jest.fn(),
  ScrollTrigger: {
    create: jest.fn(),
    refresh: jest.fn(),
    getAll: jest.fn(() => []),
  },
  utils: {
    toArray: jest.fn(() => []),
  },
}))

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: jest.fn(),
    refresh: jest.fn(),
    getAll: jest.fn(() => []),
  },
}))

jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn((callback) => {
    if (typeof callback === 'function') {
      try {
        callback()
      } catch (e) {
        // Ignore errors in test environment
      }
    }
    return () => {} // Return cleanup function
  }),
}))

// Mock window.URL methods
global.URL.createObjectURL = jest.fn(() => 'mocked-url')
global.URL.revokeObjectURL = jest.fn()

// Mock document methods
const originalCreateElement = document.createElement.bind(document)
document.createElement = jest.fn((tagName) => {
  if (tagName === 'a') {
    const element = originalCreateElement('a')
    element.click = jest.fn()
    return element
  }
  return originalCreateElement(tagName)
})

// NO mockear appendChild/removeChild - React Testing Library los necesita para renderizar

// Mock window.scrollTo
window.scrollTo = jest.fn()

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => {
  setTimeout(cb, 0)
  return 1
})
global.cancelAnimationFrame = jest.fn()

// Mock localStorage - simple implementation without jest.fn to avoid interference
const createLocalStorageMock = () => {
  let store = {};
  return {
    getItem: (key) => {
      return store[key] || null;
    },
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
  };
};

// Set up localStorage mock
const localStorageMock = createLocalStorageMock();

// Ensure localStorage is available on window
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
    configurable: true,
  });
}

// Also ensure it's available globally
global.localStorage = localStorageMock;

// Ensure navigator.language is defined
if (!navigator.language) {
  Object.defineProperty(navigator, 'language', {
    writable: true,
    configurable: true,
    value: 'en-US',
  });
}
