
const inquirer = require('inquirer');
const fs = require('fs');
//require the util
const gMD = require('./utils/generateMarkdown.js');

const filename = process.argv[1].substring(0,process.argv[1].lastIndexOf("\\") + 1) + 'README.md';

const readMe = {
  projectName:'',
  description:'',
  userStory:'',
  acceptanceCriteria:'',
  tableOfContents:'',
  installation:'',
  usage:'',
  license:'',
  contributing:'',
  tests:'',
  questions:'',
};


const descriptionQuestions = [
  {
    type: 'input',
    name: 'name',
    message: "What was your motivation?",
    title: "description" ,
    pre: '', 
  },
  {
  type: 'input',
  name: 'name',
  message: 'Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")',
  title: "description" ,
  pre: '',
  },
  {
    type: 'input',
    name: 'name',
    message: "What problem does it solve?",
    title: "description" ,
    pre: '',
    
  },
  {
    type: 'input',
    name: 'name',
    message: "What did you learn?",
    title: "description" ,
    pre: '',
  },
];

const questions = [ 
  {
    type: 'input',
    name: 'name',
    message: "What's your Project Name?",
    title: "projectName",
    pre: '',
  },
];

const userStory = [
  {
    type: 'input',
    name: 'name',
    message: "As A ",
    title: "userStory",
    pre: "As A ",
    end:'  ',
  },
  {
    type: 'input',
    name: 'name',
    message: "I WANT ",
    title: "userStory",
    pre: "\nI WANT ",
    end:'  ',
  },
  {
    type: 'input',
    name: 'name',
    message: "SO THAT I ",
    title: "userStory" ,
    pre: "\nSO THAT I ",
    end:'  ',
  },
];

const acceptanceCriteria = [
  {
    type: 'input',
    name: 'name',
    message: "GIVEN ",
    title: "acceptanceCriteria",
    pre: "GIVEN ",
    end:'  ',
  },
  {
    type: 'input',
    name: 'name',
    message: "WHEN ",
    title: "acceptanceCriteria",
    pre: "\nWHEN ",
    end:'  ',
  },
  {
    type: 'input',
    name: 'name',
    message: "THEN ",
    title: "acceptanceCriteria",
    pre: "\nTHEN ",
    end:'  ',
  },
  {
    type: 'list',
    name: 'name',
    message: "Continue with another WHEN?",
    choices: ['Yes','No'],
    title: "continueWhen",
  },
  {
    type: 'list',
    name: 'name',
    message: "Continue with another GIVEN? ",
    choices: ['Yes','No'],
    title: "continueGiven",
  },

];
const installationInstructions = [
  {
    type: 'input',
    name: 'name',
    message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
    title: "installation",
    pre: '',
  },
];
const usageInformation = [
  {
    type: 'input',
    message: 'Provide instructions and examples for use. Include screenshots as needed.',
    name: 'name',      
  },
];
const contributionGuidelines = [
  {
    type:'',
    message:'',
    name: 'name'
  },
];
const testInstructions = [

];
const license = [
  {
    type: 'list',
    message: 'What license will this project be covered by?',
    name: 'license',
    choices: ['email', 'phone', 'telekinesis'],
  },
];

const qArray = [questions,descriptionQuestions,userStory,acceptanceCriteria];

const writeToFile = () => { 

  //make data pretty with makePretty - return string  
  let testing = generateMarkdown(readMe);
  fs.writeFile(filename, util.generateMarkdown(readMe), (err) =>
    err ? console.log(err) : () => {
      console.log('Success!');      
    }
  );

}   
//makePretty moving to generateMarkdown.js
const makePretty = (data) =>{

  let stringToReturn = '';

  stringToReturn += `# ${data.projectName}\n\n`;
  stringToReturn += `## Description\n\n${data.description}\n\n`;
  //table of contents
  stringToReturn += `## User Story\n\n${data.userStory}\n\n`;
  stringToReturn += `## Acceptance Criteria\n\n${data.acceptanceCriteria}\n\n`
  //Installation
  //Usage
  //Contributing
  //Tests

    
  return stringToReturn;
}

// TODO: Create a function to initialize app
const init = {

  callQuestions: async () => {
    for (let i = 0; i < qArray.length; i++) {
      const element = qArray[i];
      for (let j = 0; j < element.length; j++) {
        const questions = element[j];
        await inquirer.prompt(questions).then((data)=>{

          switch (questions.title) {
            case 'projectName':
              readMe.projectName = data
              break;
            case 'continueWhen':
              if (data.name === 'Yes') {
                j = j-3;
              }
              break;
            case 'continueGiven':
              if (data.name === 'Yes') {
                j = j-5;
              }
              break;
            case '':
              break;
          
            default:

              break;
          }

          // questions.end == undefined ?  readMe[questions.title] += (questions.pre + data.name)  : readMe[questions.title] += (questions.pre + data.name + data.end);  
          
        }); 
      }      
    }      
  }



}
// Function call to initialize app
init.callQuestions().then(writeToFile);

