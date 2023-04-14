### site: structs.sh

this repo provides functionality of various tools to build MDX pages for structs.sh. Currently in development.


## TODO:  
 1. **update quiz buttons:** such that clicking each option instantly shows "incorrect" or "correct, explanation blah blah" next to question.
 
 2. **update quiz buttons:** <POTENTIALLY DONT DO> change "submit" button to "show all" button, automatically shows all correct/incorrect options. same action as manually clicking all buttons.
 
 3. **code block component:** implement a code-block react component. should have C syntax highlighting. button to copy all code. input is struct of fileName and codeText. use React-syntax-highlighter potentially.
 
 
 ## FILE STRUCTURE
2 folders:
- learning material: folder with information about each learning module (linked lists, hash-maps, etc). each page has a link to its quiz page, and back button to roadmap.
- quiz pages: folder with quizzes, 1 for each module.

## ROADMAP  
a tree-like structure. has link to every learning module. nodes move slightly. when user hovers over a topic, its text-box grows in size.  
indicator of porgression/completion for each module, by making background of text-box more green based on % quiz completed.
