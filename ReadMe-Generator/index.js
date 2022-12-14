const {prompt: myPrompt} = require('inquirer')
const {writeFile} = require('fs')

const promptInput = (message, required = false ) =>
    myPrompt([{
        name: 'val',
        type: 'input',
        message: message,
        validate: input => {
            if (input.length === 0 && required) {
                return 'This field is required'
            }else {
                return true;
            }
        }

    }])
    .then(answer => answer.val);
const renderMd = (inputObj) =>{
    let mdStr = '';
    
    mdStr += 
`# ${inputObj.Projectname}

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Credits](#credits)
- [License](#license)
- [Contribution Guidelines](#contribution)
- [Questions](#questions)


## Description
${inputObj.description}

## Installation
${inputObj.installInstructions} 
    
## Usage
${inputObj.usage}

## Tests
${inputObj.testInstructions}

## Credits
${inputObj.contributors}
${inputObj.assets}


## License
${inputObj.license}

## Contribution Guidelines
${inputObj.contrabutionGuidelines}

## Questions
If you have any questions regarding the project you can contact me on github at https://github.com/${inputObj.githubUrl} or by email at ${inputObj.email}.





    `

    return mdStr;
}

(async () => {
    console.log(`Welcome to the Portfolio Henerator!\n`)
    console.log(`You will be prompted with a series of questions\n`)
    console.log(`from which a portfolio HTML page will be generated\n\n`)

    const inputObj = {
        Projectname: await promptInput('Enter your project name:', true),
        description: await promptInput('Enter a description of what your project is:', true),
        installInstructions: await promptInput('Enter instructions on how to install your project:'),
        usage: await promptInput('Provide instructions and examples for use:'),
        contrabutionGuidelines: await promptInput('Provide guidelines for contributing:'),
        githubUrl: await promptInput('Enter your GitHub username:'),
        testInstructions: await promptInput('Enter test instructions:'),
        email: await promptInput('Enter your email address:'),
        license: await promptInput('Enter the license for your project:'),
        contributors: await promptInput('Enter the GitHub usernames for any contributors:'),
        assets: await promptInput('List any third party assets that need to be credited:')

    }

    const md = renderMd(inputObj)

    writeFile('README.md', md, err => { err ? console.log(err.message) : console.log('Success')})


})();
