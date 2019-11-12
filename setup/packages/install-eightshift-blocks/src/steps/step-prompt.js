const inquirer = require('inquirer');
const { join } = require('path');
const { exec } = require('promisify-child-process');

const {
  misc: { log, variable },
} = require('eightshift-scripts');


const availableBlocks = [
  'Block 1',
  'Block 2',
  'Block 3',
  'Block 4',
];

const promptForBlock = async() => {
  let blockName = '';

  const blockType = await inquirer.prompt({
    type: 'list',
    name: 'blockType',
    message: 'Do you want an empty hello world block or an existing one?',
    choices: [
      {
        name: 'New block',
        value: 'example',
        short: 'New block'
      },
      {
        name: 'Existing block',
        value: 'custom',
        short: 'Existing block'
      },
    ]
  });

  if (blockType.blockType === 'example') {
    blockName = blockType.blockType;
  } else {
    log('')
    log(`For more information about available blocks, please visit ${variable('https://github.com/infinum/eightshift-blocks')}.`)
    log('')

    const chooseBlock = await inquirer.prompt({
      type: 'list',
      name: 'chooseBlock',
      message: 'Please choose the block you\'d like to extend',
      choices: availableBlocks,
    });
  }

  return blockName;
}



module.exports = {
  promptForBlock
}