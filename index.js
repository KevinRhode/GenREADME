
const inquirer = require('inquirer');
const fs = require('fs');
//require the util
const gMD = require('./utils/generateMarkdown.js');

const filename = process.argv[1].substring(0,process.argv[1].lastIndexOf("\\") + 1) + 'generatedREADME.md';
const logFilename = process.argv[1].substring(0,process.argv[1].lastIndexOf("\\") + 1) + 'logs.txt';

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
    choices: ['No','Yes'],
    title: "continueWhen",
  },
  {
    type: 'list',
    name: 'name',
    message: "Continue with another GIVEN? ",
    choices: ['No','Yes'],
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
    title:'usage'     
  },
];
const contributionGuidelines = [
  {
    type:'input',
    message:'Enter description',
    name: 'name',
    prefix: `Enter info for contributer links, description first then link\n`,
    title:'contributingDesc'
  },
  {
    type:'input',
    message:'Enter Link',
    name: 'name',
    title:'contributingSrc'
  },
  {
    type: 'list',
    name: 'name',
    message: "Continue with another Contributer?",
    choices: ["No","Yes"],
    title: "continueContr",
  },
];
const testInstructions = [
  {
    type:'input',
    message:'Enter Guidelines for testing',
    name: 'name',
    title:'tests'
  },
];
const license = [
  {
    type: 'list',
    message: 'What license will this project be covered by?',
    name: 'name',
    choices: ['GNU GPLv3', 'Apache License 2.0', 'MIT License'],
    title:'license'
  },
];
const userInfo = [
  {
    type:'input',
    message:'Enter GitHub username:',
    name: 'name',
    title:'questions'
  },
  {
    type:'input',
    message:'Enter email to be reached at:',
    name: 'name',
    title:'questions'
  },
];

const qArray = [questions,descriptionQuestions,userStory,acceptanceCriteria,installationInstructions,usageInformation,contributionGuidelines,testInstructions,license,userInfo];

const writeToFile = () => { 

  fs.appendFile(logFilename,(JSON.stringify(readMe)+'\n'),null,(err)=>{
    err ? console.log(err) : () => {
      console.log('Success!');      
    }
  })
  fs.writeFile(filename, gMD.generateMarkdown(readMe),null, (err) =>
    err ? console.log(err) : () => {
      console.log('Success!');      
    }
  );

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
              readMe.projectName = data.name;
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
            case 'description':
              readMe.description += `${data.name}` ;
              break;
            case 'userStory':
              readMe.userStory += `${data.name}  `;
              break;
            case 'acceptanceCriteria':
              readMe.acceptanceCriteria += `${data.name}  `;
              break;
            case 'continueContr':
              if (`${data.name}` === 'No') {                
              } else{
                j = j-3;
              }
              break;
            case 'contributingDesc':
              readMe.contributing += `${data.name},`
              break;
            case 'contributingSrc':
              readMe.contributing += `${data.name};`
              break;
            case 'questions':
              readMe.questions +=`${data.name} `
              break;
            case 'license':
              readMe.license +=`${data.name}`
              break;
            case 'installation':
              readMe.installation +=`${data.name}`
              break;
            case 'usage':
              readMe.usage += `${data.name}`;
              break;
            case 'tests':
              readMe.tests += `${data.name}`;
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

