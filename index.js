
const inquirer = require('inquirer');
const fs = require('fs');
//require the util
const util = require('./utils/generateMarkdown.js');

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
  },
  {
    type: 'input',
    name: 'name',
    message: "I WANT ",
    title: "userStory",
    pre: "\nI WANT ",

  },
  {
    type: 'input',
    name: 'name',
    message: "SO THAT I ",
    title: "userStory" ,
    pre: "\nSO THAT I ",
  },
];

const acceptanceCriteria = [
  {
    type: 'input',
    name: 'name',
    message: "GIVEN ",
    title: "acceptanceCriteria",
    pre: "GIVEN ",
  },
  {
    type: 'input',
    name: 'name',
    message: "WHEN ",
    title: "acceptanceCriteria",
    pre: "\nWHEN ",
  },
  {
    type: 'input',
    name: 'name',
    message: "THEN ",
    title: "acceptanceCriteria",
    pre: "\nTHEN ",
  },
];

const qArray = [questions,descriptionQuestions,userStory,acceptanceCriteria];

const writeToFile = () => { 

  //make data pretty with makePretty - return string  

  fs.writeFile(filename, makePretty(readMe), (err) =>
    err ? console.log(err) : () => {
      console.log('Success!');      
    }
  );

}   

const makePretty = (data) =>{

  let stringToReturn = '';

  stringToReturn += `# ${data.projectName}\n\n`;
  stringToReturn += `## Description\n\n${data.description}\n\n`;
  stringToReturn += `## User Story\n\n${data.userStory}\n\n`;
  stringToReturn += `## Acceptance Criteria\n\n${data.acceptanceCriteria}\n\n`
    
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

          readMe[questions.title] += (questions.pre + data.name)  
        }); 
      }      
    }      
  }



}
// Function call to initialize app
init.callQuestions().then(writeToFile);

