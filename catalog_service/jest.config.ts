/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  preset: "ts-jest", // Use ts-jest preset for TypeScript support
  clearMocks: true, // Automatically clear mock calls and instances between every test
  collectCoverage: true, // Collect coverage information  
  verbose: true, // Display individual test results with the test suite hierarchy
  coverageDirectory: "coverage", // Directory where Jest should output its coverage files 
  coveragePathIgnorePatterns: ["/node_modules"], // Ignore patterns for coverage collection
  coverageProvider: "v8", // Specify the coverage providers
  moduleDirectories: ["node_modules", "src"], // Directories to search for modules, basically the root directory of the project
}

export default config;
