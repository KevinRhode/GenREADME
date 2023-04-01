// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {


  // stringToReturn += `# ${data.projectName}\n\n`;
  // stringToReturn += `## Description\n\n${data.description}\n\n`;
  //table of contents
  // stringToReturn += `## User Story\n\n${data.userStory}\n\n`;
  // stringToReturn += `## Acceptance Criteria\n\n${data.acceptanceCriteria}\n\n`
  //Installation
  //Usage
  //Contributing
  //Tests
  return `# ${data.projectName}\n\n
  ## Description\n\n${data.description}\n\n
  ## Table of Contents\n\n${data.tableOfContents}\n\n
  ## User Story\n\n${data.userStory}\n\n
  ## Acceptance Criteria\n\n${data.acceptanceCriteria}\n\n
  `;




}

module.exports = generateMarkdown;
