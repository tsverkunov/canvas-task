export default {
  // Устанавливаем ts-jest как преобработчик для тестов с расширением .ts/.tsx
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // Глобальные модули, которые будут использоваться в тестах (например, jest-dom)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Указываем, какие файлы будут тестироваться (обычно это файлы в папке src с расширением .test или .spec)
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  // Игнорируем сборку из node_modules и некоторых других директорий
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    // Если у вас есть пути из tsconfig, здесь нужно их сопоставить
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
